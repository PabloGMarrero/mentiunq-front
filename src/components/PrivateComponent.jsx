import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth-context'

const PrivateComponent = ({ Component }) => {
  const auth = useAuth()

  return auth.isLogged() ? <Component /> : <Navigate to="/" />
}

export default PrivateComponent
