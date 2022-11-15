import { Flex, Text, Heading, VStack, Box, Image } from "@chakra-ui/react"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"
import CustomButton from "../components/CustomButton"
import { HiOutlineArrowLeft } from "react-icons/hi"
import { useAuth } from "../contexts/auth-context"

const Home = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  return (
    <Flex flexDir="column" w="100%">
      <Navbar />
      <VStack marginTop={20} spacing={30} align="center" w="100%" h="60vh">
        <Flex w="35%" flexDir="column">
          <Heading textAlign={"center"}>
            Mantené a tu audiencia atraída y eliminá silencios incomodos
          </Heading>
          <Text textAlign={"center"}>
            Nuestras presentaciones son fáciles de crear, Multiple choice, nubes
            de palabras, rankings significan más participación y menos stress
          </Text>
        </Flex>
        <Flex>
          {auth.isLogged() ? (
            <CustomButton
              colorScheme="blue"
              variant="solid"
              icon={HiOutlineArrowLeft}
              text="Presentaciones"
              onClick={() => navigate("/app")}
            />
          ) : (
            <Text as="b" fontSize="2xl" color={"#196CFF"} textAlign={"center"}>
              Logueate para comenzar a crear tus presentaciones!
            </Text>
          )}
        </Flex>
      </VStack>
      <Box h={8}>
        <Image
          boxSize="600%"
          src="https://static.mentimeter.com/static/images/menti-pattern.png"
          alt="Presentation pattern"
        />
      </Box>
    </Flex>
  )
}

export default Home
