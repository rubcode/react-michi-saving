const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'
const TOKEN_KEY = 'michi-api-token'

export class ApiError extends Error {
    constructor(message, status, errors) {
        super(message)
        this.status = status
        this.errors = errors || {}
    }
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY)
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
    const headers = { 'Content-Type': 'application/json' }
    if (auth) {
        const token = getToken()
        if (token) headers.Authorization = `Bearer ${token}`
    }

    let response
    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
        })
    } catch {
        throw new ApiError('No se pudo conectar con el servidor', 0, {})
    }

    if (response.status === 204) return null

    const data = await response.json().catch(() => null)

    if (!response.ok) {
        throw new ApiError(data?.message || 'Ocurrió un error', response.status, data?.errors)
    }

    return data
}

export const api = {
    authStatus: () => request('/auth/status', { auth: false }),
    register: (name, pin) => request('/auth/register', { method: 'POST', body: { name, pin }, auth: false }),
    login: (pin) => request('/auth/login', { method: 'POST', body: { pin }, auth: false }),
    resetProfile: () => request('/auth/reset', { method: 'POST', auth: false }),
    logout: () => request('/auth/logout', { method: 'POST' }),

    getProfile: () => request('/profile'),
    updateTheme: (theme) => request('/profile/theme', { method: 'PATCH', body: { theme } }),
    forgetProfile: () => request('/profile', { method: 'DELETE' }),

    getCategories: () => request('/categories', { auth: false }),

    getGoals: () => request('/goals'),
    createGoal: (payload) => request('/goals', { method: 'POST', body: payload }),
    deleteGoal: (id) => request(`/goals/${id}`, { method: 'DELETE' }),
    deleteAllGoals: () => request('/goals', { method: 'DELETE' }),

    addContribution: (goalId, amount) =>
        request(`/goals/${goalId}/contributions`, { method: 'POST', body: { amount } }),

    getActivity: () => request('/activity'),
}
