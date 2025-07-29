import { useState } from 'react'

const ChatSideBar = () => {
    
const friends = [
  { id: 1, name: "Ana Ruiz", online: true },
  { id: 2, name: "Carlos Pérez", online: false },
  { id: 3, name: "Lucía Gómez", online: true },
]
const [activeChat, setActiveChat] = useState<number | null>(null)
  return (
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
  )
}

export default ChatSideBar