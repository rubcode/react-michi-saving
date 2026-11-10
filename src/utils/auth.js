const PROFILE_KEY = 'michi-profile'
const SESSION_KEY = 'michi-session-unlocked'

export function loadProfile() {
    const stored = localStorage.getItem(PROFILE_KEY)
    if (!stored) return null
    try {
        return JSON.parse(stored)
    } catch {
        return null
    }
}

export function saveProfile(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function clearProfile() {
    localStorage.removeItem(PROFILE_KEY)
    sessionStorage.removeItem(SESSION_KEY)
}

export function isSessionUnlocked() {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
}

export function markSessionUnlocked() {
    sessionStorage.setItem(SESSION_KEY, 'true')
}

export function markSessionLocked() {
    sessionStorage.removeItem(SESSION_KEY)
}
