import styled from 'styled-components'
import { useEffect } from 'react'

const BannerStyled = styled.div`
    background: var(--accentTint);
    border: 1px solid var(--accent);
    color: var(--textPrimary);
    border-radius: var(--radius-control);
    padding: 1rem 1.25rem;
    text-align: center;
    font: var(--bodySemiBold);
`

function CelebrationBanner({ message, onDismiss }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onDismiss) onDismiss()
        }, 3200)
        return () => clearTimeout(timer)
    }, [onDismiss])

    return <BannerStyled role="status">{message}</BannerStyled>
}

export default CelebrationBanner
