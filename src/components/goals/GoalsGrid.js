import styled from 'styled-components'
import GoalCard from './GoalCard'
import EmptyState from '../ui/EmptyState'
import Button from '../forms/button'

const GridStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;

    @media (min-width: 560px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }
`

function GoalsGrid({ goals }) {
    if (goals.length === 0) {
        return (
            <EmptyState
                title="Todavía no tienes metas"
                description="Crea tu primera meta y empieza a alimentar a tu michi."
            >
                <Button to="/goals/new" text="+ Crear mi primera meta" />
            </EmptyState>
        )
    }

    return (
        <GridStyled>
            {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
            ))}
        </GridStyled>
    )
}

export default GoalsGrid
