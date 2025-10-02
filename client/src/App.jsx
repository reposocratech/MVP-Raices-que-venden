import { AuthContextProvider } from './context/AuthContextProvider';
import { AppRoutes } from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
 

  return (
    <AuthContextProvider>
      <AppRoutes/>
    </AuthContextProvider>
  )
}

export default App
