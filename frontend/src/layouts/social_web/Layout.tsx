import { Outlet, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { HiHome, HiMiniUsers } from "react-icons/hi2"
import { useUser } from "../../context/useUser"
import { useState } from "react"
import SearchBar from "../../components/layout/SearchBar"
import Card from "../../components/layout/Card"

const friends = [
  { id: 1, name: "Ana Ruiz", online: true },
  { id: 2, name: "Carlos Pérez", online: false },
  { id: 3, name: "Lucía Gómez", online: true },
]

const Layout = () => {
    
  const location = useLocation()
  const { user, setUser } = useUser()
  const [activeChat, setActiveChat] = useState<number | null>(null)
  
  return (
    <div className="w-screen h-screen m-0">
      <nav className="fixed w-screen min-h-[105px] bg-black p-4 z-50">
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
        <Card user={user} setUser={setUser}/>
      </nav>

      <Outlet />

      {/* Sidebar de chat */}
      <section className="fixed right-0 top-[105px] h-[calc(100vh-105px)] w-64 bg-white border-l border-gray-300 shadow-md p-2 overflow-y-auto z-10">
        <h2 className="text-xl font-semibold mb-2">Chats</h2>
        <ul className="space-y-1">
          {friends.map((friend) => (
            <li
              key={friend.id}
              onClick={() => setActiveChat(friend.id)}
              className={`p-2 rounded cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-all duration-150 ${
                activeChat === friend.id ? "bg-blue-100" : ""
              }`}
            >
              <span
                className={`h-3 w-3 rounded-full ${
                  friend.online ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
              <span>{friend.name}</span>
            </li>
          ))}
        </ul>

          {/* Chats */}
        {activeChat !== null && (
          <div className="mt-4 border-t pt-2 z-30">
            <div className="bg-white border rounded-lg shadow-md flex flex-col h-72 ">
              <div className="flex justify-between items-center px-3 py-2 border-b bg-slate-800 rounded-t">
                <span className="font-semibold text-white text-sm">
                  {friends.find((f) => f.id === activeChat)?.name}
                </span>
                <button
                  onClick={() => setActiveChat(null)}
                  className="text-red-500 text-sm font-semibold"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 p-2 text-sm overflow-y-auto select-text space-y-2">
                <div className="bg-gray-100 rounded px-2 py-1 max-w-[85%]">
                  Hola, ¿cómo estás?
                </div>
                <div className="bg-blue-200 rounded px-2 py-1 max-w-[85%] self-end ml-auto text-right">
                  Todo bien, ¿y tú?
                </div>
              </div>
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="border-t p-2 text-sm outline-none"
              />
            </div>
          </div>
        )}

      </section>
    </div>
  )
}

export default Layout
