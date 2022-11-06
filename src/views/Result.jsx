import { Text, Stack, VStack, Box, Heading } from '@chakra-ui/react'
import PptComponent from '../components/PptComponent.jsx';
import { getQuestionsById } from '../services/form-service';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Result = () => {
    const [questions, setQuestions] = useState([]);
    const [token] = useState(localStorage.getItem("accessToken"));
    const formId = useParams().hash;

    const fetchQuestionsFormByFormId = () => {
        getQuestionsById(formId, token)
        .then(resp=>{      
            setQuestions(parsePayload(resp))
            console.log(resp);
        })
        .catch(err=>console.log(err))
    }
    
    const Card = ({title, desc, wide}) => {        
            return <>
                <Box p={5} w={wide} shadow='md' borderWidth='2px' >
                    <Heading textAlign={"center"} fontSize='4xl'>{title}</Heading>
                    <Text textAlign={"center"} mt={4}>{desc}</Text>
                </Box>
              </>
    }

    const CardList = () => {        
        return <>
            <Stack spacing={8} direction='Column'>  
                <Stack p={2} spacing={8} direction='row'>
                    {(() => {        
                        let indents = [];                
                        for (question in questions) {
                            indents.push(<PptComponent currentQuestion={question}/>)
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
                    <Heading fontSize='xl' mt={4}>Estadisticas de la presentación</Heading>
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
                    <CardList questions={fetchQuestionsFormByFormId()}/>
                </Box>
        </VStack>
        
    )
      
}

export default Result;