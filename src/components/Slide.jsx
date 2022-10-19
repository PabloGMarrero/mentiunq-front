import { Flex, Box, Text, Icon } from '@chakra-ui/react'
import { MdPlayArrow } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';

const Slide = ({question, deleteSlide, formId}) => {
    const navigate = useNavigate();
    
    return(
        <Flex onClick={ev=> navigate("/app/presentation/"+formId+"/edit/"+question.id)}>
            <Box >
                <Flex flexDir={"column"} alignItems="center">
                    <Text fontSize='12px' fontWeight={600} >{question.id}</Text>
                    <Icon as={MdPlayArrow} color={"#319795"} w={6} h={6}/> 
                </Flex>
                <CustomButton icon={BsTrash} onClick={ev=>deleteSlide(question.id)}/>
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