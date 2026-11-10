import AppShell from '../components/layout/AppShell'
import PageHeader from '../components/layout/PageHeader'
import CreateGoalForm from '../components/goals/CreateGoalForm'

function NewGoalPage() {
    return (
        <AppShell>
            <PageHeader title="Crear nueva meta" back />
            <CreateGoalForm />
        </AppShell>
    )
}

export default NewGoalPage
