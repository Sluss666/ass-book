import { Outlet, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { HiHome, HiMiniUsers } from "react-icons/hi2"
import SearchBar from "../../components/layout/SearchBar"
import Card from "../../components/layout/Card"
import FindPeople from "../../components/layout/FindPeople"
import ChatSideBar from "../../components/layout/ChatSideBar"


const Layout = () => {    
  const location = useLocation()
  
  return (
    <div className="w-screen h-screen m-0">
      <nav className="fixed w-screen min-h-[105px] bg-black p-4 z-50 border-b border-slate-200">
        <SearchBar />
        
        <ul className="w-1/4 md:w-2/4 -right-48 md:-right-[0%] relative flex gap-4 bottom-8 -mb-10 justify-end text-white">
          <li>
            <Link id="people-link" to={"people"}>
              <HiMiniUsers
                className="hover:text-slate-200"
                size={location.pathname.split("/")[2] == "people" ? 46 : 40}
              />
              {location.pathname.split("/")[2] == "people" && (
                <label className="text-sm mx-auto" htmlFor="people-link">
                  People
                </label>
              )}
            </Link>
          </li>
          <li>
            <Link id="index-link" to={"/index"} className="grid">
              <HiHome
                className="hover:text-slate-200"
                size={
                  location.pathname.split("/")[1] == "index" &&
                  !location.pathname.split("/")[2]
                    ? 50
                    : 40
                }
              />
              {location.pathname.split("/")[1] == "index" &&
                !location.pathname.split("/")[2] && (
                  <label className="text-sm mx-auto" htmlFor="index-link">
                    Home
                  </label>
                )}
            </Link>
          </li>
        </ul>
        <Card/>
      </nav>
      <FindPeople/>
      <Outlet />

      {/* Sidebar de chat */}
      <ChatSideBar/>
    </div>
  )
}

export default Layout
