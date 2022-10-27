import { Flex, Text, Box, Container, FormControl, FormLabel, Square, Button, 
    Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter,
    Input, useDisclosure, Stack, FormHelperText, FormErrorMessage} from '@chakra-ui/react'
import Navbar from './Navbar'
import CustomButton from '../components/CustomButton'
import Option from '../components/Option'
import { findAll } from '../services/slides-service';
import { getQuestionByCodeShare } from '../services/answer-service';
import { createQuestion, getQuestionsById, deleteQuestionById, getFormByCode, createOption, updateNewCurrentQuestion } from '../services/form-service';
import { parsePayload } from '../utils/parse-payload'
import { useState, useEffect, useRef, useMemo } from 'react';
import { Select } from "chakra-react-select"
import Slide from '../components/Slide';
import { HiPlus } from 'react-icons/hi'
import { BiExport } from 'react-icons/bi'
import { FiSave } from 'react-icons/fi'
import { useParams } from 'react-router-dom';

const LeftBar = ({questions, deleteSlide, updateCurrentQuestion}) =>
{
    return (
        <Box width={"25%"} >
            <Flex flexDir="column">
                {questions ? questions.map( question => 
                    <Slide 
                        key = {question.id} 
                        question = {question} 
                        deleteSlide ={deleteSlide} 
                        updateCurrentQuestion={updateCurrentQuestion}
                        isBinDisabled = {questions.length < 2}
                    /> )
                    : null }
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

const RightBar = ({slides, currentQuestion, addNewOption, setCurrentQuestion}) =>
{
    const [loading, isLoading] = useState(false)
  
    useEffect(()=>{
        if(currentQuestion){
            setCurrentQuestion(currentQuestion)
        }
    }, [currentQuestion])

    const saveQuestion = (ev) => {
        ev.preventDefault()
        isLoading(true)
        /*const numberOption = currentQuestion.mentiOptions.length === 0 ? 1 : currentQuestion.mentiOptions.length + 1
        const option = {"option":"Opción " + numberOption};
        
        createOption(form.id, token, currentQuestion.id, option)
        .then(resp=> {
            const response = parsePayload(resp)
            console.log("currentQuestion", currentQuestion)
            fetchAnswerQuestion()
        })
        .catch(err => console.log(err))*/
        isLoading(false)

        console.log("saveQuestion")
    }


    return (
        <Box flex='1'>
            {currentQuestion ?
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
                        defaultValue={slides[0].options[0].value}
                        value={currentQuestion.question}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel w={"300px"}>Tu pregunta</FormLabel>
                    <Option id={currentQuestion.id} value={currentQuestion.question} />
                </FormControl>

                <FormControl>
                    <FormLabel w={"300px"}>Opciones</FormLabel>
                    {
                        currentQuestion 
                        ? currentQuestion.mentiOptions.map( question => <Option key={question.id} id={question.id} value={question.name} /> )
                        : null 
                    }
                    <Flex gap={2}>
                        <CustomButton bg={"#CBD5E0"} icon={HiPlus} text="Agregá opción" onClick={ev=>addNewOption(ev, currentQuestion.id)} />
                        <CustomButton colorScheme={"teal"}  icon={FiSave} text="Guardar" onClick={ev=>saveQuestion(ev)} />
                    </Flex>
                    
                    
                </FormControl>
            </Container>
            : null
            }
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

const EditPresentation = () => {
    
    const [slides, setSlides] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [token] = useState(localStorage.getItem("accessToken"));
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const code = useParams().hash
    const [form, setForm] = useState(null);
    const [loading, isLoading] = useState(false);

    useEffect(() => {
        const fetchDefaultsSlides = () => {
            isLoading(true)
            findAll()
            .then(resp=>setSlides(resp))
            .catch(err=>console.log(err))
            isLoading(false)
        }
        const fetchFormByCode = (code, token) => {
            isLoading(true)
            getFormByCode(code, token)
            .then(resp=>{     
                const form = parsePayload(resp);        
                setForm(form)
                setQuestions(form.questions)
                fetchAnswerQuestion()
            })
            .catch(err=>console.log(err))
            isLoading(false)
        }
        
        fetchDefaultsSlides();
        if(!form){
            fetchFormByCode(code, token)
        }
        
        //if(form && !loading){
        //    fetchQuestionsFormByFormId();
        //    fetchAnswerQuestion();
        //}
        
    }, [form]);
    
    const fetchAnswerQuestion = () =>{
        if (form){
            isLoading(true)
            getQuestionByCodeShare(form.codeShare, token)
            .then(resp => {
                setCurrentQuestion(parsePayload(resp))
            })
            .catch(err => console.log(err))
            isLoading(false)
        }
        
    }

    const fetchQuestionsFormByFormId = () => { 
        //revisar evitar que al hacer click en la pregunta se dispara este fetch si la pregunta no cambió
        isLoading(true)
        getQuestionsById(form.id, token)
        .then(resp=>{      
            setQuestions(parsePayload(resp))
        })
        .catch(err=>console.log(err))
        isLoading(false)
    }

    const addNewOption = (ev, currentQuestionId) => {
        ev.preventDefault()
        const numberOption = currentQuestion.mentiOptions.length === 0 ? 1 : currentQuestion.mentiOptions.length + 1
        const option = {"option":"Opción " + numberOption};
        isLoading(true)
        createOption(form.id, token, currentQuestionId, option)
        .then(resp=> {
            fetchAnswerQuestion()
        })
        .catch(err => console.log(err))
        isLoading(false)
    }

    const deleteSlide = (questionId) => {
        isLoading(true)
        if(form){
            deleteQuestionById(form.id, questionId, token)
            .then(resp=>{
                fetchQuestionsFormByFormId();
            })
            .catch(err=>console.log(err))
        }
        isLoading(false)
    }

    const updateCurrentQuestion = (questionId) => {
        isLoading(true)
        updateNewCurrentQuestion(questionId, form.id, token)
        .then(resp=>{
            const form = parsePayload(resp);
            setForm(form);
            const question = form.questions.find(question => question.id === questionId);
            setCurrentQuestion(question)
        })
        .catch(err=>console.log(err))
        isLoading(false)
    }

    const handleCreateNewSlide = (question, slideId, onClose) =>{
        if(form){
            isLoading(true)
            createQuestion(form.id, token, slideId, question)   
            .then(resp=>{
                const newQuestion = parsePayload(resp);
                updateCurrentQuestion(newQuestion.id)
                onClose();
                fetchQuestionsFormByFormId();
            })
            .catch(err=>console.log(err))
            isLoading(false)
        }
    }

    return (
        <Flex flexDir="column"  w="100%">
            <Navbar/>
            <BottomNavbar slides={slides} newSlide={handleCreateNewSlide} />
            <Flex flexDir="row" paddingTop={5} h={"80vh"}>
                <LeftBar questions={questions} deleteSlide={deleteSlide} updateCurrentQuestion={updateCurrentQuestion}/>
                <MainContent/>
                <RightBar slides={slides} currentQuestion={currentQuestion} addNewOption={addNewOption} setCurrentQuestion={setCurrentQuestion}/>
            </Flex>
        </Flex>
    )
}

export default EditPresentation;