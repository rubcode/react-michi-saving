import styled from 'styled-components'
import Thead from './thead'
import Tbody from './tbody'

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
    const data = [
        {no: "😺", date: "2025-01-10", amount: 1000},
        {no: "😺", date: "2025-02-01", amount: 500},
        {no: "😺", date: "2025-03-01", amount: 600},
    ]
    return (
        <TableStyled>
            <Thead
                headers={headers}
            />
            <Tbody 
                data={data}
            />
        </TableStyled>
    )
}

export default Table
