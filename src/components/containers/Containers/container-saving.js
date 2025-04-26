import styled from 'styled-components'
import FormSaving from '../../forms/form-saving'
import { useState,useEffect } from 'react'
import Navbar from './navbar'
import Menu from '../menu'

const ContainerSavingStyled = styled.div`
    width: 80%;
    height: 100vh;
    margin: 0 auto;
    padding: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    flex-direction: column;

    img{
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 1rem
    }

    @media (max-width: 600px) {
        &{
            width: 100%;
            padding: 2rem;
        }
    
    }
`

function ContainerSaving() {
    const [savings, setSavings] = useState(0)
    const [activeMenu, setActiveMenu] = useState(false);
    const className = activeMenu ? 'active' : '';
    useEffect(() => {
        const savingsLocal = localStorage.getItem("michi-savings");
        if (savingsLocal !== undefined && savingsLocal !== null) {
          setSavings(parseFloat(savingsLocal));
        }
    }, [])
    const goal = localStorage.getItem("michi-goal")
    const percentage = (savings /goal) * 100
    const pathImg = percentage <= 25 ? "/assets/thin.png" : 
                    percentage <= 50 ? "/assets/normal.png" :
                    percentage <= 75 ? "/assets/fat.png" : "/assets/fatter.png"
    return (
        <>
            <Navbar setActiveMenu={setActiveMenu}/>
            <Menu className={className}/>
            <ContainerSavingStyled>
                <h1 className="title">Registre sus michi coins 😺💰</h1>
                <img src={pathImg} alt="Michi" />
                <h2 className="subtitle">Total Ahorrado: ${savings.toFixed(2)}</h2>
                <FormSaving 
                    savings={savings}
                    setSavings={setSavings}
                />
            </ContainerSavingStyled>
        </>
        
    )
}

export default ContainerSaving
