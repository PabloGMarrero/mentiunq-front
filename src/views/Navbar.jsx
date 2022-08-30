import { Box, Flex, Text } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"

const TopNavbar = () => {
    return(
        <Flex
            flexDir='row'
            justifyContent='space-between'
        >
            <Box >
                <Text fontSize='4xl'>My first presentation</Text >
                <Text fontSize='2xl'>Created by</Text >
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
        >
            <Flex 
                flexDir='row'
            >
                <p>+New slide</p>
                <p>Import</p>
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
        <Box bg="white">
            <TopNavbar/>
            <BottomNavbar/>
        </Box>
    )        
}

export default Navbar;