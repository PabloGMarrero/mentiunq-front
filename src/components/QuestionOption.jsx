import { Box, Stack, Radio, Flex } from '@chakra-ui/react'


const QuestionOption = ({option}) => {
    
    return(
        <Box borderWidth='2px' borderRadius='lg' overflow='hidden'>
            <Flex w="95%" h={"95%"} p='4' justifyContent="left" flexDir={"column"} > 
                <Stack>
                    <Radio size='lg' name='1' value={option.id.toString()} colorScheme='blue'>
                        {option.name}
                    </Radio>
                </Stack>
            </Flex>
        </Box>    
    )
}

export default QuestionOption;