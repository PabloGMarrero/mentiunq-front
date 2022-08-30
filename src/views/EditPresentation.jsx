import { Flex } from '@chakra-ui/react'
import Navbar from './Navbar'

const LeftBar = () =>
{
    return (
        <Flex
            bg='white'
            minW='10%'
        >
            Contenido izquierdo
        </Flex>
    )
}

const MainContent = ()=> {
    return (
        <Flex>
            Contenido principal
        </Flex>
    )
}

const RightBar = () =>
{
    return (
        <Flex 
            minH='88vh' 
            bg='white'
            minW='10%'
        >
            Contenido derecho
        </Flex>
    )
}

const EditPresentation = () => {
    return (    
        <>
            <Navbar/>
            <Flex 
                justifyContent='space-between'
                minH='250px'
            >
                <LeftBar/>
                <MainContent/>
                <RightBar/>
            </Flex>
        </>
        
    )        
}

export default EditPresentation;