import styled from 'styled-components'
import Card from '../ui/Card'

const WrapStyled = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
`

const CardStyled = styled(Card)`
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
`

const LogoStyled = styled.img`
    width: 96px;
    height: 96px;
    object-fit: contain;
`

const TitleStyled = styled.h1`
    text-align: center;
    font-size: 1.4rem;
`

const SubtitleStyled = styled.p`
    text-align: center;
    color: var(--textSecondary);
    margin-top: -0.4rem;
`

function AuthScreen({ title, subtitle, children }) {
    return (
        <WrapStyled>
            <CardStyled>
                <LogoStyled src="/assets/images/michi-saving-mark.png" alt="Michi Saving" />
                <TitleStyled>{title}</TitleStyled>
                {subtitle && <SubtitleStyled>{subtitle}</SubtitleStyled>}
                {children}
            </CardStyled>
        </WrapStyled>
    )
}

export default AuthScreen
