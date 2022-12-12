import { Flex, Text } from "@chakra-ui/react"
import RenderChart from "../components/RenderChart"

const PptComponent = ({ currentQuestion }) => {
  return currentQuestion ? (
    <Flex flexDir={"column"} w={"100%"}>
      <Flex justifyContent="center" h={"80%"}>
        <RenderChart question={currentQuestion} />
      </Flex>
    </Flex>
  ) : null
}

export default PptComponent
