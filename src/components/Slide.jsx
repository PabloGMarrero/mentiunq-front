import { Flex, Box, Text, Icon, IconButton } from '@chakra-ui/react'
import { MdPlayArrow } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'

const Slide = ({question, deleteSlide, setCurrentQuestion, isBinDisabled}) => {
    
    return(
        <Flex onClick={ev=>setCurrentQuestion(question)}> 
            <Box >
                <Flex flexDir={"column"} alignItems="center">
                    <Text fontSize='12px' fontWeight={600} >{question.id}</Text>
                    <Icon as={MdPlayArrow} color={"#319795"} w={6} h={6}/>
                    <IconButton icon={<BsTrash/>} color={"#333"} w={6} h={6} onClick={ev=>deleteSlide(question.id)} isDisabled = {isBinDisabled}/>
                </Flex>
            </Box>
            <Flex 
                _hover={{ boxShadow: "0 0 11px rgba(33,33,33,.2)" }}
                m={2} 
                justifyContent={"center"} 
                w="150px" 
                borderWidth='1px' 
                rounded='xs' 
                h="100px" >
                <Box>
                    Contenido...
                </Box>
            </Flex>
        </Flex>
    )
}

export default Slide;