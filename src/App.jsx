import { Flex } from '@chakra-ui/react'
import EditPresentation from './views/EditPresentation'
import Presentation from './views/Presentation'
import Presentations from './views/Presentations'
import Voting from './views/Voting'
import Result from './views/Result'
import Help from './views/Help'
import Home from './views/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProvideAuth } from './contexts/auth-context'
import PrivateComponent from './components/PrivateComponent'

function App() {

  return (
    <ProvideAuth>   
      <Flex margin={4}>
        <BrowserRouter>
          <Routes>
              <Route path="/app/results/:hash" element={< PrivateComponent Component={ Result } />} />
              <Route path="/app/presentation/:hash/edit" element={< PrivateComponent Component={ EditPresentation } />} />
              <Route path="/app/presentation/:hash" element={< PrivateComponent Component={ Presentation} />} />
              <Route path="/app" element={< PrivateComponent Component={Presentations}/>} />
              <Route path="/:hash" element={< Voting/>} />
              <Route path="/help" element={< Help/>} />
              <Route path="/" element={<Home/>} />
              <Route path="*" element={<p>UPS 404</p>} />
          </Routes>
        </BrowserRouter>
      </Flex>
    </ProvideAuth> 
  )
}

export default App;
