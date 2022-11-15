import { Flex, RadioGroup, Box, Button } from "@chakra-ui/react"
import { getVotingQuestion, vote } from "../services/answer-service"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { parsePayload } from "../utils/parse-payload"
import QuestionOption from "../components/QuestionOption"

const Voting = () => {
  const [question, setQuestion] = useState({})
  const codeShare = useParams().hash
  const [hasVoted, setVoted] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [value, setValue] = useState("1")

  useEffect(() => {
    getVotingQuestion(codeShare)
      .then((resp) => {
        setQuestion(parsePayload(resp))
      })
      .catch((err) => {
        console.log(err)
        setNotFound(true)
      })
  }, [])

  const handleVote = () => {
    vote(codeShare, question.id, value)
      .then((resp) => setVoted(true))
      .catch((err) => console.log(err))
  }

  return !notFound ? (
    !hasVoted ? (
      <Box width={"100%"}>
        <Flex flexDir="column" gap="20px">
          <Flex
            w="100%"
            justifyContent="center"
            color="gray.700"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="4xl"
          >
            MentiUNQ
          </Flex>
          <Flex
            w="100%"
            justifyContent="center"
            fontWeight="semibold"
            fontSize="xl"
          >
            <Flex justifyContent="left" gap="15px" width={"40%"}>
              {question.question}
            </Flex>
          </Flex>
          <Flex w="100%" justifyContent="center">
            <Flex flexDir="column" gap="15px" width={"40%"}>
              {question.mentiOptions
                ? question.mentiOptions.map((option) => (
                    <RadioGroup
                      key={option.id}
                      value={value}
                      onChange={setValue}
                    >
                      <QuestionOption key={option.id} option={option} />
                    </RadioGroup>
                  ))
                : null}
            </Flex>
          </Flex>
          <Flex w="100%" justifyContent="center">
            <Button
              colorScheme="blue"
              variant="solid"
              width={"40%"}
              onClick={() => handleVote()}
            >
              Votar
            </Button>
          </Flex>
        </Flex>
      </Box>
    ) : (
      <Box width={"100%"}>
        <Flex
          w="100%"
          justifyContent="center"
          color="gray.700"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="4xl"
        >
          MentiUNQ
        </Flex>
        <Flex
          w="100%"
          justifyContent="center"
          fontWeight="semibold"
          fontSize="xl"
        >
          <Flex gap="15px">Gracias por tu participación!</Flex>
        </Flex>
      </Box>
    )
  ) : (
    <Box width={"100%"}>
      <Flex
        w="100%"
        justifyContent="center"
        color="gray.700"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="4xl"
      >
        MentiUNQ
      </Flex>
      <Flex
        w="100%"
        justifyContent="center"
        fontWeight="semibold"
        fontSize="xl"
      >
        <Flex gap="15px">Formulario no encontrado!</Flex>
      </Flex>
    </Box>
  )
}

export default Voting
