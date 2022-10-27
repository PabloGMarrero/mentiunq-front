import { Box, Stack, Radio, Flex } from '@chakra-ui/react'
import { useEffect } from 'react';


const QuestionOption = (option) => {

    useEffect(()=>{
        console.log(option)
    }, [])
    
    return(
        <Box borderWidth='2px' borderRadius='lg' overflow='hidden'>
            <Flex w="95%" h={"95%"} p='4' justifyContent="left" flexDir={"column"} > 
                <Stack>
                    <Radio size='lg' name='1' value={option.option.id} colorScheme='blue'>
                        {option.option.name}
                    </Radio>
                </Stack>
            </Flex>
        </Box>    
    )
}

export default QuestionOption;