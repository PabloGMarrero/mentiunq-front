import { Flex, Text, Box, Container, FormControl, FormLabel, Center, Square } from '@chakra-ui/react'
import Navbar from './Navbar'
import { findAll } from '../services/slides-service';
import { useState, useEffect } from 'react';
import { Select } from "chakra-react-select"
import Slide from '../components/Slide';

const LeftBar = () =>
{
    return (
        <Center>
            <Flex flexDir="column" >
                <Slide number={1}/>
                <Slide number={2}/>
                <Slide number={3}/>
            </Flex>
        </Center>
    )
}

const MainContent = ()=> {
    return (
        <Square bg="lightgray" w="65%" >
            <Flex bg="white" w="100%" h={"80%"} m={"0 50px 100px 50px"} justifyContent="center">
                <Text>Contenido principal</Text>
            </Flex>
        </Square>
    )
}

const RightBar = ({slides}) =>
{
    return (
        <Box flex='1'>
            <Container>
                <FormControl >
                    <FormLabel w={"300px"}>Slide type</FormLabel>
                    <Select
                        name="slides"
                        options={
                            slides
                        }
                        placeholder="Select slide type."
                        closeMenuOnSelect={true}
                        hasStickyGroupHeaders 
                    />
                </FormControl>
            </Container>
        </Box>
    )
}

const EditPresentation = () => {
    
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchData = () => {   
            findAll()
            .then(resp=>setSlides(resp))
            .catch(err=>console.log(err))
        }

        fetchData();
    }, []);

    return (
        <Flex flexDir="column"  w="100%">
            <Navbar/>
            <Flex flexDir="row" paddingTop={5} h={"80vh"}>
                <LeftBar/>
                <MainContent/>
                <RightBar slides={slides}/>
            </Flex>
        </Flex>
    )
}

export default EditPresentation;