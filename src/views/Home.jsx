import { Flex } from '@chakra-ui/react'
import Navbar from './Navbar';

const Home = () => {
    return(
        <Flex flexDir="column"  w="100%">
            <Navbar/>
        </Flex>
    )
}

export default Home;