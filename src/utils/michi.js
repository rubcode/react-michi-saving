const STAGES = [
    { max: 24, image: '/assets/thin.png', label: 'Apenas estamos empezando' },
    { max: 49, image: '/assets/normal.png', label: 'Tu michi está creciendo' },
    { max: 74, image: '/assets/fat.png', label: 'Michi satisfecho' },
    { max: 99, image: '/assets/fatter.png', label: 'Ya casi llenamos esa pancita' },
    { max: Infinity, image: '/assets/fatter.png', label: '¡Meta alcanzada!' },
]

export function getMichiStage(percentage) {
    const clamped = Number.isFinite(percentage) ? Math.max(0, percentage) : 0
    const stage = STAGES.find((s) => clamped <= s.max)
    return {
        image: stage.image,
        label: stage.label,
        isComplete: clamped >= 100,
    }
}
