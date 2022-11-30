import WordCloud from "./slides/WordCloud"
import MultipleChoice from "./slides/MultipleChoice"
import Ranking from "./slides/Ranking"
import Heading from "./slides/Heading"
import Paragraph from "./slides/Paragraph"
import OpenEnded from "./slides/OpenEnded"

const RenderChart = ({ question }) => {
  switch (question.slide.nombre) {
    case "Word Cloud":
      return <WordCloud question={question} />
    case "Multiple Choice":
      return <MultipleChoice question={question} />
    case "Ranking":
      return <Ranking question={question} />
    case "Heading":
      return <Heading question={question} />
    case "Paragraph":
      return <Paragraph question={question} />
    case "Open Ended":
      return <OpenEnded question={question} />
    default:
      return null
  }
}

export default RenderChart
