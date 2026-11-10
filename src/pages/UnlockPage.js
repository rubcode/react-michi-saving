import { useState, useContext } from 'react'
import styled from 'styled-components'
import Field from '../components/ui/Field'
import InputText from '../components/forms/input-text'
import Button from '../components/forms/button'
import AuthScreen from '../components/layout/AuthScreen'
import { AuthContext } from '../contexts/authContext'

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
`

function UnlockPage() {
    const { profile, signIn, forgetProfile } = useContext(AuthContext)
    const [pin, setPin] = useState('')
    const [error, setError] = useState('')
    const [confirmingForget, setConfirmingForget] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const ok = await signIn(pin)
            if (!ok) {
                setError('PIN incorrecto')
                setPin('')
                return
            }
            setError('')
        } catch {
            setError('No se pudo conectar con el servidor. Intenta de nuevo.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AuthScreen title={`¡Hola de nuevo, ${profile.name}! 👋`} subtitle="Ingresa tu PIN para continuar.">
            <FormStyled onSubmit={handleSubmit}>
                <Field label="PIN" htmlFor="unlock-pin" error={error}>
                    <InputText
                        id="unlock-pin"
                        placeholder="••••"
                        inputMode="numeric"
                        maxLength={4}
                        autoFocus
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    />
                </Field>
                <Button type="submit" text={submitting ? 'Entrando...' : 'Entrar'} disabled={submitting} />
            </FormStyled>
            {confirmingForget ? (
                <>
                    <Button className="buttonDanger" text="Confirmar: olvidar este perfil" onClick={forgetProfile} />
                    <Button className="buttonGhost" text="Cancelar" onClick={() => setConfirmingForget(false)} />
                </>
            ) : (
                <Button className="buttonGhost" text="¿Olvidaste tu PIN?" onClick={() => setConfirmingForget(true)} />
            )}
        </AuthScreen>
    )
}

export default UnlockPage
