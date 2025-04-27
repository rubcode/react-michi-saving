import styled from 'styled-components'

const TheadStyled = styled.thead`
    background-color: var(--primaryColor);
    color: var(--white);
    tr{
        border-block-end: 1px solid var(--grey);
    }
    th{
        padding-inline: 1rem;
        text-align: center;
    }
    @media (max-width: 750px) {
        &{
            font-size: 0.8rem;
        }
    }
`

function Thead({headers}) {
    return (
        <TheadStyled>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
        </TheadStyled>
    )
}

export default Thead
