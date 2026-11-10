import styled from 'styled-components'

const FieldStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
`

const LabelStyled = styled.label`
    font: var(--bodyMedium);
    font-size: 0.9rem;
    color: var(--textSecondary);
`

const ErrorStyled = styled.p`
    color: var(--warning);
    font-size: 0.85rem;
`

function Field({ label, htmlFor, error, children }) {
    return (
        <FieldStyled>
            <LabelStyled htmlFor={htmlFor}>{label}</LabelStyled>
            {children}
            {error && <ErrorStyled role="alert">{error}</ErrorStyled>}
        </FieldStyled>
    )
}

export default Field
