import { Button, Flex, Square } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import {
  getFormByCode,
  updateNewCurrentQuestion,
} from "../services/form-service"
import { parsePayload } from "../utils/parse-payload"
import PptComponent from "../components/PptComponent"
import CustomButton from "../components/CustomButton"
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr"
import Navbar from "./Navbar"

const Presentation = () => {
  const [token] = useState(localStorage.getItem("accessToken"))
  const code = useParams().hash
  const [questions, setQuestions] = useState([])
  const [question, setCurrentQuestion] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(null)
  const [formId, setFormId] = useState(null)

  useEffect(() => {
    if (!question) {
      fetchQuestionsFormByFormId()
      setLength(questions.length)
    }
    handleCurrentQuestion(currentIndex)
  }, [questions, currentIndex])

  const fetchQuestionsFormByFormId = () => {
    getFormByCode(code, token)
      .then((resp) => {
        const form = parsePayload(resp)

        setFormId(form.id)
        setQuestions(form.questions)
        setCurrentQuestion(questions[0])
      })
      .catch((err) => console.log(err))
  }

  const handleNext = (ev) => {
    if (currentIndex < length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = (ev) => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleCurrentQuestion = () => {
    if (!question) {
      return
    }
    const _question = questions[currentIndex]

    setCurrentQuestion(_question)
    updateCurrentQuestion(_question.id)
  }

  const updateCurrentQuestion = (questionId) => {
    updateNewCurrentQuestion(questionId, formId, token)
      .then((resp) => {})
      .catch((err) => console.log(err))
  }

  const LeftButton = () => {
    return (
      <CustomButton
        text={"Anterior"}
        icon={GrLinkPrevious}
        color="grey.200"
        onClick={(ev) => handlePrev(ev)}
      />
    )
  }

  const RightButton = () => {
    return (
      <CustomButton
        text={"Siguiente"}
        icon={GrLinkNext}
        color="grey.200"
        onClick={(ev) => handleNext(ev)}
      />
    )
  }

  return (
    <Flex flexDir="column" flex={1}>
      <Navbar />
      <Flex bg="white" h={"80%"} justifyContent="center">
        {question ? (
          <Flex flexDir="column">
            <Flex w="750px" h="800px" marginTop={5}>
              <PptComponent key={question.id} currentQuestion={question} />
            </Flex>
            <Flex flexDir="row" justifyContent="space-between">
              <Flex>{currentIndex > 0 && <LeftButton />}</Flex>
              <Flex>{currentIndex < length - 1 && <RightButton />}</Flex>
            </Flex>
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  )
}

export default Presentation
