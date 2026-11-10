import { useContext, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import AppShell from '../components/layout/AppShell'
import PageHeader from '../components/layout/PageHeader'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import MichiPortrait from '../components/goals/MichiPortrait'
import RegisterSavingForm from '../components/goals/RegisterSavingForm'
import CelebrationBanner from '../components/goals/CelebrationBanner'
import Button from '../components/forms/button'
import { GoalsContext } from '../contexts/goalsContext'
import { getCategory } from '../constants/categories'

const CategoryRowStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    color: var(--textSecondary);
    font: var(--bodyMedium);
    font-size: 0.85rem;
    margin-bottom: 0.5rem;

    svg{ font-size: 1rem; }
`

const PortraitRowStyled = styled.div`
    display: flex;
    justify-content: center;
    margin-block: 1rem;
`

const AmountStyled = styled.p`
    text-align: center;
    font: var(--displayFont);
    font-size: 1.6rem;
    color: var(--textPrimary);
    margin-top: 0.75rem;
`

const RemainingStyled = styled.p`
    text-align: center;
    color: var(--textSecondary);
    margin-top: 0.35rem;
`

const SectionStyled = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const DangerZoneStyled = styled.div`
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`

function formatAmount(amount) {
    return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
}

function formatTargetDate(isoDate) {
    const [year, month, day] = isoDate.split('-')
    return `${day}/${month}/${year}`
}

function GoalDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { goals, loading, deleteGoal } = useContext(GoalsContext)
    const [banner, setBanner] = useState(null)
    const [confirmingDelete, setConfirmingDelete] = useState(false)

    const goal = goals.find((g) => String(g.id) === id)

    if (!goal) {
        return loading ? null : <Navigate to="/goals" replace />
    }

    const category = getCategory(goal.category)
    const percentage = goal.targetAmount > 0 ? (goal.savings / goal.targetAmount) * 100 : 0
    const remaining = Math.max(0, goal.targetAmount - goal.savings)

    const handleRegistered = (amount) => {
        const newSavings = goal.savings + amount
        if (newSavings >= goal.targetAmount) {
            setBanner('¡Meta alcanzada! 🎉 Michi satisfecho.')
        } else {
            setBanner(`¡Michi alimentado! +${formatAmount(amount)}`)
        }
    }

    const handleDelete = async () => {
        await deleteGoal(goal.id)
        navigate('/goals')
    }

    return (
        <AppShell>
            <PageHeader title={goal.name} back />

            <Card>
                <CategoryRowStyled>
                    <category.Icon aria-hidden="true" />
                    <span>{category.label}</span>
                </CategoryRowStyled>
                <PortraitRowStyled>
                    <MichiPortrait percentage={percentage} size={160} />
                </PortraitRowStyled>
                <ProgressBar percentage={percentage} />
                <AmountStyled className="amount">{formatAmount(goal.savings)}</AmountStyled>
                <RemainingStyled className="amount">
                    {percentage >= 100
                        ? 'Meta alcanzada'
                        : `Faltan ${formatAmount(remaining)} de ${formatAmount(goal.targetAmount)}`}
                </RemainingStyled>
                {goal.targetDate && (
                    <RemainingStyled>Fecha objetivo: {formatTargetDate(goal.targetDate)}</RemainingStyled>
                )}
            </Card>

            <SectionStyled>
                {banner && <CelebrationBanner message={banner} onDismiss={() => setBanner(null)} />}
                <RegisterSavingForm goalId={goal.id} onRegistered={handleRegistered} />
            </SectionStyled>

            <DangerZoneStyled>
                {confirmingDelete ? (
                    <>
                        <Button className="buttonDanger" text="Confirmar: eliminar esta meta" onClick={handleDelete} />
                        <Button className="buttonGhost" text="Cancelar" onClick={() => setConfirmingDelete(false)} />
                    </>
                ) : (
                    <Button className="buttonGhost" text="Eliminar meta" onClick={() => setConfirmingDelete(true)} />
                )}
            </DangerZoneStyled>
        </AppShell>
    )
}

export default GoalDetailPage
