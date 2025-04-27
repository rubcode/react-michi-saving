import styled from 'styled-components'

const MenuStyled = styled.ul`
    position: fixed;
    height: 100vh;
    width: 0;
    background-color: #21293c;
    top: 80px;
    right: 0;
    transition: all ease 0.5s;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    margin: 0;
    overflow: hidden;
    box-sizing: border-box;
    z-index: 1;

    &.active{
        width: 200px;
        padding: 20px;
    }
    & li{
        padding: 10px;
        list-style: none;
    }
    & li a{
        text-decoration: none;
        font-size: var(--bodyRegularSemiBold);
        font-weight: bold;
        color: var(--white);
        transition: all ease .3s;
    }
    & li a:hover{
        color: var(--primaryColor);
    }



`

function Menu({className}) {
    return (
        <MenuStyled className={className}>
            <li>
                <a href="/">Actualizar Meta</a>
            </li>
            <li>
                <a href="views">Ver mis ahorros</a>
            </li>
        </MenuStyled>
    )
}

export default Menu
