import { Flex, Text, RadioGroup } from "@chakra-ui/react"
import QuestionOption from "../components/QuestionOption"

const PptComponent = ({ currentQuestion }) => {
  return currentQuestion ? (
    <Flex flexDir={"column"}>
      <Flex
        justifyContent="center"
        color="gray.700"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="4xl"
      >
        <Text>{currentQuestion.question}</Text>
      </Flex>

      <Flex justifyContent="center">
        <Flex flexDir="column" gap="15px">
          {currentQuestion.mentiOptions
            ? currentQuestion.mentiOptions.map((option) => (
                <RadioGroup key={option.id} onChange={(e) => console.log(e)}>
                  <QuestionOption
                    key={option.id}
                    option={option}
                    isDisabled={true}
                  />
                </RadioGroup>
              ))
            : null}
        </Flex>
      </Flex>
    </Flex>
  ) : null
}

export default PptComponent
