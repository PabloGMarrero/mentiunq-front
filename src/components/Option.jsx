import { useState } from "react"
import { Flex, Input, IconButton } from "@chakra-ui/react"
import { BsTrash } from "react-icons/bs"

const Option = ({ id, value, deleteOption, saveNewOptionName, ended }) => {
  const [name, setName] = useState(value)

  const handleChangeOption = (ev) => {
    ev.preventDefault()
    setName(ev.target.value)
  }

  const handleDeleteOption = (ev, id) => {
    ev.preventDefault()
    deleteOption(id)
  }

  return (
    <Flex alignItems="center" gap={2}>
      <Input
        id={id}
        type="text"
        onChange={(ev) => handleChangeOption(ev)}
        placeholder={name}
        value={name}
        name={name}
        onBlur={(ev) => saveNewOptionName(ev, id, name)}
        fontFamily={"MentiText-Regular"}
        isDisabled={ended}
      />
      <IconButton
        icon={<BsTrash />}
        color={"#333"}
        w={6}
        h={6}
        onClick={(ev) => handleDeleteOption(ev, id)}
        isDisabled={ended}
      />
    </Flex>
  )
}

export default Option
