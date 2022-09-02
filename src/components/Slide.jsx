import { Flex, Box, Text, Center } from '@chakra-ui/react'

const Slide = ({number}) => {
    return(
        <Flex>
            <Box>
                <Text>{number}</Text>
            </Box>
            <Flex m={2} justifyContent={"center"} w="150px" borderWidth='1px' rounded='xs' h="100px" >
                <Box >
                    Contenido...
                </Box>
            </Flex>
        </Flex>
    )
}

export default Slide;