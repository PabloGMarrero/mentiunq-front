import { Flex, Text, Square, RadioGroup } from "@chakra-ui/react"
import QuestionOption from "../components/QuestionOption"
import WordCloud from "../components/WordCloud"
import MultipleChoice from "../components/MultipleChoice"
import Ranking from "../components/Ranking"
import Paragraph from "../components/Paragraph"

const PptComponent = ({ currentQuestion }) => {
  const RenderChart = ({ slideType }) => {
    switch (slideType) {
      case "Multiple Choice2":
        return (
          <Flex justifyContent="center" flexDir="column" gap="10px">
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
        )
      case "Word Cloud":
        return <WordCloud currentQuestion={currentQuestion} />
      case "Multiple Choice":
        return <MultipleChoice currentQuestion={currentQuestion} />
      case "Ranking":
        return <Ranking currentQuestion={currentQuestion} />
      case "Paragraph":
        return <Paragraph currentQuestion={currentQuestion} />
      default:
        return null
    }
  }

  return currentQuestion ? (
    <Flex flexDir={"column"}>
      <Flex
        justifyContent="center"
        color="gray.700"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="4xl"
        h={"40%"}
      >
        <Text>{currentQuestion.question}</Text>
      </Flex>
      <Flex justifyContent="center" h={"60%"}>
        <RenderChart slideType={currentQuestion.slide.nombre} />
      </Flex>
    </Flex>
  ) : null
}

export default PptComponent
