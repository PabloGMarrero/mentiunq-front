import { Tr, Td, Link, Menu, MenuButton, MenuList, MenuItem, MenuDivider, IconButton } from '@chakra-ui/react'
import { Link as ReachLink } from "react-router-dom"

const TableRow = ({form}) => {
    return(
            <Tr>
            <Td><Link as={ReachLink} to={'/app/presentation/'+form.code+'/edit'} >{form.name}</Link ></Td>
            <Td>{form.codeShare}</Td>
            <Td>{form.updateDate}</Td>
            <Td>{form.creationDate}</Td>
            <Td>
                <Menu>
                    <MenuButton as={IconButton}
                    aria-label='Options'
                    variant='outline'>
                        ...
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Presentar</MenuItem>
                        <MenuItem>Ver resultados</MenuItem>
                        <MenuItem>Compartir</MenuItem>
                        <MenuDivider />
                        <MenuItem>Renombrar</MenuItem>
                        <MenuItem color="red.500">Borrar</MenuItem>
                    </MenuList>
                </Menu>
            </Td>
        </Tr>
    )
}

export default TableRow;