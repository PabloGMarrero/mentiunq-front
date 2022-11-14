import { Text, Stack, VStack, Box, Heading, RadioGroup, Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parsePayload } from '../utils/parse-payload'
import { getFormByCode, getResultsByFormCode } from '../services/form-service';
import Navbar from './Navbar';

const Result = () => {
    const [token] = useState(localStorage.getItem("accessToken"));
    const formCode = useParams().hash;
    const [questions, setQuestions] = useState([]);
    const [slidesAmount, setSlidesAmount] = useState(0);
    const [votesAmount, setVotesAmount] = useState(0);
    const [closedSlidesAmount, setClosedSlidesAmount] = useState(0);
    const [openSlidesAmount, setOpenSlidesAmount] = useState(0);
    const [contentSlidesAmount, setContenSlidesAmount] = useState(0);
    
    useEffect(() => {
        fetchQuestionsFormByFormId();
        fetchResultsByFormCode();
    }, []);

    const Card = ({title, desc, wide}) => {        
            return <>
                <Box p={5} w={wide} shadow='md' borderWidth='2px' >
                    <Heading textAlign={"center"} fontSize='4xl'>{title}</Heading>
                    <Text textAlign={"center"} mt={4}>{desc}</Text>
                </Box>
              </>
    }
    
    const fetchResultsByFormCode = () => {
        getResultsByFormCode(formCode, token)
        .then(resp=>{

            const response = parsePayload(resp);
            setSlidesAmount(response.slides);
            setVotesAmount(response.votes);
            setClosedSlidesAmount(response.closeSlides);
            setOpenSlidesAmount(response.openSlides);
            setContenSlidesAmount(response.contentSlides);
        })
        .catch(err=>console.log(err))
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
                                <Box key={currentQuestions[question].id} p={5} w="30%" h="30vh" shadow='md' borderWidth='2px' >
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
                                                            {return <Text key={option.id} textAlign={"left"}> {option.name}</Text>}
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
        <Flex flexDir={"column"}w="100%">
            <Navbar/>
            <VStack w="100%" h="90vh" spacing={8}>
                    <Heading w="50%" textAlign={"left"} fontSize='4xl' mt={4}>Resultados de la presentación</Heading>
                    <Box w="50%" p={5} shadow='md' borderWidth='2px' justifyContent={"left"} >
                        <Heading fontSize='xl' mt={4}>Estadísticas de la presentación</Heading>
                        <Stack spacing={8} direction='row'>    
                            <Card wide="50%" title={votesAmount} desc={"Votos"}/>
                            <Card wide="50%" title={slidesAmount} desc={"Slides"}/>
                        </Stack>
                    </Box>
                    <Box w="50%" p={5} shadow='md' borderWidth='2px' justifyContent={"left"} >
                        <Heading fontSize='xl' mt={4}>{slidesAmount} Slides</Heading>
                        <Stack spacing={8} direction='row'>    
                            <Card wide="33.3%" title={contentSlidesAmount} desc={"Slides Contenido"}/>
                            <Card wide="33.3%" title={openSlidesAmount} desc={"Slides Abiertas"}/>
                            <Card wide="33.3%" title={closedSlidesAmount} desc={"Slides Cerradas"}/>
                        </Stack>
                    </Box>
                    <Box w="50%" p={5} shadow='md' borderWidth='2px' justifyContent={"left"} >
                        <Heading fontSize='xl' mt={4}>Resumen Slides</Heading>
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
        </Flex>
        
    )
      
}

export default Result;