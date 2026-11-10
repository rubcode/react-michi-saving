import { useContext, useMemo } from 'react'
import styled from 'styled-components'
import AppShell from '../components/layout/AppShell'
import PageHeader from '../components/layout/PageHeader'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import { GoalsContext } from '../contexts/goalsContext'
import { getCategory } from '../constants/categories'

const ListStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`

const RowStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const IconWrapStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--accentTint);
    color: var(--textPrimary);
    flex-shrink: 0;

    svg{
        font-size: 1.3rem;
    }
`

const InfoStyled = styled.div`
    flex: 1;
    min-width: 0;
`

const GoalNameStyled = styled.p`
    font: var(--bodySemiBold);
    color: var(--textPrimary);
`

const DateStyled = styled.p`
    color: var(--textSecondary);
    font-size: 0.85rem;
`

const AmountStyled = styled.p`
    color: var(--textPrimary);
    font: var(--bodySemiBold);
    flex-shrink: 0;
`

function formatAmount(amount) {
    return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
}

function formatDate(isoDate) {
    const [year, month, day] = isoDate.split('-')
    return `${day}/${month}/${year}`
}

function ActivityPage() {
    const { goals } = useContext(GoalsContext)

    const entries = useMemo(() => {
        const all = goals.flatMap((goal) =>
            goal.contributions.map((contribution) => ({
                ...contribution,
                goalName: goal.name,
                category: goal.category,
            }))
        )
        return all.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
    }, [goals])

    return (
        <AppShell>
            <PageHeader title="Actividad" subtitle="El historial de todos tus ahorros." />
            {entries.length === 0 ? (
                <EmptyState
                    title="Aún no hay actividad"
                    description="Registra un ahorro en alguna de tus metas para verlo aquí."
                />
            ) : (
                <ListStyled>
                    {entries.map((entry) => {
                        const category = getCategory(entry.category)
                        return (
                            <Card key={entry.id}>
                                <RowStyled>
                                    <IconWrapStyled>
                                        <category.Icon aria-hidden="true" />
                                    </IconWrapStyled>
                                    <InfoStyled>
                                        <GoalNameStyled>{entry.goalName}</GoalNameStyled>
                                        <DateStyled>{formatDate(entry.date)}</DateStyled>
                                    </InfoStyled>
                                    <AmountStyled className="amount">+{formatAmount(entry.amount)}</AmountStyled>
                                </RowStyled>
                            </Card>
                        )
                    })}
                </ListStyled>
            )}
        </AppShell>
    )
}

export default ActivityPage
