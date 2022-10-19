import { Flex, Text, Box, Container, FormControl, FormLabel, Square, Button, 
    Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter,
    Input, useDisclosure, Stack} from '@chakra-ui/react'
import Navbar from './Navbar'
import CustomButton from '../components/CustomButton'
import { findAll } from '../services/slides-service';
import { createSlide, getQuestionsById, deleteQuestionById } from '../services/form-service';
import { parsePayload } from '../utils/parse-payload'
import { useState, useEffect, useRef } from 'react';
import { Select } from "chakra-react-select"
import Slide from '../components/Slide';
import { HiPlus } from 'react-icons/hi'
import { BiExport } from 'react-icons/bi'

const LeftBar = ({formId, questions, deleteSlide}) =>
{
    
    return (
        <Box width={"25%"} >
            <Flex flexDir="column">
                {questions ? questions.map( question => <Slide key = {question.id} question = {question} deleteSlide ={deleteSlide} formId={formId} /> ): null }
            </Flex>
        </Box>
    )
}

const MainContent = ()=> {
    return (
        <Square bg="lightgray" w="65%" >
            <Flex bg="white" w="100%" h={"80%"} m={"0 50px 100px 50px"} justifyContent="center">
                <Text>Contenido principal</Text>
            </Flex>
        </Square>
    )
}

const RightBar = ({slides}) =>
{
    return (
        <Box flex='1'>
            <Container>
                <FormControl >
                    <FormLabel w={"300px"}>Slide type</FormLabel>
                    <Select
                        name="slides"
                        options={
                            slides
                        }
                        placeholder="Select slide type."
                        closeMenuOnSelect={true}
                        hasStickyGroupHeaders 
                    />
                </FormControl>
            </Container>
        </Box>
    )
}

const BottomNavbar = ({newSlide, slides}) => {
    return(
        <Flex 
            flexDir='column'            
        >
            <Text fontSize='13px' fontWeight={600} color="rgba(16, 24, 52, 0.5)">Created by</Text >
            <Flex
                justifyContent={"space-between"}
            >
                
                <Flex 
                    flexDir='row'
                    gap={2}
                >
                    <NewSlideDrawer newSlide={newSlide} slides={slides} />
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

const NewSlideDrawer = ({newSlide, slides}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()
    const [questionName, setQuestionName] = useState('');
    const [slideId, setSlideId] = useState(null);

  return (
    <>
        <CustomButton colorScheme={"messenger"} icon={HiPlus} text="New slide" onClick={onOpen}/>
      <Drawer
        isOpen={isOpen}
        placement='left'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create a new slide
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='username'>Name</FormLabel>
                <Input
                  ref={firstField}
                  id='username'
                  placeholder='Please enter slide name'
                  onChange={(ev) => setQuestionName(ev.target.value)}
                />
              </Box>


              <Box>
              <FormControl >
                    <FormLabel w={"300px"}>Slide type</FormLabel>
                    <Select
                        name="slides"
                        options={
                            slides
                        }
                        placeholder="Select slide type."
                        closeMenuOnSelect={true}
                        hasStickyGroupHeaders
                        onChange={(ev) => setSlideId(ev.value)}
                    />
                </FormControl>
              </Box>

            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={ev=>newSlide(questionName, slideId, onClose)}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const EditPresentation = ({formId, defaultQuestions}) => {
    
    const [slides, setSlides] = useState([]);
    const [questions, setQuestions] = useState(defaultQuestions);
    const [token] = useState(localStorage.getItem("accessToken"));
    //const [slideId, setSlideId] = useState(null);
    //const [question, setQuestion] = useState('');

    useEffect(() => {
        const fetchData = () => {   
            findAll()
            .then(resp=>setSlides(resp))
            .catch(err=>console.log(err))
        }
        fetchQuestions();
        fetchData();
    }, []);
    
    const fetchQuestions = () => {
        getQuestionsById(5, token)
        .then(resp=>{
            setQuestions(parsePayload(resp))
        })
        .catch(err=>console.log(err))
    }

    const deleteSlide = (questionId) => {
        deleteQuestionById(5, questionId, token)
        .then(resp=>{
            fetchQuestions();
        })
        .catch(err=>console.log(err))
    }

    const handleCreateNewSlide = (question, slideId, onClose) =>{
        createSlide(5, token, slideId, question)   
        .then(resp=>{
            onClose();
            fetchQuestions();
        })
        .catch(err=>console.log(err))
    }

    return (
        <Flex flexDir="column"  w="100%">
            <Navbar/>
            <BottomNavbar slides={slides} newSlide={handleCreateNewSlide} />
            <Flex flexDir="row" paddingTop={5} h={"80vh"}>
                <LeftBar formId={5} questions={questions} deleteSlide={deleteSlide}/>
                <MainContent/>
                <RightBar slides={slides}/>
            </Flex>
        </Flex>
    )
}

export default EditPresentation;