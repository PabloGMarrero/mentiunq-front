import React from "react"
import { useState, useEffect } from "react"

import { Flex, Text } from "@chakra-ui/react"

const OpenEnded = ({ question }) => {
  const [heading, setHeading] = useState("")

  useEffect(() => {
    if (question) {
      setHeading(question.question)
    }
  }, [question])

  return (
    <Flex flexDir="row">
      <Flex flexDir="row" justifyContent={"right"} paddingLeft={"10px"}>
        <Text fontSize="5xl" as="b">
          {heading}
        </Text>
      </Flex>
    </Flex>
  )
}

export default OpenEnded
