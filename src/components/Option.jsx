import { useState } from "react"
import { Input } from '@chakra-ui/react'

const Option = ({question}) =>{

    const [name, setName] = useState(question.name);

    const handleChangeOption = (ev) => {
        ev.preventDefault()
        setName(ev.target.value)
    }

    return (
        <Input type='text' onChange={ev=>handleChangeOption(ev)} placeholder={name} value={name} />
    )
}

export default Option;