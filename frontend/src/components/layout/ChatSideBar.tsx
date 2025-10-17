import { useState } from 'react'
import { useFriends } from '../../context/friends/useFriends'

const ChatSideBar = () => {

  const {friends} = useFriends()
  console.log('Amigos: ',friends)
  const [activeChat, setActiveChat] = useState('')
  const sendMessage = async(e:React.KeyboardEvent<HTMLTextAreaElement>)=>{
    if(e.key != 'Intro') return
    if(!activeChat.length) return 
  }
  return (
    <>
 {/* Chats */}
        {activeChat.length && (
          <div className="mt-4 absolute right-[17em] bottom-[1em] w-1/3 max-w-1/3 pt-2 z-30">
            <div className="bg-white border rounded-lg shadow-md flex flex-col h-72 ">
              <div className="flex justify-between items-center px-3 py-2 border-b bg-slate-800 rounded-t">
                <span className="font-semibold text-white text-sm">
                  { friends.find((f) => f._id === activeChat)?.user
                  }
                </span>
                <button
                  onClick={() => setActiveChat('')}
                  className="text-red-500 text-sm font-semibold"
                >
                  <span className="text-2xl font-bold">&times;</span>
                </button>
              </div>
              <div className={`chat-${friends.find(f=>f._id == activeChat)?._id} flex-1 p-2 text-sm overflow-y-auto select-text space-y-2`}>
                <div className="bg-gray-100 rounded px-2 py-1 max-w-[85%]">
                  Hola, ¿cómo estás?
                </div>
                {/* <div className="bg-blue-200 rounded px-2 py-1 max-w-[85%] self-end ml-auto text-right">
                  Todo bien, ¿y tú?
                </div> */}
              </div>
              <textarea
                onKeyDownCapture={e=>sendMessage(e)}
                placeholder="Escribe un mensaje..."
                className="border-t p-2 text-sm outline-none resize-none"
              />
            </div>
          </div>
        )}
    <section className="fixed right-0 top-[105px] h-[calc(100vh-105px)] w-64 bg-white border-l border-gray-300 shadow-md p-2 overflow-y-auto z-10">
        <h2 className="text-xl font-semibold mb-2">Chats</h2>
        <ul className="space-y-1">
          {friends.map((friend) => (
            <li
              key={friend._id}
              onClick={() => setActiveChat(friend._id)}
              className={`p-2 rounded cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-all duration-150 ${
                activeChat === friend._id ? "bg-blue-100" : ""
              }`}
            >
              <span
                className={`h-3 w-3 rounded-full ${
                  friend.online ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
              <span>
                {friend.user}
              </span>
            </li>
          ))}
        </ul>

         

      </section>
      </>
  )
}

export default ChatSideBar