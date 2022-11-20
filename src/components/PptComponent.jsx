import { Flex, Text, Square, RadioGroup } from '@chakra-ui/react'
import QuestionOption from '../components/QuestionOption';
import WordCloud from '../components/WordCloud';
import { Chart } from "react-charts";

const PptComponent = ({ currentQuestion }) => {

    const RenderChart = ({ slideType }) => {
        console.log(slideType)
        switch(slideType) {
            case 'Multiple Choice':
                return <Flex justifyContent="center" flexDir='column' gap="10px" >
                    {currentQuestion.mentiOptions ? currentQuestion.mentiOptions.map(
                        option =>
                            <RadioGroup key={option.id} onChange={e => console.log(e)}>
                                <QuestionOption key={option.id} option={option} isDisabled={true} />
                            </RadioGroup>
                    ) : null
                    }
                </Flex>
            case 'Word Cloud':
                return <WordCloud />
            case 'error':
                return <Error text={text} />
            case 'error':
                return <Error text={text} />
            case 'error':
                return <Error text={text} />
            default:
                return null
        }
    }

    return (
        
        currentQuestion ?
            <Flex flexDir={'column'}>
                <Flex justifyContent="center" color='gray.700' fontWeight='semibold' letterSpacing='wide' fontSize='4xl' h={"40%"}>
                    <Text>{currentQuestion.question}</Text>
                </Flex>
                <Flex h={"60%"} >
                    <RenderChart slideType={currentQuestion.slide.nombre}/>                        
                </Flex>
            </Flex>
            : null
    )
}

export default PptComponent;