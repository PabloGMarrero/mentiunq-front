import { Tr, Td } from '@chakra-ui/react'

const TableRow = ({name, creator, modified, created}) => {
    return(
        <Tr>
            <Td>{name}</Td>
            <Td>{creator}</Td>
            <Td>{modified}</Td>
            <Td>{created}</Td>
        </Tr>
    )
}

export default TableRow;