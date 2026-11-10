import styled from 'styled-components'

const EmptyStateStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    padding: 3rem 1.5rem;
    color: var(--textSecondary);

    img{
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 999px;
    }

    h2{
        font: var(--bodySemiBold);
        color: var(--textPrimary);
    }

    p{
        max-width: 320px;
    }
`

function EmptyState({ title, description, children }) {
    return (
        <EmptyStateStyled>
            <img src="/assets/thin.png" alt="" aria-hidden="true" />
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            {children}
        </EmptyStateStyled>
    )
}

export default EmptyState
