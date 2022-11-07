import { Text, Stack, VStack, Box, Heading, RadioGroup, Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parsePayload } from '../utils/parse-payload'
import { getFormByCode } from '../services/form-service';

const Result = () => {
    const [token] = useState(localStorage.getItem("accessToken"));
    const formCode = useParams().hash;
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        fetchQuestionsFormByFormId();
    }, []);

    const Card = ({title, desc, wide}) => {        
            return <>
                <Box p={5} w={wide} shadow='md' borderWidth='2px' >
                    <Heading textAlign={"center"} fontSize='4xl'>{title}</Heading>
                    <Text textAlign={"center"} mt={4}>{desc}</Text>
                </Box>
              </>
    }

    const fetchQuestionsFormByFormId = () => {
        getFormByCode(formCode, token)
        .then(resp=>{
            setQuestions(parsePayload(resp).questions);
            return questions;
        })
        .catch(err=>console.log(err))
    }

    const CardList = ({currentQuestions}) => {        
        return <>
            <Stack spacing={8} direction='Column'>  
                <Stack p={2} spacing={8} direction='row'>
                    {(() => {        
                        let indents = [];                
                        for (let question in currentQuestions) {
                            indents.push(
                                <Box key={currentQuestions[question].id} p={5} w="30%" h="20vh" shadow='md' borderWidth='2px' >
                                    <Flex justifyContent="left" >
                                        <Text fontSize='xl' textAlign={"center"} fontWeight='semibold'> 
                                            {currentQuestions[question].question ? currentQuestions[question].question : "Sin pregunta" }
                                        </Text>
                                    </Flex>
                                    <Flex justifyContent="left" >
                                        <Flex flexDir='column' gap= "1px" >                                            
                                                {
                                                    currentQuestions[question].mentiOptions ? currentQuestions[question].mentiOptions.map(
                                                        option => 
                                                            {return <Text textAlign={"left"}> {option.name}</Text>}
                                                    ): null 
                                                }                                            
                                        </Flex>
                                    </Flex>
                                </Box>
                            )
                        }
                        return indents;                        
                    })()}
                </Stack>
            </Stack>
          </>
    }

    return (
        <VStack w="100%" h="90vh" spacing={8}>
                <Heading w="50%" textAlign={"left"} fontSize='4xl' mt={4}>Resultados de la presentación</Heading>
                <Box w="50%" p={5} shadow='md' borderWidth='2px' justifyContent={"left"} >
                    <Heading fontSize='xl' mt={4}>Estadísticas de la presentación</Heading>
                    <Stack spacing={8} direction='row'>    
                        <Card wide="50%" title={"105"} desc={"Votos"}/>
                        <Card wide="50%" title={"10"} desc={"Slides"}/>
                    </Stack>
                </Box>
                <Box w="50%" p={5} shadow='md' borderWidth='2px' justifyContent={"left"} >
                    <Heading fontSize='xl' mt={4}>22 Slides</Heading>
                    <Stack spacing={8} direction='row'>    
                        <Card wide="33.3%" title={"2"} desc={"Slides Contenido"}/>
                        <Card wide="33.3%" title={"10"} desc={"Slides Abiertas"}/>
                        <Card wide="33.3%" title={"10"} desc={"Slides Cerradas"}/>
                    </Stack>
                </Box>
                <Box w="50%" p={5} shadow='md' borderWidth='2px' justifyContent={"left"} >
                    <Heading fontSize='xl' mt={4}>Descargar Slides</Heading>
                    {(() => {        
                        let indents = [];
                        let tempQuestions = questions;
                        while (tempQuestions.length > 0) {
                            indents.push(<CardList key={tempQuestions.at(0).id} currentQuestions={tempQuestions.slice(0, 3)}/>);
                            tempQuestions = tempQuestions.slice(3);
                        }
                        return indents;                        
                    })()}
                    
                </Box>
        </VStack>
        
    )
      
}

export default Result;