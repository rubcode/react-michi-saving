import styled from 'styled-components'
import { getMichiStage } from '../../utils/michi'

const WrapStyled = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`

const ImgStyled = styled.img`
    width: ${(props) => props.$size || 140}px;
    height: ${(props) => props.$size || 140}px;
    object-fit: cover;
    border-radius: 999px;
    background: var(--bg);
`

const ConfettiStyled = styled.span`
    position: absolute;
    inset: -0.5rem;
    pointer-events: none;

    &::before, &::after{
        content: '🎉';
        position: absolute;
        font-size: 1.5rem;
        animation: michi-pop 1.2s ease-in-out infinite;
    }
    &::before{
        left: -0.5rem;
        top: 0;
    }
    &::after{
        right: -0.5rem;
        top: 0;
        animation-delay: .3s;
    }

    @keyframes michi-pop{
        0%, 100% { transform: translateY(0) rotate(-8deg); }
        50% { transform: translateY(-6px) rotate(8deg); }
    }

    @media (prefers-reduced-motion: reduce){
        &::before, &::after{
            animation: none;
        }
    }
`

function MichiPortrait({ percentage, size }) {
    const stage = getMichiStage(percentage)
    return (
        <WrapStyled>
            <ImgStyled src={stage.image} alt="Michi" $size={size} />
            {stage.isComplete && <ConfettiStyled aria-hidden="true" />}
        </WrapStyled>
    )
}

export default MichiPortrait
