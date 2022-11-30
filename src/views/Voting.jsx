import {
  Flex,
  RadioGroup,
  Box,
  Button,
  Input,
  Text,
  Heading,
} from "@chakra-ui/react"
import {
  getVotingQuestion,
  vote,
  addResponse,
} from "../services/answer-service"
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
        setNotFound(false)
      })
      .catch((err) => setNotFound(true))
  }, [])

  const handleVote = () => {
    vote(codeShare, question.id, value)
      .then((resp) => setVoted(true))
      .catch((err) => console.log(err))
  }

  const VotingOpen = () => {
    const [name, setName] = useState("")

    const handleAddResponse = (ev) => {
      ev.preventDefault()
      addResponse(codeShare, question.id, name)
        .then((resp) => {
          console.log(parsePayload(resp))
          setVoted(true)
        })
        .catch((err) => console.log(err))
    }

    return (
      <Flex gap="20px" justifyContent={"center"}>
        <Flex flexDir="column" gap="15px" w={"50%"}>
          <Heading as="h3" size="lg">
            {question.question}
          </Heading>
          <Text>Agregá tu respuesta para participar</Text>
          <Input
            id={question.id}
            type="text"
            onChange={(ev) => setName(ev.target.value)}
            placeholder={name}
            value={name}
            name={name}
          />
          <Button
            colorScheme="blue"
            variant="solid"
            width={"40%"}
            onClick={(ev) => handleAddResponse(ev)}
            w="100%"
          >
            Votar
          </Button>
        </Flex>
      </Flex>
    )
  }

  const VotingClose = () => {
    return (
      <Flex flexDir="column" gap="20px">
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
                  <RadioGroup key={option.id} value={value} onChange={setValue}>
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
    )
  }

  const FormDoestNotFound = () => {
    return (
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

  const DisplayPerSlideType = ({ slideType }) => {
    switch (slideType) {
      case "Abierta":
        return <VotingOpen />
      case "Cerrada":
        return <VotingClose />
      default:
        return null
    }
  }

  const AlreadyVoted = () => {
    return (
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
  }

  return !notFound ? (
    !hasVoted ? (
      <Box width={"100%"}>
        <Flex flexDir="column" gap="20px">
          <Heading
            textAlign={"center"}
            w="100%"
            justifyContent="center"
            color="gray.700"
            fontWeight="semibold"
            letterSpacing="wide"
            size="2xl"
          >
            MentiUNQ
          </Heading>
          {question?.slide?.slideType?.name ? (
            <DisplayPerSlideType slideType={question.slide.slideType.name} />
          ) : null}
        </Flex>
      </Box>
    ) : (
      <AlreadyVoted />
    )
  ) : (
    <FormDoestNotFound />
  )
}

export default Voting
