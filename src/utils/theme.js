import { extendTheme } from "@chakra-ui/react"
import {
  PRIMARY,
  PRIMARY_DARK,
  PRIMARY_LIGTH,
  SECONDARY,
  SECONDARY_DARK,
} from "./colors"

const theme = extendTheme({
  fonts: {
    heading: `'Menti Text', 'Open Sans', sans-serif`,
    body: `'Menti Text', 'Roboto', sans-serif`,
  },
  colors: {
    theme: {
      100: PRIMARY,
      200: PRIMARY_DARK,
      300: PRIMARY_LIGTH,
      400: SECONDARY,
      500: SECONDARY_DARK,
    },
  },
})

export default theme
