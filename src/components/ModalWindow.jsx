import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Button,
  Input,
  Flex,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"

const ModalWindow = (props) => {
  const [input, setInput] = useState("")
  const [renderFormat] = useState(props.renderFormat)

  useEffect(() => {
    setInput("")
  }, [])

  const renderOption = () => {
    switch (renderFormat) {
      case "question":
        return (
          <>
            <Flex flexDir="row" justifyContent={"right"} margin={"20px"}>
              <Button
                colorScheme="blue"
                variant="solid"
                onClick={() => props.acceptFunc()}
              >
                Si
              </Button>
              <Flex flexDir="row" justifyContent={"right"} paddingLeft={"10px"}>
                <Button
                  colorScheme="blue"
                  variant="solid"
                  onClick={props.onClose}
                >
                  Cerrar
                </Button>
              </Flex>
            </Flex>
          </>
        )
      case "input":
        return (
          <>
            <Flex flexDir="column" spacing={"15px"}>
              <Input
                marginLeft={"20px"}
                value={input}
                onInput={(e) => setInput(e.target.value)}
                width={"80%"}
              />
              <Flex flexDir="row" justifyContent={"right"} margin={"20px"}>
                <Button
                  colorScheme="blue"
                  variant="solid"
                  onClick={() => props.acceptFunc(input)}
                >
                  Cambiar
                </Button>
                <Flex
                  flexDir="row"
                  justifyContent={"right"}
                  paddingLeft={"10px"}
                >
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    onClick={props.onClose}
                  >
                    Cerrar
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </>
        )
      default:
        return (
          <>
            <Flex flexDir="row" justifyContent={"right"} margin={"20px"}>
              <Button
                colorScheme="blue"
                variant="solid"
                onClick={props.onClose}
              >
                Cerrar
              </Button>
            </Flex>
          </>
        )
    }
  }

  return (
    <>
      <Modal isOpen={props.show} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.header}</ModalHeader>
          <ModalCloseButton />
          <Flex flexDir="column" justifyContent="center">
            <ModalBody>{props.message}</ModalBody>
            {renderOption()}
          </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalWindow
