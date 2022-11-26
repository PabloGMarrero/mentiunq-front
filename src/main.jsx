import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from "./utils/theme"; 
import Fonts from "./utils/fonts";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts />
        <App/>
    </ChakraProvider>
  </React.StrictMode>
)
