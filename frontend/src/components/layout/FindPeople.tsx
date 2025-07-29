import { useUsers } from "../../context/users/useUsers"
import { useUser } from '../../context/useUser';
import Buttons from "./FindPeople/Buttons";

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
            <p className="text-center mt-5 mb-2  text-white  ">Find People</p>
            <ul className="">
                {users.filter(u => String(u._id) !== String(user._id) && u.user !== user.user).map(u =>
                (
                    <li key={u._id} className="border-y border-slate-600 flex justify-evenly p-3 w-full h-24 bg-white/90">
                        <div className="flex items-center ">
                            <img className="md:w-12 h-12 rounded-full shadow-md"
                                alt="profile-picture"
                                src={
                                    user?.pic && user.pic !== ""
                                        ? user?.pic
                                        : "/assets/profile_pictures/default-profile-pic.jpg"
                                } />
                            <section className="mx-2 min-w-24 max-w-32">
                                <strong className="cursor-pointer">
                                    {u.user}
                                </strong>
                                {(u.name !== '' && u.surnames !== '') && (
                                    <p>{u.name} {u.surnames}</p>
                                )}
                            </section>
                        </div>
                        <Buttons />
                    </li>
                )
                )}
            </ul>
        </div>
    )
}

export default FindPeople