import React from 'react';
import { useState, useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/react'

const Paragraph = ({question}) => {
    const [heading, setHeading] = useState("");
    const [paragraph, setParagraph] = useState("");

    useEffect(()=>{
        if(question){
            if (question.mentiOptions != undefined) {
                setHeading(question.question);
                setParagraph(question.mentiOptions[0].name)
            }
        }
    }, [question])

    return (
        <Flex margin={"10px"}>
            <Flex flexDir='column' paddingLeft={"10px"}>
                <Text textAlign={"center"} fontSize='5xl' as='b'>{heading}</Text>
                <Text>{paragraph}</Text>
            </Flex>
        </Flex>
    )

}

export default Paragraph;