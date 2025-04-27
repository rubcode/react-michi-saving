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

function Table({...props}) {
    const headers = ["No","Fecha","Monto"]

    return (
        <TableStyled>
            <Thead
                headers={headers}
            />
            <Tbody 
                data={props.data}
            />
        </TableStyled>
    )
}

export default Table
