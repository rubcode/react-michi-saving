import styled from 'styled-components'

const InputText = styled.input`
    border: 1px solid var(--border);
    color: var(--textPrimary);
    background: var(--surface);
    caret-color: var(--accent);
    padding-inline: 1rem;
    padding-block: .85rem;
    border-radius: var(--radius-control);
    font: var(--bodyRegular);
    width: 100%;

    &::placeholder{
        color: var(--textSecondary);
    }
`

export default InputText
