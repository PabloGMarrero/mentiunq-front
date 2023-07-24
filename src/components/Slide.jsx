import { Flex, Box, Text, Icon, IconButton } from "@chakra-ui/react"
import { MdPlayArrow } from "react-icons/md"
import { BsTrash } from "react-icons/bs"

const Slide = ({
  question,
  deleteSlide,
  updateCurrentQuestion,
  isBinDisabled,
  ended,
}) => {
  return (
    <Flex
      onClick={(ev) => {
        ev.preventDefault()
        updateCurrentQuestion(question.id)
      }}
    >
      <Box>
        <Flex flexDir={"column"} alignItems="center">
          {question.isCurrent ? (
            <Icon as={MdPlayArrow} color={"#319795"} w={6} h={6} />
          ) : null}
          <IconButton
            icon={<BsTrash />}
            color={"#333"}
            w={6}
            h={6}
            onClick={(ev) => deleteSlide(question.id)}
            isDisabled={isBinDisabled || ended}
          />
        </Flex>
      </Box>
      <Flex
        _hover={{ boxShadow: "0 0 11px rgba(33,33,33,.2)" }}
        m={2}
        justifyContent={"center"}
        w="150px"
        borderWidth={question.isCurrent ? "4px" : "1px"}
        rounded="xs"
        h="100px"
      >
        <Box>
          <Text>{question.slide.nombre}</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Slide
