import { Box, Stack, Radio, Flex } from "@chakra-ui/react"

const QuestionOption = ({ option, isDisabled }) => {
  return (
    <Box borderWidth="2px" borderRadius="lg" overflow="hidden">
      <Flex p="4" justifyContent="left" flexDir={"column"}>
        <Stack>
          <Radio
            isDisabled={isDisabled || false}
            size="lg"
            name="1"
            value={option.id.toString()}
            colorScheme="blue"
          >
            {option.name}
          </Radio>
        </Stack>
      </Flex>
    </Box>
  )
}

export default QuestionOption
