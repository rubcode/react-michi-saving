const GOALS_KEY = 'michi-goals-v2'

function parseAmount(value) {
    const numeric = parseFloat(String(value).replace(/[^0-9.-]/g, ''))
    return Number.isFinite(numeric) ? numeric : 0
}

function readLegacyGoal() {
    const goal = localStorage.getItem('michi-goal')
    if (goal === null || goal === undefined) return null

    const goalName = localStorage.getItem('michi-goal-name')
    const savings = localStorage.getItem('michi-savings')
    const contributionsRaw = localStorage.getItem('contributionsList')

    let contributions = []
    try {
        const parsed = contributionsRaw ? JSON.parse(contributionsRaw) : []
        contributions = parsed.map((contribution, index) => ({
            id: `legacy-${index}`,
            date: contribution.date,
            amount: parseAmount(contribution.amount),
            createdAt: index - parsed.length,
        }))
    } catch {
        contributions = []
    }

    return {
        id: 'legacy-goal',
        name: goalName || 'Mi meta',
        category: 'home',
        targetAmount: parseAmount(goal),
        targetDate: null,
        createdAt: Date.now(),
        savings: parseAmount(savings),
        contributions,
    }
}

function clearLegacyKeys() {
    localStorage.removeItem('michi-goal')
    localStorage.removeItem('michi-goal-name')
    localStorage.removeItem('michi-savings')
    localStorage.removeItem('contributionsList')
}

export function loadGoals() {
    const stored = localStorage.getItem(GOALS_KEY)
    if (stored) {
        try {
            return JSON.parse(stored)
        } catch {
            return []
        }
    }

    const legacyGoal = readLegacyGoal()
    if (legacyGoal) {
        clearLegacyKeys()
        saveGoals([legacyGoal])
        return [legacyGoal]
    }

    return []
}

export function saveGoals(goals) {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals))
}
