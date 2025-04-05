import styled from 'styled-components'

const InputText = styled.input`
    border: 1px solid var(--grey);
    color: var(--white);
    background: #21293c;
    outline: none;
    padding-inline: 1rem;
    padding-block: .5rem;
    border-radius: 0.5rem;
    font: var(--body2-regular);
    flex: 1;
    min-width: 300px;
    @media (max-width: 600px) {
        &{
            width: 100%;
        }
    
    }


`


export default InputText
