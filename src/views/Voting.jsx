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
import Title from "../views/Title"

const Voting = () => {
  const [question, setQuestion] = useState({})
  const codeShare = useParams().hash
  const [hasVoted, setVoted] = useState(false)
  const [alreadyVoted, setAlreadyVoted] = useState(false)
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
    if (localStorage.getItem("alreadyVoted" + question.id)) {
      setAlreadyVoted(true)
    } else {
      vote(codeShare, question.id, value)
        .then((resp) => {
          setVoted(true)
          localStorage.setItem("alreadyVoted" + question.id, true)
        })
        .catch((err) => console.log(err))
    }
  }

  const VotingOpen = () => {
    const [name, setName] = useState("")

    const handleAddResponse = (ev) => {
      ev.preventDefault()
      if (localStorage.getItem("alreadyVoted" + question.id)) {
        setAlreadyVoted(true)
      } else {
        addResponse(codeShare, question.id, name)
          .then((resp) => {
            setVoted(true)
            localStorage.setItem("alreadyVoted" + question.id, true)
          })
          .catch((err) => console.log(err))
      }
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
          {question.mentiOptions && question.mentiOptions.length > 0 ? (
            <Button
              colorScheme="blue"
              variant="solid"
              width={"40%"}
              onClick={() => handleVote()}
            >
              Votar
            </Button>
          ) : null}
        </Flex>
      </Flex>
    )
  }

  const FormDoestNotFound = () => {
    return (
      <Box width={"100%"}>
        <Title />
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

  const NoVoting = () => {
    return (
      <Box width={"100%"}>
        <Flex
          w="100%"
          justifyContent="center"
          fontWeight="semibold"
          fontSize="xl"
        >
          <Text as="h3" size="lg">
            Espere que el/la presentador/a llegue a una diapostiva para votar
          </Text>
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
        return <NoVoting />
    }
  }

  const Voted = () => {
    return (
      <Box width={"100%"}>
        <Title />
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

  const AlreadyVoted = () => {
    return (
      <Box width={"100%"}>
        <Title />
        <Flex
          w="100%"
          justifyContent="center"
          fontWeight="semibold"
          fontSize="xl"
        >
          <Flex gap="15px">Ya participaste en esta votación</Flex>
        </Flex>
      </Box>
    )
  }

  return !notFound ? (
    !alreadyVoted ? (
      !hasVoted ? (
        <Box width={"100%"}>
          <Flex flexDir="column" gap="20px">
            <Title />
            {question?.slide?.slideType?.name ? (
              <DisplayPerSlideType slideType={question.slide.slideType.name} />
            ) : null}
          </Flex>
        </Box>
      ) : (
        <Voted />
      )
    ) : (
      <AlreadyVoted />
    )
  ) : (
    <FormDoestNotFound />
  )
}

export default Voting
