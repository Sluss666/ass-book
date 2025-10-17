import { useUsers } from "../../context/users/useUsers"
import { useUser } from '../../context/useUser'
import type { User } from "../../types/User";
import People from "./FindPeople/People"
import { useState } from "react"
function FindPeople() {
  const { user } = useUser();
  const { users, isLoading } = useUsers();
  const [ provisionalUsers, setUsers ] = useState<User[]>(users)

  if (!user || !users) return <p>Error</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="relative">
      <div className="min-w-56 w-fit fixed top-24 bottom-0 h-[calc(100%-6rem)] bg-black  
      border-r border-slate-600 flex flex-col">
        <p className="text-center mt-5 mb-2 text-white">Find&nbsp;People</p>
        <ul className="h-full flex-1 items-center overflow-auto">
          {provisionalUsers.length != 0 ? (
            <People user={user} users={users} setUsers={setUsers} />
          ) : (
            <p className="text-center text-white">No&nbsp;Users&nbsp;Found</p>
          )}
        </ul>
      </div>
    </div>
  );
}
export default FindPeople