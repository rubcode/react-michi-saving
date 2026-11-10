import { createContext, useState, useCallback, useEffect } from 'react'
import { api, getToken, setToken, clearToken, ApiError } from '../utils/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [profile, setProfile] = useState(null)
    const [unlocked, setUnlocked] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        async function bootstrap() {
            try {
                const status = await api.authStatus()
                if (cancelled) return

                if (!status.exists) {
                    setProfile(null)
                    setUnlocked(false)
                    return
                }

                const token = getToken()
                if (token) {
                    try {
                        const fullProfile = await api.getProfile()
                        if (cancelled) return
                        setProfile(fullProfile)
                        setUnlocked(true)
                        return
                    } catch {
                        clearToken()
                    }
                }

                if (cancelled) return
                setProfile({ name: status.name, hasPin: status.requiresPin })
                setUnlocked(false)
            } catch {
                // no se pudo contactar al backend; se deja sin perfil para no bloquear la app
                if (!cancelled) {
                    setProfile(null)
                    setUnlocked(false)
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        bootstrap()
        return () => {
            cancelled = true
        }
    }, [])

    const createProfile = useCallback(async (name, pin) => {
        const { profile: created, token } = await api.register(name, pin)
        setToken(token)
        setProfile(created)
        setUnlocked(true)
    }, [])

    const signIn = useCallback(async (enteredPin) => {
        try {
            const { profile: signedIn, token } = await api.login(enteredPin)
            setToken(token)
            setProfile(signedIn)
            setUnlocked(true)
            return true
        } catch (error) {
            if (error instanceof ApiError && (error.status === 401 || error.status === 404)) {
                return false
            }
            throw error
        }
    }, [])

    const signOut = useCallback(async () => {
        try {
            await api.logout()
        } catch {
            // el token puede ya haber expirado; igual cerramos sesión localmente
        }
        clearToken()
        setUnlocked(false)
    }, [])

    const forgetProfile = useCallback(async () => {
        if (unlocked) {
            await api.forgetProfile()
        } else {
            await api.resetProfile()
        }
        clearToken()
        setProfile(null)
        setUnlocked(false)
    }, [unlocked])

    return (
        <AuthContext.Provider
            value={{ profile, unlocked, loading, createProfile, signIn, signOut, forgetProfile }}
        >
            {children}
        </AuthContext.Provider>
    )
}
