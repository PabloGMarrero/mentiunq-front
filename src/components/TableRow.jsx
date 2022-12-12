import {
  Tr,
  Td,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Flex,
  Text,
  Icon,
  useToast,
} from "@chakra-ui/react"
import { Link as ReachLink } from "react-router-dom"
import { useState } from "react"
import ModalWindow from "../components/ModalWindow"
import QRCode from "react-qr-code"
import {
  deleteFormById,
  renameFormById,
  duplicateForm,
} from "../services/form-service"
import { FiCopy } from "react-icons/fi"

const TableRow = (props) => {
  const [token] = useState(localStorage.getItem("accessToken"))

  const [showShare, setShowShare] = useState(false)
  const handleCloseShowShare = () => setShowShare(false)
  const handleOpenShowShare = () => setShowShare(true)

  const [showRename, setshowRename] = useState(false)
  const handleCloseShowRename = () => setshowRename(false)
  const handleOpenShowRename = () => setshowRename(true)

  const [showDelete, setShowDelete] = useState(false)
  const handleCloseShowDelete = () => setShowDelete(false)
  const handleOpenShowDelete = () => setShowDelete(true)

  const [showDuplicate, setShowDuplicate] = useState(false)
  const handleDuplicateCloseFormShow = () => setShowDuplicate(false)
  const handleDuplicateOpenFormShow = () => setShowDuplicate(true)

  const handleEditFormName = (name) => {
    renameFormById(props.form.id, token, name)
      .then((resp) => {
        handleCloseShowRename()
        props.fetch()
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteForm = () => {
    deleteFormById(props.form.id, token)
      .then((resp) => {
        handleCloseShowDelete()
        props.fetch()
      })
      .catch((err) => console.log(err))
  }

  const handleDuplicateForm = () => {
    duplicateForm(props.form.id, token)
      .then((resp) => {
        handleDuplicateCloseFormShow()
        props.fetch()
      })
      .catch((err) => console.log(err))
  }

  const handleCopy = (handleToast) => {
    navigator.clipboard.writeText(generateLink())
    handleToast()
  }

  const generateLink = () => {
    return (
      window.location.href.slice(0, window.location.href.lastIndexOf("/")) +
      "/" +
      props.form.codeShare
    )
  }

  const renderShare = () => {
    const toast = useToast()

    const handleToast = () => {
      return toast({
        title: "Copied.",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    }

    return (
      <>
        <Flex bg="white" justifyContent="left" flexDir={"column"} gap={"10px"}>
          <Flex flexDir={"column"}>
            <Flex gap={"5px"}>
              <Text as="b">Copiar link de votación:</Text>
              <Icon as={FiCopy} onClick={(ev) => handleCopy(handleToast)} />
            </Flex>
            <Flex gap={"5px"}>{generateLink()}</Flex>
          </Flex>
          <Flex gap={"5px"}>
            <Text as="b">Código QR:</Text>
          </Flex>
          <QRCode value={generateLink()} />
        </Flex>
      </>
    )
  }

  return (
    <Tr>
      <Td>
        <Link
          as={ReachLink}
          to={"/app/presentation/" + props.form.code + "/edit"}
        >
          {props.form.name}
        </Link>
      </Td>
      <Td>{props.form.codeShare}</Td>
      <Td>{new Date(props.form.updateDate).toLocaleString("es-AR")}</Td>
      <Td>{new Date(props.form.creationDate).toLocaleString("es-AR")}</Td>
      <Td>
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" variant="outline">
            ...
          </MenuButton>
          <MenuList>
            <MenuItem
              as={ReachLink}
              to={"/app/presentation/" + props.form.code + "/"}
            >
              Presentar
            </MenuItem>
            <MenuItem
              as={ReachLink}
              to={"/app/results/" + props.form.code + "/"}
            >
              Ver resultados
            </MenuItem>
            <MenuItem onClick={handleOpenShowShare}>Compartir</MenuItem>
            <ModalWindow
              show={showShare}
              onClose={handleCloseShowShare}
              header={"Compartir"}
              message={renderShare()}
            ></ModalWindow>
            <MenuItem onClick={handleDuplicateOpenFormShow}>
              Duplicar presentación
            </MenuItem>
            <ModalWindow
              show={showDuplicate}
              onClose={handleDuplicateCloseFormShow}
              header={"Duplicar"}
              message={"¿Desea duplicar el formulario?"}
              renderFormat={"question"}
              acceptFunc={handleDuplicateForm}
            ></ModalWindow>
            <MenuDivider />
            <MenuItem onClick={handleOpenShowRename}>Renombrar</MenuItem>
            <ModalWindow
              show={showRename}
              onClose={handleCloseShowRename}
              header={"Renombrar"}
              message={"Ingrese el nuevo nombre"}
              renderFormat={"input"}
              acceptFunc={handleEditFormName}
            ></ModalWindow>
            <MenuItem color="red.500" onClick={handleOpenShowDelete}>
              Borrar
            </MenuItem>
            <ModalWindow
              show={showDelete}
              onClose={handleCloseShowDelete}
              header={"Borrar"}
              message={"¿Desea borrar el formulario?"}
              renderFormat={"question"}
              acceptFunc={handleDeleteForm}
            ></ModalWindow>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  )
}

export default TableRow
