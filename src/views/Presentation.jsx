import { Button, Flex, Square } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getFormByCode } from "../services/form-service"
import { parsePayload } from "../utils/parse-payload"
import PptComponent from "../components/PptComponent"
import CustomButton from "../components/CustomButton"
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr"

const Presentation = () => {
  const [token] = useState(localStorage.getItem("accessToken"))
  const code = useParams().hash
  const [questions, setQuestions] = useState([])
  const [question, setCurrentQuestion] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(null)

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
        setQuestions(parsePayload(resp).questions)
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
    setCurrentQuestion(questions[currentIndex])
    //llamar a updatecurrentQuestionId
  }

  const LeftButton = () => {
    return (
      <CustomButton
        text={"prev"}
        icon={GrLinkPrevious}
        colorScheme={"blue"}
        onClick={(ev) => handlePrev(ev)}
      />
    )
  }

  const RightButton = () => {
    return (
      <CustomButton
        text={"next"}
        icon={GrLinkNext}
        colorScheme={"blue"}
        onClick={(ev) => handleNext(ev)}
      />
    )
  }

  return (
    <Flex bg="white" w="100vh" h={"80%"} justifyContent="center" flex={1}>
      {question ? (
        <Flex w="750px">
          {currentIndex > 0 && <LeftButton />}

          <PptComponent key={question.id} currentQuestion={question} />

          {currentIndex < length - 1 && <RightButton />}
        </Flex>
      ) : null}
    </Flex>
  )
}

export default Presentation
