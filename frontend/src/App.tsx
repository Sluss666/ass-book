import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LayoutWrapper from './layouts/LayoutWrapper'
import Login from './pages/Login'
import Register from './pages/Register'
import PublicRoutes from './routes/PublicRoutes'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Layout from './layouts/social_web/Layout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoutes><LayoutWrapper /></PublicRoutes>}>
          <Route index element={<Login/>}/>
          <Route path='sign-up' element={<Register />}/>
        </Route>

        <Route path='/index' element={<ProtectedRoutes rols={['user']}><Layout /></ProtectedRoutes>}>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
