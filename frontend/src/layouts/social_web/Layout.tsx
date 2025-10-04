import { Outlet } from "react-router-dom"
import SearchBar from "../../components/layout/SearchBar"
import Card from "../../components/layout/Card"
import FindPeople from "../../components/layout/FindPeople"
import ChatSideBar from "../../components/layout/ChatSideBar"
import Nav from '../../components/layout/Nav'
import { useResponse } from "../../context/res/useResponse"
import Alert from "../../components/layout/Alert"

const Layout = () => {    
  const { response } = useResponse()
  return (
    <div className="w-screen h-screen m-0">
      {(response.error != undefined && response.msg !== '') && (
        <Alert text={response.msg}/>          
      )}
      <nav className="fixed w-screen min-h-[105px] bg-black p-4 z-50 border-b border-slate-200">
        <SearchBar />
        <Nav/>
        <Card/>
      </nav>

      {/* Left Chat Sidebar  */}
      <FindPeople/> 

      {/* Social media content */}
      <Outlet />

      {/* Right Chat Sidebar  */}
      <ChatSideBar/>
    </div>
  )
}

export default Layout
