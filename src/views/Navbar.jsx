import {
  Box,
  Flex,
  Text,
  Divider,
  Icon,
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react"
import { BsCheck } from "react-icons/bs"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import { HiOutlineArrowLeft } from "react-icons/hi"

import { GoogleLogin } from "react-google-login"
import { config } from "../../config"
import { useEffect } from "react"
import { gapi } from "gapi-script"
import { useAuth } from "../contexts/auth-context"
import { useNavigate } from "react-router-dom"
import CustomButton from "../components/CustomButton"

const handleFailedLogin = () => {
  ;<Alert status="error">
    <AlertTitle>Falló el login de usuario</AlertTitle>
    <AlertDescription>
      Es posible que no estés en la lista blanca
    </AlertDescription>
  </Alert>
}

const createRequest = (response) => {
  const request = {
    email: response.profileObj.email,
    id_token: response.xc.id_token,
  }

  return request
}

const handleSuccessfullLogin = (response, auth, navigate) => {
  const request = createRequest(response)

  auth.login(request, navigate)
}

const UserMenu = ({ navigate }) => {
  const auth = useAuth()

  return (
    <div>
      <Button onClick={(e) => auth.logout(e, navigate)}>Logout</Button>
    </div>
  )
}

const TopNavbar = () => {
  const auth = useAuth()
  const authed = auth.isLogged()
  const navigate = useNavigate()

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: config.GOOGLE_OAUTH_CLIENTID,
        plugin_name: "ProductManager credential",
        scope: "email",
      })
    })
  }, [authed])

  return (
    <Flex flexDir="row" justifyContent="space-between">
      <Box marginLeft={10} marginTop={"-10px"}>
        <Text fontSize="18px" fontWeight={600}>
          MentiUNQ
        </Text>
      </Box>
      <Flex flexDir="row" gap={2} alignItems="center">
        <Flex alignItems="center">
          <Icon as={BsCheck} color={"#48BB78"} w={6} h={6} />
          <Text fontSize="12px" fontWeight={300}>
            Saved
          </Text>
        </Flex>
        <Divider orientation="vertical" />
        <Icon as={AiOutlineQuestionCircle} w={6} h={6} />
        <Divider orientation="vertical" />

        {authed ? (
          <>
            <CustomButton
              colorScheme="blue"
              variant="solid"
              icon={HiOutlineArrowLeft}
              text="Presentaciones"
              onClick={() => navigate("/app")}
            />
            <UserMenu navigate={navigate} />
          </>
        ) : (
          <GoogleLogin
            clientId={config.GOOGLE_OAUTH_CLIENTID}
            buttonText="Login"
            onSuccess={(request) =>
              handleSuccessfullLogin(request, auth, navigate)
            }
            onFailure={handleFailedLogin}
          />
        )}
      </Flex>
    </Flex>
  )
}

const Navbar = () => {
  return (
    <Flex flexDir={"column"} bg="white">
      <TopNavbar />
    </Flex>
  )
}

export default Navbar
