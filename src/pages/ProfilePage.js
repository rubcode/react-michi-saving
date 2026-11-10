import { useContext, useState } from 'react'
import styled from 'styled-components'
import { PiSunBold, PiMoonBold, PiUserCircleBold, PiSignOutBold } from 'react-icons/pi'
import AppShell from '../components/layout/AppShell'
import PageHeader from '../components/layout/PageHeader'
import Card from '../components/ui/Card'
import Button from '../components/forms/button'
import { GoalsContext } from '../contexts/goalsContext'
import { AuthContext } from '../contexts/authContext'
import { getStoredTheme, applyTheme } from '../utils/theme'
import { api } from '../utils/api'

const RowCardStyled = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
`

const LabelStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font: var(--bodySemiBold);

    svg{
        font-size: 1.2rem;
        color: var(--textPrimary);
    }
`

const ToggleStyled = styled.button`
    position: relative;
    width: 52px;
    height: 30px;
    border-radius: var(--radius-pill);
    border: 1px solid var(--border);
    background: ${(props) => (props.$on ? 'var(--accent)' : 'var(--bg)')};
    cursor: pointer;

    &::after{
        content: '';
        position: absolute;
        top: 3px;
        left: ${(props) => (props.$on ? '25px' : '3px')};
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--surface);
        transition: left .2s ease;
    }
`

const StatsRowStyled = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
`

const StatCardStyled = styled(Card)`
    flex: 1;
    text-align: center;
`

const StatValueStyled = styled.p`
    font: var(--displayFont);
    font-size: 1.5rem;
`

const StatLabelStyled = styled.p`
    color: var(--textSecondary);
    font-size: 0.85rem;
    margin-top: 0.25rem;
`

const DangerZoneStyled = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`

const SectionLabelStyled = styled.p`
    color: var(--textSecondary);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin: 1.75rem 0 0.5rem;

    &:first-of-type{
        margin-top: 0;
    }
`

function formatAmount(amount) {
    return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
}

function ProfilePage() {
    const { goals, deleteAllGoals } = useContext(GoalsContext)
    const { profile, signOut, forgetProfile } = useContext(AuthContext)
    const [theme, setTheme] = useState(getStoredTheme)
    const [confirmingReset, setConfirmingReset] = useState(false)
    const [confirmingForget, setConfirmingForget] = useState(false)

    const totalSavings = goals.reduce((sum, goal) => sum + goal.savings, 0)

    const handleToggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        applyTheme(next)
        setTheme(next)
        api.updateTheme(next).catch(() => {
            // preferencia solo visual; si falla la sincronización no bloqueamos la UI
        })
    }

    const handleReset = async () => {
        await deleteAllGoals()
        setConfirmingReset(false)
    }

    return (
        <AppShell>
            <PageHeader title="Perfil" subtitle={`Hola, ${profile.name} 😺💰`} />

            <StatsRowStyled>
                <StatCardStyled>
                    <StatValueStyled className="amount">{goals.length}</StatValueStyled>
                    <StatLabelStyled>Metas activas</StatLabelStyled>
                </StatCardStyled>
                <StatCardStyled>
                    <StatValueStyled className="amount">{formatAmount(totalSavings)}</StatValueStyled>
                    <StatLabelStyled>Ahorro total</StatLabelStyled>
                </StatCardStyled>
            </StatsRowStyled>

            <RowCardStyled>
                <LabelStyled>
                    <PiUserCircleBold aria-hidden="true" />
                    <span>{profile.name}</span>
                </LabelStyled>
                {profile.hasPin && (
                    <Button className="buttonGhost buttonAuto" onClick={signOut}>
                        <PiSignOutBold aria-hidden="true" />
                        Cerrar sesión
                    </Button>
                )}
            </RowCardStyled>

            <RowCardStyled>
                <LabelStyled>
                    {theme === 'dark' ? <PiMoonBold aria-hidden="true" /> : <PiSunBold aria-hidden="true" />}
                    <span>Modo oscuro</span>
                </LabelStyled>
                <ToggleStyled
                    type="button"
                    role="switch"
                    aria-checked={theme === 'dark'}
                    aria-label="Modo oscuro"
                    $on={theme === 'dark'}
                    onClick={handleToggleTheme}
                />
            </RowCardStyled>

            <SectionLabelStyled>Datos</SectionLabelStyled>
            <DangerZoneStyled>
                {confirmingReset ? (
                    <>
                        <Button className="buttonDanger" text="Confirmar: borrar todas mis metas" onClick={handleReset} />
                        <Button className="buttonGhost" text="Cancelar" onClick={() => setConfirmingReset(false)} />
                    </>
                ) : (
                    <Button className="buttonGhost" text="Borrar todos mis datos" onClick={() => setConfirmingReset(true)} />
                )}
            </DangerZoneStyled>

            <SectionLabelStyled>Perfil</SectionLabelStyled>
            <DangerZoneStyled>
                {confirmingForget ? (
                    <>
                        <Button className="buttonDanger" text="Confirmar: olvidar mi perfil" onClick={forgetProfile} />
                        <Button className="buttonGhost" text="Cancelar" onClick={() => setConfirmingForget(false)} />
                    </>
                ) : (
                    <Button className="buttonGhost" text="Olvidar mi perfil" onClick={() => setConfirmingForget(true)} />
                )}
            </DangerZoneStyled>
        </AppShell>
    )
}

export default ProfilePage
