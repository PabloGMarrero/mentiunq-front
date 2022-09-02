import { Button, Icon, Text } from '@chakra-ui/react'

const CustomButton = ({bg, colorScheme, icon, text, wB, hB}) => {
    return(
        <Button bg={bg} colorScheme={colorScheme}>
            <Icon as={icon} w={wB} h={hB} />
            <Text m={1}>{text}</Text>                  
        </Button>
    )
}

export default CustomButton;