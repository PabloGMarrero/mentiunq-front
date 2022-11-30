import { Flex, Text } from "@chakra-ui/react"
import RenderChart from "../components/RenderChart"

const PptComponent = ({ currentQuestion }) => {
  return currentQuestion ? (
    <Flex flexDir={"column"}>
      <Flex justifyContent="center" h={"60%"}>
        <RenderChart question={currentQuestion} />
      </Flex>
    </Flex>
  ) : null
}

export default PptComponent
