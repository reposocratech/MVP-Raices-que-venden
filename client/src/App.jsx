import './App.css'
import { AuthContextProvider } from './context/AuthContextProvider';
import { AppRoutes } from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 

  return (
    <AuthContextProvider>
      <AppRoutes/>
    </AuthContextProvider>
  )
}

export default App
