import { Tr, Td } from '@chakra-ui/react'

const TableRow = ({form}) => {
    return(
        <Tr>
            <Td>{form.name}</Td>
            <Td>{form.codeShare}</Td>
            <Td>{form.updateDate}</Td>
            <Td>{form.creationDate}</Td>
        </Tr>
    )
}

export default TableRow;