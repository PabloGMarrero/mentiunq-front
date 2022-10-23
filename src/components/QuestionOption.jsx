import { Flex, Box, Text, Icon, IconButton } from '@chakra-ui/react'


const QuestionOption = (option) => {
    
    return(
        <Flex> 
            {option.name}
        </Flex>
    )
}

export default QuestionOption;