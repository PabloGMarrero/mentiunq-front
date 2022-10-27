import { useState } from "react"
import { Input, FormLabel } from '@chakra-ui/react'

const Option = ({id, value}) =>{

    const [name, setName] = useState(value);

    const handleChangeOption = (ev) => {
        ev.preventDefault()
        setName(ev.target.value)
    }

    return (
        <>
            <Input id={id} type='text' onChange={ev=>handleChangeOption(ev)} placeholder={name} value={name} />
        </>
    )
}

export default Option;