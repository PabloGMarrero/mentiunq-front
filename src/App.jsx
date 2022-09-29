import { Flex } from '@chakra-ui/react'
import EditPresentation from './views/EditPresentation'
import Presentation from './views/Presentation'
import Presentations from './views/Presentations'
import Help from './views/Help'
import Home from './views/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { AuthContext, AuthProvider } from './context/auth-context.js'
//import Navbar from './views/Navbar'

function App() {
  //const user = useContext(AuthContext);
  return (    
      <Flex margin={4}>
        <BrowserRouter>
          <Routes>
              <Route path="/app/presentation/:hash/edit" element={<EditPresentation/>} />
              <Route path="/app/presentation/:hash" element={<Presentation/>} />
              <Route path="/app" element={<Presentations/>} />
              <Route path="/help" element={<Help/>} />
              <Route path="/" element={<Home/>} />
          </Routes>
        </BrowserRouter>
      </Flex>
  )
}

export default App;
