import { useContext } from 'react'
import { PiPlusBold } from 'react-icons/pi'
import AppShell from '../components/layout/AppShell'
import PageHeader from '../components/layout/PageHeader'
import GoalsGrid from '../components/goals/GoalsGrid'
import Button from '../components/forms/button'
import { GoalsContext } from '../contexts/goalsContext'

function GoalsPage() {
    const { goals } = useContext(GoalsContext)

    return (
        <AppShell>
            <PageHeader title="Mis metas" subtitle="Todo lo que estás ahorrando, en un solo lugar." />
            <GoalsGrid goals={goals} />
            {goals.length > 0 && (
                <Button to="/goals/new" className="buttonFloating" aria-label="Nueva meta">
                    <PiPlusBold aria-hidden="true" />
                </Button>
            )}
        </AppShell>
    )
}

export default GoalsPage
