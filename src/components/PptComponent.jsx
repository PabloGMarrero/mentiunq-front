import { Flex, Box, Square, RadioGroup } from '@chakra-ui/react'
import QuestionOption from '../components/QuestionOption';

const PptComponent = ({currentQuestion})=> {

    return(
        currentQuestion ?
        <Square bg="lightgray" w="65%" >
            <Flex bg="white" w="100%" h={"80%"} m={"0 50px 100px 50px"} justifyContent="center">
                <Box width={"100%"}  >
                    <Flex flexDir='column' gap="20px" >
                        <Flex w="100%" justifyContent="center" color='gray.700' fontWeight='semibold' letterSpacing='wide' fontSize='4xl'>                
                            MentiUNQ
                        </Flex>
                        <Flex w="100%" justifyContent="center" fontWeight='semibold' fontSize='xl'> 
                            <Flex justifyContent="left" gap= "15px" width={"40%"} >
                                {currentQuestion.question}
                            </Flex>
                        </Flex>
                        <Flex w="100%" justifyContent="center" >
                            <Flex flexDir='column' gap= "15px" width={"40%"} >
                                {currentQuestion.mentiOptions ? currentQuestion.mentiOptions.map(
                                    option => 
                                        <RadioGroup key = {option.id} onChange={e=>console.log(e)}>
                                            <QuestionOption key = {option.id} option = {option}/> 
                                        </RadioGroup>
                                ): null 
                                }
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Square>
        : null
    )
}

export default PptComponent;