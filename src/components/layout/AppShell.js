import styled from 'styled-components'
import BottomNav from './BottomNav'

const ShellStyled = styled.div`
    min-height: 100vh;
    max-width: 960px;
    margin: 0 auto;
    padding: 1.5rem 1.25rem calc(96px + 1.5rem);

    @media (min-width: 700px) {
        padding-inline: 2.5rem;
    }
`

function AppShell({ children }) {
    return (
        <>
            <ShellStyled>{children}</ShellStyled>
            <BottomNav />
        </>
    )
}

export default AppShell
