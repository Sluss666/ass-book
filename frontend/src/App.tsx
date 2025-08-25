import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LayoutWrapper from './layouts/LayoutWrapper'
import Login from './pages/Login'
import Register from './pages/Register'
import PublicRoutes from './routes/PublicRoutes'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Layout from './layouts/social_web/Layout'
import { UserProvider } from './context/UserProvider'
import { UsersProvider } from './context/users/UsersProvider'
import { FriendsProvider } from './context/friends/FriendsProvider'
import { ResponseProvider } from './context/res/ResponseProvider'
import { NotificationsProvider } from './context/notifications/NotificationsProvider'
import { SocketProvider } from './context/sockets/SocketProvider'
import { ChatsProvider } from './context/chats/ChatsProvider'

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <UsersProvider>
          <FriendsProvider>
            <ResponseProvider>
              <NotificationsProvider>
                <SocketProvider>
                  <ChatsProvider>
                    <Routes>
                      <Route path='/' element={<PublicRoutes><LayoutWrapper /></PublicRoutes>}>
                        <Route index element={<Login/>}/>
                        <Route path='sign-up' element={<Register />}/>
                      </Route>
                      <Route path='/index' element={<ProtectedRoutes rols={['user']}><Layout /></ProtectedRoutes>}>
                        <Route index element={<></>}/>
                        <Route path='people' element={<></>}/>
                        <Route path='self' element={<></>}/>
                      </Route>
                    </Routes>
                  </ChatsProvider>
                </SocketProvider>
              </NotificationsProvider>
            </ResponseProvider> 
          </FriendsProvider>
        </UsersProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
