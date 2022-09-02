import { Box, Flex, Text, Divider, ButtonGroup, IconButton, Icon } from '@chakra-ui/react'
import { BiShareAlt, BiExport } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';
import { HiPlus } from 'react-icons/hi'
import { MdPlayArrow } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

import CustomButton from '../components/CustomButton';



const TopNavbar = () => {
    return(
        <Flex
            flexDir='row'
            justifyContent='space-between'
        >
            <Box marginLeft={10} marginTop={"-10px"}>
                <Text fontSize='18px' fontWeight={600}>My first presentation</Text >
                <Text fontSize='13px' fontWeight={600} color="rgba(16, 24, 52, 0.5)">Created by</Text >
            </Box>
            <Flex 
                flexDir='row'
                gap={2}
                alignItems="center"
            >
                <Flex alignItems="center">
                    <Icon as={BsCheck} color={"#48BB78"} w={6} h={6}/> 
                    <Text fontSize='12px' fontWeight={300} >Saved</Text>
                </Flex>
                <Divider orientation='vertical' />
                <Icon as={AiOutlineQuestionCircle} w={6} h={6}/> 
                <Divider orientation='vertical' />
                <p>Profile</p>
                <CustomButton bg={"#CBD5E0"} icon={BiShareAlt} text="Share"/>
                <ButtonGroup w={130} isAttached colorScheme={"messenger"} >
                    <CustomButton colorScheme={"messenger"} icon={MdPlayArrow} text="Present" wB={6} hB={6}/>               
                    <IconButton aria-label='Add to friends' icon={<IoIosArrowDown />} />
                </ButtonGroup>
                
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
                gap={2}
            >
                <CustomButton colorScheme={"messenger"} icon={HiPlus} text="New slide"/>
                <CustomButton bg={"#CBD5E0"} icon={BiExport} text="Import"/>
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
            <Divider m={2} />
            <BottomNavbar/>
        </Flex>
    )        
}

export default Navbar;