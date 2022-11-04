import { Text, Stack, VStack, Box, Heading } from '@chakra-ui/react'

const Result = () => {
    const Card = ({title, desc, wide}) => {        
            return <>
                <Box p={5} w={wide} shadow='md' borderWidth='2px' >
                    <Heading textAlign={"center"} fontSize='4xl'>{title}</Heading>
                    <Text textAlign={"center"} mt={4}>{desc}</Text>
                </Box>
              </>
          }
    
    return (
        <VStack w="100%" h="90vh" spacing={8}>
                <Box w="50%" p={5} shadow='md' borderWidth='2px' justifyContent={"left"} >
                    <Heading fontSize='xl' mt={4}>Estadisticas de la presentacion</Heading>
                    <Stack spacing={8} direction='row'>    
                        <Card wide="50%" title={"105"} desc={"Votos"}/>
                        <Card wide="50%" title={"10"} desc={"Slides"}/>
                    </Stack>
                </Box>
        </VStack>
        
    )
      
}

export default Result;