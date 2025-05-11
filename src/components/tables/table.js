import styled from 'styled-components'
import Thead from './thead'
import Tbody from './tbody'
import { useContext } from 'react'
import { ContributionsContext } from '../../contexts/contributionsContext'

const TableStyled = styled.table`
    width: 100%;
    display: table;
    border-collapse: collapse;
    text-align: center;

    @media (max-width: 750px) {
        &{
            width: 100%;
            table-layout: auto;
        }
    }
`

function Table() {
    const headers = ["No","Fecha","Monto"]
    const { contributionsList } = useContext(ContributionsContext);
    return (
        <TableStyled>
            <Thead
                headers={headers}
            />
            <Tbody 
                data={contributionsList}
            />
        </TableStyled>
    )
}

export default Table
