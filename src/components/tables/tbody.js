import styled from 'styled-components'

const TbodyStyled = styled.tbody`
    tr{
        border-block-end: 1px solid var(--greyDarken);
    }
    td{
        padding-inline: 1rem;
        padding-block: .5rem;
        text-align: center;
        color: var(--white);
    }
    @media (max-width: 750px) {
        &{
            font-size: 0.8rem;
        }
    }
`

function Tbody({data}) {
    return (
        <TbodyStyled>
            {
                data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.no}</td>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))
            }
        </TbodyStyled>
    )
}

export default Tbody
