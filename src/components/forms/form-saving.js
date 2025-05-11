import styled from 'styled-components'
import {Button} from './button'
import InputText from './input-text'
import {useState, useRef, useContext} from 'react'
import { ContributionsContext } from '../../contexts/contributionsContext'

const FormSavingStyled = styled.form`
    width: 100%;
    border-radius: 0.5rem;
    padding-block: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;

    @media (max-width: 600px) {
        &{
            flex-direction: column;
            padding: 0
        }
    
    }
`

function FormSaving({...props}) {
    const [savingsMount, setSavingsMount] = useState(0)
    const { setContributionsList } = useContext(ContributionsContext);

    const form = useRef(null)

    const handleSubmit = (e) => {   
        e.preventDefault()
        if(savingsMount <= 0){
            alert("Ingrese un monto mayor a 0")
            return
        }
        const savings = props.savings + parseFloat(savingsMount)
        const today = new Date()
        const date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
        const contribution = {  
            no: "😺",
            date: date,
            amount:`$${parseFloat(savingsMount).toFixed(2)}`,
        }
        setContributionsList((prev) => [...prev, contribution])
        props.setSavings(savings)
        localStorage.setItem("michi-savings", savings)

        setSavingsMount("")
    }
    return (
        <FormSavingStyled onSubmit={handleSubmit} ref={form}>
            <InputText
                placeholder='Ingrese los ahorro de hoy'
                name='savingsMount'
                type='text'
                value={(savingsMount === 0) ? "" : savingsMount}
                onChange={(e) => setSavingsMount(e.target.value)}

            />
            <Button
                text='Guardar Dinerito'
            />
        </FormSavingStyled>
    )
}

export default FormSaving
