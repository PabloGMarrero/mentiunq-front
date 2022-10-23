import { Flex } from '@chakra-ui/react'
import { getVotingQuestion } from '../services/form-service';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parsePayload } from '../utils/parse-payload'

const Voting = () => {
    const [question, setQuestion] = useState([]);
    const codeShare = useParams().hash
    const [hasVoted, setVoted] = useState(false);
    
    useEffect(()=>{  
        getVotingQuestion(codeShare)
            .then(resp=> 
                {
                    setQuestion(parsePayload(resp));
                    console.log(parsePayload(resp));
                }
            )
            .catch(err=>console.log(err))  
        
    },[])

    return(
        !hasVoted ?
        <Flex>
            <Flex>                
                {question.question}
            </Flex>
            <Flex>
                {question.mentiOptions ? question.mentiOptions.map(
                    option => {                     
                        return <QuestionOption key = {option.code} option = {option}/> 
                    }): null 
                }
            </Flex>
        </Flex>
        :
        <Flex>
            Gracias por tu votación
        </Flex>
    )
}

export default Voting;