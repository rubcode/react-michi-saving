import styled from 'styled-components'
import FormGoal from '../../forms/form-goal'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';
import Menu from '../menu';

const ContainerGoalStyled = styled.div`
    width: 80%;
    height: calc(100vh - 80px);
    margin: 0 auto;
    padding: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    flex-direction: column;
    @media (max-width: 600px) {
        &{
            width: 100%;
            padding: 2rem;
        }
    
    }

`

function ContainerGoal() {
    
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState(false);
    const className = activeMenu ? 'active' : '';
    useEffect(() => {
        localStorage.removeItem("michi-goal");
        localStorage.removeItem("michi-savings");
        const goal = localStorage.getItem("michi-goal"); 
        if (goal !== undefined && goal !== null) {
          navigate('/saving');
        }
      }, [navigate]);
    return (
        <>
            <Navbar 
                setActiveMenu={setActiveMenu}
            />
            <Menu className={className}/>
            <ContainerGoalStyled>
                <h1 className="title">Bienvenido a Michi Saving 😺💰</h1>
                <FormGoal />
            </ContainerGoalStyled>
        </>
        
    )
}

export default ContainerGoal
