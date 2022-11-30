import {
  Flex,
  Text,
  Box,
  Container,
  FormControl,
  FormLabel,
  Square,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Input,
  useDisclosure,
  Stack,
  Textarea,
} from "@chakra-ui/react"
import Navbar from "./Navbar"
import CustomButton from "../components/CustomButton"
import Option from "../components/Option"
import { findAll } from "../services/slides-service"
import { getQuestionByCodeShare } from "../services/answer-service"
import {
  createQuestion,
  getQuestionsById,
  deleteQuestionById,
  getFormByCode,
  createOption,
  updateNewCurrentQuestion,
  updateQuestionName,
  deleteOptionById,
  updateOptionName,
  updateContent,
} from "../services/form-service"
import { parsePayload } from "../utils/parse-payload"
import { useState, useEffect, useRef } from "react"
import { Select } from "chakra-react-select"
import Slide from "../components/Slide"
import PptComponent from "../components/PptComponent.jsx"
import { HiPlus } from "react-icons/hi"
import { BiExport } from "react-icons/bi"
import { useParams } from "react-router-dom"

const LeftBar = ({ questions, deleteSlide, updateCurrentQuestion }) => {
  return (
    <Box width={"25%"}>
      <Flex flexDir="column">
        {questions
          ? questions.map((question) => (
              <Slide
                key={question.id}
                question={question}
                deleteSlide={deleteSlide}
                updateCurrentQuestion={updateCurrentQuestion}
                isBinDisabled={questions.length < 2}
              />
            ))
          : null}
      </Flex>
    </Box>
  )
}

const MainContent = ({ currentQuestion, setCurrentQuestion }) => {
  useEffect(() => {}, [currentQuestion])

  return (
    <Square bg="lightgray" w="65%">
      <Flex
        bg="white"
        w="100%"
        h={"80%"}
        m={"0 50px 100px 50px"}
        justifyContent="center"
      >
        <PptComponent currentQuestion={currentQuestion} />
      </Flex>
    </Square>
  )
}

const Paragraph = ({ codeShare, currentQuestion, token }) => {
  const [name, setName] = useState("")

  useEffect(() => {
    //console.log(currentQuestion.mentiOptions)
    if (currentQuestion && currentQuestion.mentiOptions.length) {
      setName(currentQuestion.mentiOptions[0].name)
    }
  }, [currentQuestion])

  const handleChangeContent = (ev) => {
    ev.preventDefault()

    updateContent(codeShare, token, currentQuestion.id, name)
      .then((resp) => {
        //console.log(parsePayload(resp))
        //setVoted(true)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Textarea
      id={currentQuestion.id}
      type="text"
      onChange={(ev) => setName(ev.target.value)}
      onBlur={(ev) => handleChangeContent(ev)}
      //onKeyDown={(ev) => handleEnterEvent(ev)}
      placeholder={name}
      value={name}
      name={name}
    />
  )
}

const DisplaySpecificOption = ({
  currentQuestion,
  addNewOption,
  //handleChangeOptionName,
  deleteOption,
  saveNewOptionName,
  codeShare,
  token,
}) => {
  switch (currentQuestion.slide.nombre) {
    case "Word Cloud":
      return null //TODO ver de sacarlo yq ue caiga en el default
    case "Multiple Choice":
    case "Ranking":
      return (
        <Flex flexDir="column">
          <Text w={"300px"}>Opciones</Text>
          {currentQuestion
            ? currentQuestion.mentiOptions.map((option) => (
                <Option
                  key={option.id}
                  id={option.id}
                  value={option.name}
                  //changeOptionName={handleChangeOptionName}
                  deleteOption={deleteOption}
                  saveNewOptionName={saveNewOptionName}
                />
              ))
            : null}
          <CustomButton
            bg={"#CBD5E0"}
            icon={HiPlus}
            text="Agregá opción"
            onClick={(ev) => addNewOption(ev, currentQuestion.id)}
          />
        </Flex>
      )
    case "Paragraph":
      return (
        <Paragraph
          currentQuestion={currentQuestion}
          codeShare={codeShare}
          token={token}
        />
      )
    case "Open Ended":
      return <p>Open Ended</p>
    default:
      return null
  }
}

const RightBar = ({
  slides,
  currentQuestion,
  addNewOption,
  //handleChangeOptionName,
  saveQuestion,
  deleteOption,
  saveNewOptionName,
  codeShare,
  token,
}) => {
  //const [loading, isLoading] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => {
    if (currentQuestion) {
      setName(currentQuestion.question)
    }
  }, [currentQuestion])

  const handleChangeName = (ev) => {
    ev.preventDefault()
    setName(ev.target.value)
  }

  const handleEnterEvent = (ev) => {
    if (ev.key === "Enter") {
      saveQuestion(ev, name)
    }
  }

  return (
    <Box flex="1">
      {currentQuestion ? (
        <Container>
          <FormControl>
            <FormLabel w={"300px"}>Slide type</FormLabel>
            <Text>{currentQuestion.slide.nombre}</Text>
            {/*<Select
              name="slides"
              options={slides}
              placeholder="Select slide type."
              closeMenuOnSelect={true}
              hasStickyGroupHeaders
              defaultValue={slides[0].options[0].value}
              value={currentQuestion.question}
      />*/}
          </FormControl>
          <FormControl>
            <FormLabel w={"300px"}>Tu pregunta</FormLabel>
            <Input
              id={currentQuestion.id}
              type="text"
              onChange={(ev) => handleChangeName(ev)}
              onBlur={(ev) => saveQuestion(ev, name)}
              onKeyDown={(ev) => handleEnterEvent(ev)}
              placeholder={name}
              value={name}
              name={name}
            />
          </FormControl>

          <FormControl>
            <Flex margin={3}>
              <DisplaySpecificOption
                currentQuestion={currentQuestion}
                addNewOption={addNewOption}
                //handleChangeOptionName={handleChangeOptionName}
                deleteOption={deleteOption}
                saveNewOptionName={saveNewOptionName}
                codeShare={codeShare}
                token={token}
              />
            </Flex>
          </FormControl>
        </Container>
      ) : null}
    </Box>
  )
}

const BottomNavbar = ({ newSlide, slides }) => {
  return (
    <Flex flexDir="column">
      <Text fontSize="13px" fontWeight={600} color="rgba(16, 24, 52, 0.5)">
        Created by
      </Text>
      <Flex justifyContent={"space-between"}>
        <Flex flexDir="row" gap={2}>
          <NewSlideDrawer newSlide={newSlide} slides={slides} />
          <CustomButton bg={"#CBD5E0"} icon={BiExport} text="Import" />
        </Flex>
        <Flex flexDir="row">
          <p>Examples</p>
          <p>Themes</p>
          <p>Settings</p>
        </Flex>
      </Flex>
    </Flex>
  )
}

const NewSlideDrawer = ({ newSlide, slides }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()
  const [questionName, setQuestionName] = useState("")
  const [slideId, setSlideId] = useState(null)

  return (
    <>
      <CustomButton
        colorScheme={"messenger"}
        icon={HiPlus}
        text="New slide"
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new slide
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
                  ref={firstField}
                  id="username"
                  placeholder="Please enter slide name"
                  onChange={(ev) => setQuestionName(ev.target.value)}
                />
              </Box>

              <Box>
                <FormControl>
                  <FormLabel w={"300px"}>Slide type</FormLabel>
                  <Select
                    name="slides"
                    options={slides}
                    placeholder="Select slide type."
                    closeMenuOnSelect={true}
                    hasStickyGroupHeaders
                    onChange={(ev) => setSlideId(ev.value)}
                  />
                </FormControl>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={(ev) => newSlide(questionName, slideId, onClose)}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const EditPresentation = () => {
  const [slides, setSlides] = useState([])
  const [questions, setQuestions] = useState([])
  const [token] = useState(localStorage.getItem("accessToken"))
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const code = useParams().hash
  const [form, setForm] = useState(null)
  const [loading, isLoading] = useState(false)

  useEffect(() => {
    const fetchDefaultsSlides = () => {
      isLoading(true)
      findAll()
        .then((resp) => setSlides(resp))
        .catch((err) => console.log(err))
      isLoading(false)
    }
    const fetchFormByCode = (code, token) => {
      isLoading(true)
      getFormByCode(code, token)
        .then((resp) => {
          const form = parsePayload(resp)

          setForm(form)
          setQuestions(form.questions)
          fetchAnswerQuestion()
        })
        .catch((err) => console.log(err))
      isLoading(false)
    }

    fetchDefaultsSlides()
    if (!form) {
      fetchFormByCode(code, token)
    }

    //if(form && !loading){
    //    fetchQuestionsFormByFormId();
    //    fetchAnswerQuestion();
    //}
  }, [form])

  const fetchAnswerQuestion = () => {
    if (form) {
      isLoading(true)
      getQuestionByCodeShare(form.codeShare, token)
        .then((resp) => {
          setCurrentQuestion(parsePayload(resp))
        })
        .catch((err) => console.log(err))
      isLoading(false)
    }
  }

  const fetchQuestionsFormByFormId = () => {
    //revisar evitar que al hacer click en la pregunta se dispara este fetch si la pregunta no cambió
    isLoading(true)
    getQuestionsById(form.id, token)
      .then((resp) => {
        setQuestions(parsePayload(resp))
      })
      .catch((err) => console.log(err))
    isLoading(false)
  }

  const addNewOption = (ev, currentQuestionId) => {
    ev.preventDefault()
    const numberOption =
      currentQuestion.mentiOptions.length === 0
        ? 1
        : currentQuestion.mentiOptions.length + 1
    const option = { option: "Opción " + numberOption }

    isLoading(true)
    createOption(form.id, token, currentQuestionId, option)
      .then((resp) => {
        fetchAnswerQuestion()
      })
      .catch((err) => console.log(err))
    isLoading(false)
  }

  const deleteSlide = (questionId) => {
    isLoading(true)
    if (form) {
      deleteQuestionById(form.id, questionId, token)
        .then((resp) => {
          fetchQuestionsFormByFormId()
        })
        .catch((err) => console.log(err))
    }
    isLoading(false)
  }

  const updateCurrentQuestion = (questionId) => {
    isLoading(true)
    updateNewCurrentQuestion(questionId, form.id, token)
      .then((resp) => {
        const form = parsePayload(resp)

        setForm(form)
        const question = form.questions.find(
          (question) => question.id === questionId,
        )

        setCurrentQuestion(question)
      })
      .catch((err) => console.log(err))
    isLoading(false)
  }

  const handleCreateNewSlide = (question, slideId, onClose) => {
    if (form) {
      isLoading(true)
      createQuestion(form.id, token, slideId, question)
        .then((resp) => {
          const newQuestion = parsePayload(resp)

          updateCurrentQuestion(newQuestion.id)
          onClose()
          fetchQuestionsFormByFormId()
        })
        .catch((err) => console.log(err))
      isLoading(false)
    }
  }

  /*const handleChangeOptionName = (ev, name, id) => {
    ev.preventDefault()
    const newCurrent = currentQuestion.mentiOptions.forEach((option) => {
      if (option.id == id) {
        option.name = name
      }
    })
  }*/

  const saveQuestion = (ev, newQuestionName) => {
    ev.preventDefault()
    isLoading(true)

    const request = {
      question: newQuestionName,
    }

    updateQuestionName(form.id, token, currentQuestion.id, request)
      .then((resp) => {
        const question = parsePayload(resp)

        setCurrentQuestion(question)
      })
      .catch((err) => console.log(err))
    isLoading(false)
  }

  const deleteOption = (optionId) => {
    isLoading(true)
    deleteOptionById(form.id, optionId, token)
      .then((resp) => {
        fetchAnswerQuestion()
      })
      .catch((err) => console.log(err))
    isLoading(false)
  }

  const saveNewOptionName = (ev, id, name) => {
    const request = {
      option: name,
    }

    ev.preventDefault()
    updateOptionName(form.id, token, id, request)
      .then((resp) => {
        fetchAnswerQuestion()
      })
      .catch((err) => console.log(err))
  }

  return (
    <Flex flexDir="column" w="100%">
      <Navbar />
      <BottomNavbar slides={slides} newSlide={handleCreateNewSlide} />
      <Flex flexDir="row" paddingTop={5} h={"80vh"}>
        <LeftBar
          questions={questions}
          deleteSlide={deleteSlide}
          updateCurrentQuestion={updateCurrentQuestion}
        />
        <MainContent
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
        {form ? (
          <RightBar
            slides={slides}
            currentQuestion={currentQuestion}
            addNewOption={addNewOption}
            setCurrentQuestion={setCurrentQuestion}
            //handleChangeOptionName={handleChangeOptionName}
            saveQuestion={saveQuestion}
            deleteOption={deleteOption}
            saveNewOptionName={saveNewOptionName}
            codeShare={form.codeShare}
            token={token}
          />
        ) : null}
      </Flex>
    </Flex>
  )
}

export default EditPresentation
