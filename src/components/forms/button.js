import styled from 'styled-components'

const ButtonStyled = styled.div`
    background: var(--primaryColor);
    color: var(--white);
    border: 1px solid var(--primaryColor);
    border-radius: 0.5rem;
    padding-block: 0.75rem;
    min-inline-size: 300px;
    font: var(--button);
    cursor: pointer;
    opacity: 0.8;
    text-decoration: none !important;

    &.buttonRouded{ 
        border-radius: 50%;
        inline-size: 50px;
        min-inline-size: 50px;
        min-block-size: 50px;
        block-size: 50px;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &:hover{
        opacity: 1;
    }
`

function Button({text,link,type,className,onClick,dataID}) {
    const component = link ? "a" : "button"
    return (
        <ButtonStyled as={component} type={type} href={link} className={className} onClick={onClick} dataID={dataID}>
            {text}
        </ButtonStyled>
    )
}

export const ButtonIcon = styled(Button)`
    background-color: transparent;
    color: var(--primaryColor);
    border: none;
    font-size: 1.8rem;
    min-inline-size: 50px;
    &:hover{
        color: var(--accentColor);
    }
    @media (max-width: 750px) {
        &{
            font-size: 1.3rem;
        }
    }
`

export const ButtonContrast = styled(Button)`
    background-color: var(--accentColor);
    color: var(--white);
    border: 1px solid var(--accentColor);
    &:hover{
        background-color: var(--white);
        color: var(--accentColor);
    }
`

export {
    Button
} 
