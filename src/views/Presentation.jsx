import { Flex, Text } from '@chakra-ui/react'
import { HiPlus } from 'react-icons/hi'
import { BiExport } from 'react-icons/bi';
import CustomButton from '../components/CustomButton';

const BottomNavbar = () => {
    return(
        <Flex 
            flexDir='row'
            justifyContent={"space-between"}
            
        >
            <Flex>
                <Text fontSize='13px' fontWeight={600} color="rgba(16, 24, 52, 0.5)">Created by</Text >
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
        </Flex>
    )
}


const Presentation = () => {
    return(
        <Flex>
            <BottomNavbar/> 
            Presentations....
        </Flex>
    )
}

export default Presentation;