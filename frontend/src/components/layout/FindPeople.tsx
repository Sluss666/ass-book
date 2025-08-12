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
        <div className="w-fit fixed mt-24 h-full bg-black  border-r border-slate-600 overflow-y-auto" >
            <p className="text-center mt-5 mb-2  text-white  ">Find&nbsp;People</p>
            <ul className="grid items-center">
                <People user={user} users={users}/>
            </ul>
        </div>
    )
}

export default FindPeople