import { Flex, 
    Square,
    Input, 
    InputGroup,
    InputLeftElement,  
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer, 
    Box
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
    const [searchString, setSearchString] = useState("");

    const fetchData = () => {  
        getById(user.userId, token)
        .then(resp=> setForms(parsePayload(resp)) )
        .catch(err=>console.log(err))
    }

    useEffect(()=>{  
        if (user){
            fetchData();
        }       
        
    },[])

    const handleCreatePresentation = (ev) =>{
        ev.preventDefault()
        createForm(user.userId, token)
        .then(resp=> {
            const form = parsePayload(resp);
            setForms((oldForms)=> [...oldForms, form]) 
        })
        .catch(err=>console.log(err))
    }

    const handleSearch = (ev) => {
        setSearchString(ev);
    }

    return (
        <Square bg="lightgray" w="100%" h="90vh">
            <Flex bg="white" w="100%" h={"95%"} m={"10px"} justifyContent="left" flexDir={"column"} >            
                <Flex bg="white" w="95%" h={"5%"} m={"10px"} justifyContent="left" flexDir={"column"}>
                    <Flex flexDir={"row"}> 
                        <Flex flexDir={"row"} gap={"5px"} w="80%"> 
                            <CustomButton colorScheme={"messenger"} icon={HiPlus} text="Nueva presentación" 
                                onClick={(ev)=>handleCreatePresentation(ev)} />
                        </Flex>
                        
                        <Flex justifyContent="right" gap={"5px"} flexDir={"row"} > 
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'/>
                                <Input type="text" onChange = {(event) => { handleSearch(event.target.value) }} placeholder='Tipeé algo para buscar' />
                            </InputGroup>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex bg="white" w="95%" h={"85%"} m={"10px"} justifyContent="left" flexDir={"column"}>
                    <Box overflowX="scroll">
                        <TableContainer >
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
                                    {forms ? forms.map( form => { 
                                        if(form.name.toLowerCase().startsWith(searchString.toLowerCase()))
                                            return <TableRow key = {form.code} form = {form} fetch={fetchData}/> 
                                    }): null }
                                </Tbody>
                            </Table>
                        </TableContainer>     
                    </Box>         
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
