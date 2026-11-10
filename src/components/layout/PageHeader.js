import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PiArrowLeftBold } from 'react-icons/pi'

const HeaderStyled = styled.header`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
`

const BackButtonStyled = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--textPrimary);
    cursor: pointer;
    flex-shrink: 0;

    svg{
        font-size: 1.1rem;
    }
`

const TitleGroupStyled = styled.div`
    h1{
        font-size: 1.5rem;
    }
`

const SubtitleStyled = styled.p`
    color: var(--textSecondary);
    margin-top: 0.15rem;
`

function PageHeader({ title, subtitle, back }) {
    const navigate = useNavigate()
    return (
        <HeaderStyled>
            {back && (
                <BackButtonStyled type="button" onClick={() => navigate(-1)} aria-label="Regresar">
                    <PiArrowLeftBold aria-hidden="true" />
                </BackButtonStyled>
            )}
            <TitleGroupStyled>
                <h1>{title}</h1>
                {subtitle && <SubtitleStyled>{subtitle}</SubtitleStyled>}
            </TitleGroupStyled>
        </HeaderStyled>
    )
}

export default PageHeader
