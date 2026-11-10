import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import {
    PiHouseSimpleBold,
    PiHouseSimpleLight,
    PiWalletBold,
    PiWalletLight,
    PiClockCounterClockwiseBold,
    PiClockCounterClockwiseLight,
    PiUserBold,
    PiUserLight,
} from 'react-icons/pi'

const NavStyled = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding: 0.5rem 0 max(0.5rem, env(safe-area-inset-bottom));
    z-index: 10;
`

const ItemStyled = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    padding: 0.4rem 0.9rem;
    border-radius: var(--radius-control);
    text-decoration: none;
    color: var(--textSecondary);
    font: 500 0.7rem var(--font);

    svg{
        font-size: 1.35rem;
    }

    &.active{
        color: var(--textPrimary);
        background: var(--accentTint);
    }
`

const ITEMS = [
    { to: '/', label: 'Inicio', Icon: PiHouseSimpleBold, IconOutline: PiHouseSimpleLight, end: true },
    { to: '/goals', label: 'Metas', Icon: PiWalletBold, IconOutline: PiWalletLight },
    { to: '/activity', label: 'Actividad', Icon: PiClockCounterClockwiseBold, IconOutline: PiClockCounterClockwiseLight },
    { to: '/profile', label: 'Perfil', Icon: PiUserBold, IconOutline: PiUserLight },
]

function BottomNav() {
    return (
        <NavStyled aria-label="Navegación principal">
            {ITEMS.map(({ to, label, Icon, IconOutline, end }) => (
                <ItemStyled key={to} to={to} end={end}>
                    {({ isActive }) => (
                        <>
                            {isActive ? <Icon aria-hidden="true" /> : <IconOutline aria-hidden="true" />}
                            <span>{label}</span>
                        </>
                    )}
                </ItemStyled>
            ))}
        </NavStyled>
    )
}

export default BottomNav
