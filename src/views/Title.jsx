import { Flex, Image, Heading } from "@chakra-ui/react"

const Title = () => {
  return (
    <Flex
      flexDir="row"
      marginLeft={10}
      marginTop={"-10px"}
      justifyContent="center"
      alignItems="center"
    >
      <Image src="./vite.svg"></Image>
      <Heading
        textAlign={"center"}
        justifyContent="center"
        color="gray.700"
        fontWeight="semibold"
        letterSpacing="wide"
        size="2xl"
      >
        MentiUNQ
      </Heading>
    </Flex>
  )
}

export default Title
