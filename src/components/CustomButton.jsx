import { Button, Icon, Text } from '@chakra-ui/react'

const CustomButton = ({bg, colorScheme, icon, text, wB, hB, onClick}) => {
    return(
        <Button bg={bg} colorScheme={colorScheme} onClick={onClick} >
            <Icon as={icon} w={wB} h={hB} />
            <Text m={1}>{text}</Text>                  
        </Button>
    )
}

export default CustomButton;