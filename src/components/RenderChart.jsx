import { Flex, RadioGroup } from '@chakra-ui/react'
import QuestionOption from '../components/QuestionOption';
import WordCloud from './slides/WordCloud';
import MultipleChoice from './slides/MultipleChoice';
import Ranking from './slides/Ranking';
import Heading from './slides/Heading';
import Paragraph from './slides/Paragraph';


const RenderChart = ({ question }) => {
    switch(question.slide.nombre) {
        case 'Multiple Choice2':
            return <Flex justifyContent="center" flexDir='column' gap="10px" >
                {question.mentiOptions ? question.mentiOptions.map(
                    option =>
                        <RadioGroup key={option.id} onChange={e => console.log(e)}>
                            <QuestionOption key={option.id} option={option} isDisabled={true} />
                        </RadioGroup>
                ) : null
                }
            </Flex>
        case 'Word Cloud':
            return <WordCloud question={question}/>
        case 'Multiple Choice':
            return <MultipleChoice question={question}/>
        case 'Ranking':
            return <Ranking question={question}/>
        case 'Heading':
            return <Heading question={question}/>
        case 'Paragraph':
            return <Paragraph question={question}/>
        default:
            return null
    }
}

export default RenderChart;