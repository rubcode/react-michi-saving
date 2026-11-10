import styled from 'styled-components'
import { CATEGORIES } from '../../constants/categories'

const GridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
    gap: 0.6rem;
`

const ChipStyled = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    padding: 0.75rem 0.5rem;
    background: ${(props) => (props.$active ? 'var(--accentTint)' : 'var(--surface)')};
    border: 1px solid ${(props) => (props.$active ? 'var(--accent)' : 'var(--border)')};
    border-radius: var(--radius-control);
    color: ${(props) => (props.$active ? 'var(--textPrimary)' : 'var(--textSecondary)')};
    font: 500 0.75rem var(--font);
    cursor: pointer;

    svg{
        font-size: 1.4rem;
    }
`

function CategoryPicker({ value, onChange }) {
    return (
        <GridStyled role="radiogroup" aria-label="Categoría de la meta">
            {CATEGORIES.map((category) => (
                <ChipStyled
                    key={category.id}
                    type="button"
                    role="radio"
                    aria-checked={value === category.id}
                    $active={value === category.id}
                    onClick={() => onChange(category.id)}
                >
                    <category.Icon aria-hidden="true" />
                    <span>{category.label}</span>
                </ChipStyled>
            ))}
        </GridStyled>
    )
}

export default CategoryPicker
