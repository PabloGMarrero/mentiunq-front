import { Flex, Box, Text, Icon } from '@chakra-ui/react'
import { MdPlayArrow } from 'react-icons/md'

const Slide = ({number}) => {
    return(
        <Flex>
            <Box>
                <Flex flexDir={"column"} alignItems="center">
                    <Text fontSize='12px' fontWeight={600} >{number}</Text>
                    <Icon as={MdPlayArrow} color={"#319795"} w={6} h={6}/> 
                </Flex>
            </Box>
            <Flex m={2} justifyContent={"center"} w="150px" borderWidth='1px' rounded='xs' h="100px" >
                <Box>
                    Contenido...
                </Box>
            </Flex>
        </Flex>
    )
}

export default Slide;