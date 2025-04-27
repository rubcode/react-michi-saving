import styled from 'styled-components'
import {Button} from './button'
import InputText from './input-text'
import {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';

const FormGoalStyled = styled.form`
    width: 100%;
    border-radius: 0.5rem;
    padding-inline: 2rem;
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
            padding: 0;
        }
    
    }
`

function FormGoal({...props}) {
    const navigate = useNavigate();
    const [goalMount, setGoalMount] = useState(0)
    const form = useRef(null)

    const handleSubmit = (e) => {   
        e.preventDefault()
        if(goalMount <= 0){
            alert("Ingrese un monto mayor a 0")
            return
        }
        localStorage.setItem("michi-goal", goalMount)
        setGoalMount("")
        navigate('/saving');
    }
    return (
        <FormGoalStyled onSubmit={handleSubmit} ref={form}>
            <InputText
                placeholder='Ingresse su meta de ahorro'
                name='goalMount'
                type='text'
                value={(goalMount === 0) ? "" : goalMount}
                onChange={(e) => setGoalMount(e.target.value)}

            />
            <Button
                text='Guardar Meta'
            />
        </FormGoalStyled>
    )
}

export default FormGoal
