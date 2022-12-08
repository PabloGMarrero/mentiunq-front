import React from "react"
import { useState, useEffect } from "react"
import { Flex, Text } from "@chakra-ui/react"

const Paragraph = ({ question }) => {
  const [heading, setHeading] = useState("")
  const [paragraph, setParagraph] = useState("")

  useEffect(() => {
    if (question) {
      setHeading(question.question)
      if (question.mentiOptions[0] != undefined) {
        setParagraph(question.mentiOptions[0].name)
      }
    }
  }, [question])

  return (
    <Flex margin={"50px"}>
      <Flex flexDir="column">
        <Text
          textAlign={"center"}
          fontSize="5xl"
          as="b"
          fontFamily={"MentiText-Regular"}
        >
          {heading}
        </Text>
        <Flex h={"20%"} justifyContent={"center"}>
          <Text
            textAlign={"center"}
            w={"50vh"}
            fontFamily={"MentiText-Regular"}
          >
            {paragraph}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Paragraph
