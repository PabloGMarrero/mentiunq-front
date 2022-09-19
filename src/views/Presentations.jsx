import { Flex, 
    Square,
    Input, 
    InputGroup,
    InputLeftElement, 
    Select, 
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer, } from '@chakra-ui/react';

import CustomButton from '../components/CustomButton';
import TableRow from '../components/TableRow';
import { HiPlus } from 'react-icons/hi'

const MainContent = ()=> {
    return (
        <Square bg="lightgray" w="100%" >
            <Flex bg="white" w="100%" h={"95%"} m={"10px"} justifyContent="left" flexDir={"column"}>
                <Flex bg="white" w="95%" h={"95%"} m={"10px"} justifyContent="left" flexDir={"column"}>
                    <Flex>Mis Presentaciones</Flex>
                    <Flex flexDir={"row"}> 
                        <Flex flexDir={"row"} gap={"5px"} w="70%"> 
                            <CustomButton colorScheme={"messenger"} icon={HiPlus} text="New slide"/>
                            <CustomButton bg={"lightgray"} icon={HiPlus} text="New folder"/>
                        </Flex>
                        <Flex justifyContent="right" gap={"5px"} flexDir={"row"} > 
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'/>
                                <Input placeholder='Tipeé algo para buscar' />
                            </InputGroup>
                            <Select placeholder='Mostrar todo'>
                                <option value='option1'>Creados por mi</option>
                                <option value='option2'>Compartidos por mi</option>
                                <option value='option3'>Compartidos a mi</option>
                            </Select>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex bg="white" w="95%" h={"95%"} m={"10px"} justifyContent="left" flexDir={"column"}>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Nombre</Th>
                                <Th>Creador</Th>
                                <Th>Modificado</Th>
                                <Th>Creado</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <TableRow name={"Formulario 1"} creator={"Yo"} modified={"15-09-2022"} created={"14-09-2022"}/>
                            <TableRow name={"Formulario 2"} creator={"Pablo"} modified={"15-09-2022"} created={"13-09-2022"}/>
                            <TableRow name={"Formulario 3"} creator={"Yo"} modified={"14-09-2022"} created={"11-09-2022"}/>
                            <TableRow name={"Formulario 4"} creator={"Yo"} modified={"15-09-2022"} created={"10-09-2022"}/>
                        </Tbody>
                    </Table>
                </TableContainer>              
                </Flex>
            </Flex>
        </Square>
    )
}

const Presentations = () => {
    return(
        <Flex flexDir="column"  w="100%">            
                <MainContent/>
        </Flex>
    )
}

export default Presentations;