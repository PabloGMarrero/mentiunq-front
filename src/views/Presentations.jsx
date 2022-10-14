import { Flex, 
    Square,
    Input, 
    InputGroup,
    InputLeftElement, 
    Select, 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer, 
} from '@chakra-ui/react';

import CustomButton from '../components/CustomButton';
import TableRow from '../components/TableRow';
import TopNavbar from '../views/Navbar';
import { HiPlus } from 'react-icons/hi'
import { useEffect, useState } from 'react';
import { getById } from '../services/user-service';
import { createForm } from '../services/form-service'
import { parsePayload } from '../utils/parse-payload';

const MainContent = ()=> {
    const [forms, setForms] = useState([]);
    const [user] = useState(JSON.parse(localStorage.getItem("user")));
    const [token] = useState(localStorage.getItem("accessToken"));

    useEffect(()=>{  
        const fetchData = () => {  
            getById(user.userId, token)
            .then(resp=> setForms(parsePayload(resp)) )
            .catch(err=>console.log(err))
        }

        if (user){
            fetchData();
        }       
        
    },[])

    const handleCreatePresentation = (ev) =>{
        ev.preventDefault()
        createForm(user.userId, token)
        .then(resp=> setForms((oldForms)=> [...oldForms, parsePayload(resp)]) )
        .catch(err=>console.log(err))
    }

    return (
        <Square bg="lightgray" w="100%" >
            <Flex bg="white" w="100%" h={"95%"} m={"10px"} justifyContent="left" flexDir={"column"}>
            
                <Flex bg="white" w="95%" h={"95%"} m={"10px"} justifyContent="left" flexDir={"column"}>
                    <Flex>Mis Presentaciones</Flex>
                    <Flex flexDir={"row"}> 
                        <Flex flexDir={"row"} gap={"5px"} w="70%"> 
                            <CustomButton colorScheme={"messenger"} icon={HiPlus} text="New presentation" 
                                onClick={(ev)=>handleCreatePresentation(ev)} />
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
                                <Th>Código Cooperativo</Th>
                                <Th>Modificado</Th>
                                <Th>Creado</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {forms ? forms.map( form => <TableRow key = {form.code} form = {form}/> ):null}
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
            <TopNavbar/> 
            <MainContent/>
        </Flex>
    )
}

export default Presentations;