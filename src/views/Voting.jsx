import { Flex, RadioGroup, Box, Button } from '@chakra-ui/react'
import { getVotingQuestion } from '../services/form-service';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parsePayload } from '../utils/parse-payload'
import QuestionOption from '../components/QuestionOption';

const Voting = () => {
    const [question, setQuestion] = useState([]);
    const codeShare = useParams().hash
    const [hasVoted, setVoted] = useState(false);
    const [value, setValue] = useState('1')
    
    useEffect(()=>{  
        getVotingQuestion(codeShare)
            .then(resp=> 
                {
                    const value1 = '"id":"1","name":"opcion 1"';
                    const value2 = '"id":"2","name":"opcion 2"';
                    const value3 = '"id":"3","name":"opcion 3 "';
                    
                    
                    const q1 = parsePayload(resp)


                    q1.mentiOptions = JSON.parse("[{"+value1+"},{"+value2+"},{"+value3+"}]");

                    setQuestion(q1);
                }
            )
            .catch(err=>console.log(err))  
        
    },[])

    return(
        !hasVoted ?
        <Box width={"100%"}  >
            <Flex flexDir='column' gap="20px" >
                <Flex w="100%" justifyContent="center" color='gray.700' fontWeight='semibold' letterSpacing='wide' fontSize='4xl'>                
                    MentiUNQ
                </Flex>
                <Flex w="100%" justifyContent="center" fontWeight='semibold' fontSize='xl'> 
                    <Flex justifyContent="left" gap= "15px" width={"40%"} >
                        {question.question}
                    </Flex>
                </Flex>
                <Flex w="100%" justifyContent="center" >
                    <Flex flexDir='column' gap= "15px" width={"40%"} >
                        {question.mentiOptions ? question.mentiOptions.map(
                            option => 
                                <RadioGroup key = {option.id} value={value} onChange={setValue}>
                                    <QuestionOption key = {option.id} option = {option}/> 
                                </RadioGroup>
                        ): null 
                        }
                    </Flex>
                </Flex>
                <Flex w="100%" justifyContent="center" > 
                    <Button colorScheme='blue' variant='solid' width={"40%"} onClick={() => setVoted(true)}>
                        Votar
                    </Button>
                </Flex>
            </Flex>
        </Box>
        :
        <Box width={"100%"}>
            <Flex w="100%" justifyContent="center" color='gray.700' fontWeight='semibold' letterSpacing='wide'fontSize='4xl'>                
                    MentiUNQ
            </Flex>
            <Flex w="100%" justifyContent="center" fontWeight='semibold' fontSize='xl'> 
                <Flex gap= "15px">
                    Gracias por tu participación!
                </Flex>
            </Flex>            
        </Box>
    )
}

export default Voting;