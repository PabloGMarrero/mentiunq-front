import { Button, Icon, Text } from "@chakra-ui/react"

const CustomButton = ({
  bg,
  colorScheme,
  icon,
  text,
  wB,
  hB,
  onClick,
  isDisabled,
}) => {
  return (
    <Button
      bg={bg}
      colorScheme={colorScheme}
      onClick={onClick}
      isDisabled={isDisabled}
    >
      <Icon as={icon} w={wB} h={hB} />
      <Text m={1} fontFamily={"MentiText-Regular"}>
        {text}
      </Text>
    </Button>
  )
}

export default CustomButton
