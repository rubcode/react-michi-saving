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
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
    .box{
        width: 100%;
        display: flex;
        justify-content: center;
    }
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
    const [goalName, setGoalName] = useState("")
    const form = useRef(null)

    const handleSubmit = (e) => {   
        e.preventDefault()
        if(goalMount <= 0){
            alert("Ingrese un monto mayor a 0")
            return
        }
        if (goalName.trim() === ""){
            alert("Ingrese un nombre para su meta")
            return
        }
        localStorage.setItem("michi-goal", goalMount)
        localStorage.setItem("michi-goal-name", goalName)
        setGoalMount("")
        setGoalName("")
        navigate('/saving');
    }
    return (
        <FormGoalStyled onSubmit={handleSubmit} ref={form}>
            <div className='box'>
            <InputText
                    placeholder='Ingrese nombre de su ahorro'
                    name='goalName'
                    type='text'
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}

                />
            </div>
            <div className='box'>
                <InputText
                    placeholder='Ingrese monto de su ahorro'
                    name='goalMount'
                    type='text'
                    value={(goalMount === 0) ? "" : goalMount}
                    onChange={(e) => setGoalMount(e.target.value)}

                />
            </div>
            
            <Button
                text='Guardar Meta'
            />
        </FormGoalStyled>
    )
}

export default FormGoal
