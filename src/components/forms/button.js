import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ButtonStyled = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    background: var(--accent);
    color: var(--onAccent);
    border: none;
    border-radius: var(--radius-control);
    padding: 0.9rem 1.75rem;
    font: 600 1rem var(--font);
    cursor: pointer;
    text-decoration: none !important;
    transition: transform .15s ease, filter .15s ease;

    &:hover{
        filter: brightness(1.05);
    }
    &:active{
        transform: scale(0.98);
    }

    &.buttonFloating{
        position: fixed;
        bottom: 96px;
        right: 1.25rem;
        width: auto;
        inline-size: 56px;
        min-inline-size: 56px;
        block-size: 56px;
        border-radius: 50%;
        padding: 0;
        box-shadow: var(--shadow);
        font-size: 1.5rem;
        z-index: 9;
    }

    &.buttonGhost{
        background: transparent;
        color: var(--textPrimary);
        border: 1px solid var(--border);
    }

    &.buttonDanger{
        background: transparent;
        color: var(--danger);
        border: 1px solid var(--danger);
    }

    &.buttonAuto{
        width: auto;
        padding: 0.6rem 1.1rem;
        font-size: 0.9rem;
    }
`

function Button({text, link, to, type, className, onClick, dataID, children, ...rest}) {
    const content = children || text
    if (to) {
        return (
            <ButtonStyled as={Link} to={to} className={className} onClick={onClick} dataID={dataID} {...rest}>
                {content}
            </ButtonStyled>
        )
    }
    const component = link ? "a" : "button"
    return (
        <ButtonStyled as={component} type={type} href={link} className={className} onClick={onClick} dataID={dataID} {...rest}>
            {content}
        </ButtonStyled>
    )
}

export { Button }
export default Button
