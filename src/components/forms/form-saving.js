import styled from 'styled-components'
import {Button} from './button'
import InputText from './input-text'
import {useState, useRef} from 'react'

const FormSavingStyled = styled.form`
    width: 100%;
    border-radius: 0.5rem;
    padding-block: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    const form = useRef(null)

    const handleSubmit = (e) => {   
        e.preventDefault()
        if(savingsMount <= 0){
            alert("Ingrese un monto mayor a 0")
            return
        }
        const savings = props.savings + parseFloat(savingsMount)
        props.setSavings(savings)
        localStorage.setItem("michi-savings", savings)

        setSavingsMount("")
    }
    return (
        <FormSavingStyled onSubmit={handleSubmit} ref={form}>
            <InputText
                placeholder='Ingresse los ahorro de hoy'
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
