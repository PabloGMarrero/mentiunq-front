import { Box, Flex, Text, Button,HStack } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"

const TopNavbar = () => {
    return(
        <Flex
            flexDir='row'
            justifyContent='space-between'
        >
            <Box >
                <Text fontSize='25px' fontWeight={600}>My first presentation</Text >
                <Text fontSize='13px' fontWeight={600} color="rgba(16, 24, 52, 0.5)">Created by</Text >
            </Box>
            <Flex 
                flexDir='row'
                justifyContent='space-between'
            >
                <p>Saved</p>
                <p>Help</p>
                <p>Profile</p>
                <p>Share</p>
                <p>Present</p>
            </Flex>
        </Flex>
    )
}

const BottomNavbar = () => {
    return(
        <Flex 
            flexDir='row'
            justifyContent={"space-between"}
            
        >
            <Flex 
                flexDir='row'
                gap={[10, 1]}
            >
                <Button colorScheme='messenger'>+ New slide</Button>
                <Button colorScheme='gray'>Import</Button>
            </Flex>
            <Flex 
                flexDir='row'
            >
                <p>Examples</p>
                <p>Themes</p>
                <p>Settings</p>
            </Flex>
        </Flex>
    )
}


const Navbar = () => {
    return (    
        <Flex flexDir={"column"} bg="white" >
            <TopNavbar/>
            <BottomNavbar/>
        </Flex>
    )        
}

export default Navbar;