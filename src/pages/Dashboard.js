import styled from 'styled-components'
import { useContext, useMemo } from 'react'
import { PiPlusBold } from 'react-icons/pi'
import AppShell from '../components/layout/AppShell'
import Card from '../components/ui/Card'
import GoalsGrid from '../components/goals/GoalsGrid'
import Button from '../components/forms/button'
import { GoalsContext } from '../contexts/goalsContext'
import { AuthContext } from '../contexts/authContext'

const GreetingStyled = styled.p`
    color: var(--textSecondary);
    font-size: 1.05rem;
    margin-bottom: 0.25rem;
`

const SummaryCardStyled = styled(Card)`
    margin-block: 1.5rem;
`

const SummaryLabelStyled = styled.p`
    color: var(--textSecondary);
    font: var(--bodyMedium);
`

const SummaryAmountStyled = styled.p`
    font: var(--displayFont);
    color: var(--textPrimary);
    margin-block: 0.35rem;
`

const SummaryDeltaStyled = styled.p`
    color: var(--textPrimary);
    font: var(--bodySemiBold);
    font-size: 0.9rem;
`

const SectionTitleStyled = styled.h2`
    font-size: 1.1rem;
    margin-bottom: 1rem;
`

function parseGoalDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, day)
}

function formatAmount(amount) {
    return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
}

function Dashboard() {
    const { goals } = useContext(GoalsContext)
    const { profile } = useContext(AuthContext)

    const { totalSavings, monthDelta } = useMemo(() => {
        const now = new Date()
        let total = 0
        let delta = 0
        goals.forEach((goal) => {
            total += goal.savings
            goal.contributions.forEach((contribution) => {
                const date = parseGoalDate(contribution.date)
                if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
                    delta += contribution.amount
                }
            })
        })
        return { totalSavings: total, monthDelta: delta }
    }, [goals])

    return (
        <AppShell>
            <GreetingStyled>Hola {profile.name} 👋</GreetingStyled>
            <h1>¿Cómo van tus ahorros?</h1>

            <SummaryCardStyled>
                <SummaryLabelStyled>Ahorro total</SummaryLabelStyled>
                <SummaryAmountStyled className="amount">{formatAmount(totalSavings)}</SummaryAmountStyled>
                {monthDelta > 0 && (
                    <SummaryDeltaStyled className="amount">+{formatAmount(monthDelta)} este mes</SummaryDeltaStyled>
                )}
            </SummaryCardStyled>

            <SectionTitleStyled>Mis metas</SectionTitleStyled>
            <GoalsGrid goals={goals} />

            {goals.length > 0 && (
                <Button to="/goals/new" className="buttonFloating" aria-label="Nueva meta">
                    <PiPlusBold aria-hidden="true" />
                </Button>
            )}
        </AppShell>
    )
}

export default Dashboard
