import styled from 'styled-components'

const TrackStyled = styled.div`
    width: 100%;
    height: 10px;
    background: var(--border);
    border-radius: var(--radius-pill);
    overflow: hidden;
`

const FillStyled = styled.div`
    width: 100%;
    height: 100%;
    border-radius: var(--radius-pill);
    background: linear-gradient(90deg, var(--accentSoft), var(--progress));
    transform-origin: left center;
    transition: transform .4s ease;
`

function ProgressBar({ percentage }) {
    const clamped = Math.min(100, Math.max(0, percentage))
    return (
        <TrackStyled role="progressbar" aria-valuenow={Math.round(clamped)} aria-valuemin={0} aria-valuemax={100}>
            <FillStyled style={{ transform: `scaleX(${clamped / 100})` }} />
        </TrackStyled>
    )
}

export default ProgressBar
