import { Flex, Text } from "@chakra-ui/react"
import { useEffect } from "react"

const Paragraph = ({ currentQuestion }) => {
  return (
    <Flex width={600} height={600}>
      {currentQuestion && currentQuestion.mentiOptions.length ? (
        <Flex w={"100%"}>
          <Text w={"100%"}>{currentQuestion.mentiOptions[0].name}</Text>
        </Flex>
      ) : null}
    </Flex>
  )
}

export default Paragraph
