import styled from 'styled-components'
import Hamburguer from '../../forms/hamburguer'
import { useState } from 'react'

const NavbarStyled = styled.nav`
    width: 100%;
    height: 80px;
    padding: 1rem;
    background-color: #21293c;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

function Navbar({setActiveMenu}) {
    const [active, setActive] = useState(false);
    const className = active ? 'active' : '';
    function handlerClick() {
        setActive(!active)
        setActiveMenu(!active);
    }

    return (
        <NavbarStyled>
            <a href='#!' onClick={handlerClick}>
                <Hamburguer className={className} />
            </a>
            
        </NavbarStyled>
    )
}

export default Navbar
