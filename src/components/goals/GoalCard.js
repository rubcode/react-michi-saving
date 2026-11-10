import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Card from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'
import MichiPortrait from './MichiPortrait'
import { getCategory } from '../../constants/categories'

const CardLinkStyled = styled(Link)`
    text-decoration: none;
    display: block;
`

const CategoryRowStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--textSecondary);
    font: var(--bodyMedium);
    font-size: 0.85rem;

    svg{
        font-size: 1rem;
    }
`

const NameStyled = styled.h3`
    font: var(--bodySemiBold);
    font-size: 1.1rem;
    color: var(--textPrimary);
    margin-top: 0.25rem;
`

const PortraitRowStyled = styled.div`
    display: flex;
    justify-content: center;
    margin-block: 1rem;
`

const AmountsStyled = styled.p`
    text-align: center;
    font: var(--bodySemiBold);
    color: var(--textPrimary);
    margin-top: 0.75rem;
`

const PercentStyled = styled.p`
    text-align: center;
    font-size: 0.8rem;
    color: var(--textSecondary);
    margin-top: 0.4rem;
`

function formatAmount(amount) {
    return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
}

function GoalCard({ goal }) {
    const category = getCategory(goal.category)
    const percentage = goal.targetAmount > 0 ? (goal.savings / goal.targetAmount) * 100 : 0

    return (
        <CardLinkStyled to={`/goals/${goal.id}`}>
            <Card>
                <CategoryRowStyled>
                    <category.Icon aria-hidden="true" />
                    <span>{category.label}</span>
                </CategoryRowStyled>
                <NameStyled>{goal.name}</NameStyled>
                <PortraitRowStyled>
                    <MichiPortrait percentage={percentage} size={110} />
                </PortraitRowStyled>
                <ProgressBar percentage={percentage} />
                <AmountsStyled className="amount">
                    {formatAmount(goal.savings)} / {formatAmount(goal.targetAmount)}
                </AmountsStyled>
                <PercentStyled>{Math.min(100, Math.round(percentage))}% completado</PercentStyled>
            </Card>
        </CardLinkStyled>
    )
}

export default GoalCard
