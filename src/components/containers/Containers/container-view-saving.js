import styled from 'styled-components'
import Navbar from './navbar'
import Menu from '../menu'
import { useState } from 'react'
import Table from '../../tables/table'

const ContainerViewSavingStyled = styled.div`
    width: 80%;
    height: calc(100vh - 80px);
    margin: 0 auto;
    padding: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-direction: column;

    @media (max-width: 600px) {
        &{
            width: 100%;
            padding: 2rem;
        }
    
    }
`

function ContainerViewSaving() {
    const [activeMenu, setActiveMenu] = useState(false);
    const className = activeMenu ? 'active' : '';
    return (
        <>
            <Navbar setActiveMenu={setActiveMenu}/>
            <Menu className={className} />
            <ContainerViewSavingStyled>
                <h1 className="title">Tus Ahorros 😺💰</h1>
                <Table/>
            </ContainerViewSavingStyled>
        </>
        
    )
}

export default ContainerViewSaving
