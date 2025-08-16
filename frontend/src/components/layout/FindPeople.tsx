import { useUsers } from "../../context/users/useUsers"
import { useUser } from '../../context/useUser'
import People from "./FindPeople/People"

function FindPeople() {
    const { user } = useUser()
    const { users, isLoading } = useUsers()
    if (!user || !users) return (
        <div>
            <p>Error</p>
            <button onClick={() => window.location.reload()}>
                Reload Page
            </button>
        </div>
    )
    if (isLoading) return <p>Loading...</p>
    console.log('Users:', users)
    return (
        <div className="relative">
            <div className="min-w-56 w-fit fixed top-24 bottom-0 h-[calc(100%-6rem)] bg-black  
            border-r border-slate-600 flex flex-col" >
                <p className="text-center mt-5 mb-2  text-white  ">Find&nbsp;People</p>
                <ul className="h-full flex-1 items-center overflow-auto">
                    <People user={user} users={users}/>
                </ul>
            </div>
        </div>
    )
}
export default FindPeople