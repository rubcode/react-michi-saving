import { createContext, useState, useEffect, useCallback, useContext } from 'react'
import { api } from '../utils/api'
import { AuthContext } from './authContext'

export const GoalsContext = createContext(null)

export function GoalsProvider({ children }) {
    const { unlocked } = useContext(AuthContext)
    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!unlocked) return

        let cancelled = false
        setLoading(true)
        api.getGoals()
            .then((fetched) => {
                if (!cancelled) setGoals(fetched)
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [unlocked])

    const createGoal = useCallback(async ({ name, category, targetAmount, targetDate }) => {
        const goal = await api.createGoal({
            name,
            category,
            targetAmount,
            targetDate: targetDate || null,
        })
        setGoals((prev) => [goal, ...prev])
        return goal.id
    }, [])

    const addContribution = useCallback(async (goalId, amount) => {
        const { contribution, goal: updatedGoal } = await api.addContribution(goalId, amount)
        setGoals((prev) =>
            prev.map((goal) =>
                String(goal.id) === String(goalId)
                    ? { ...goal, ...updatedGoal, contributions: [contribution, ...goal.contributions] }
                    : goal
            )
        )
    }, [])

    const deleteGoal = useCallback(async (goalId) => {
        await api.deleteGoal(goalId)
        setGoals((prev) => prev.filter((goal) => String(goal.id) !== String(goalId)))
    }, [])

    const deleteAllGoals = useCallback(async () => {
        await api.deleteAllGoals()
        setGoals([])
    }, [])

    return (
        <GoalsContext.Provider
            value={{ goals, loading, createGoal, addContribution, deleteGoal, deleteAllGoals }}
        >
            {children}
        </GoalsContext.Provider>
    )
}
