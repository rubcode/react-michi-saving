import styled from 'styled-components'
import FormSaving from '../../forms/form-saving'
import { useState } from 'react'

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
`

function ContainerSaving() {
    localStorage.setItem("goal", 1000)
    const [savings, setSavings] = useState(0)
    const [goal, setGoal] = useState(localStorage.getItem("goal"))

    const percentage = (savings /goal) * 100
    const pathImg = percentage <= 25 ? "/assets/thin.png" : 
                    percentage <= 50 ? "/assets/normal.png" :
                    percentage <= 75 ? "/assets/fat.png" : "/assets/fatter.png"
    return (
        <ContainerSavingStyled>
            <h1 className="title">Registre sus michi coins 😺💰</h1>
            <img src={pathImg} alt="Michi" />
            <h2 className="subtitle">Total Ahorrado: ${savings.toFixed(2)}</h2>
            <FormSaving 
                savings={savings}
                setSavings={setSavings}
            />
        </ContainerSavingStyled>
    )
}

export default ContainerSaving
