import { Flex, 
    Square, 
    Text, 
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
    TableCaption,
    TableContainer, } from '@chakra-ui/react';

import CustomButton from '../components/CustomButton';
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
                        <Flex justifyContent="right" flexDir={"row"} > 
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
                                <Tr>
                                    <Td>inches</Td>
                                    <Td>millimetres (mm)</Td>
                                    <Td >25.4</Td>
                                    <Td >25.4</Td>
                                </Tr>
                                <Tr>
                                    <Td>feet</Td>
                                    <Td>centimetres (cm)</Td>
                                    <Td >30.48</Td>
                                    <Td >25.4</Td>
                                </Tr>
                                <Tr>
                                    <Td>yards</Td>
                                    <Td>metres (m)</Td>
                                    <Td >0.91444</Td>
                                    <Td >25.4</Td>
                                </Tr>
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Nombre</Th>
                                    <Th>Creador</Th>
                                    <Th>Modificado</Th>
                                    <Th>Creado</Th>
                                </Tr>
                            </Tfoot>
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