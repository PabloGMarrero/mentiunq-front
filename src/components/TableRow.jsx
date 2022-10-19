import { Tr, Td, Link } from '@chakra-ui/react'
import { Link as ReachLink } from "react-router-dom"

const TableRow = ({form}) => {

    return(
        <Tr>
            <Td><Link as={ReachLink} to={'/app/presentation/'+form.code+'/edit'} >{form.name}</Link ></Td>
            <Td>{form.codeShare}</Td>
            <Td>{form.updateDate}</Td>
            <Td>{form.creationDate}</Td>
        </Tr>
    )
}

export default TableRow;