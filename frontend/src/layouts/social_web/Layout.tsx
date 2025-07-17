import { Outlet, useLocation } from "react-router-dom"
import { HiBell, HiChatBubbleLeftRight, HiMagnifyingGlass } from "react-icons/hi2"
import { Link } from "react-router-dom"
import { HiHome } from "react-icons/hi2"
import { HiMiniUsers } from "react-icons/hi2"
import { useUser } from "../../context/useUser"
const Layout = ()=>{
    const location = useLocation()
    const {user} = useUser()
    const handleSearch = (e:React.FormEvent)=>{
        e.preventDefault()
    }

    const selfPage = ()=>{ 
        return (location.pathname.split('/')[1] == 'index' && location.pathname.split('/')[2] == 'self')
    }
    return(
        <div className="w-screen h-screen m-0">
            <nav className="fixed w-screen min-h-4/6 bg-black p-4">
                <form onSubmit={(e)=>handleSearch(e)} className="flex relative top-3 my-auto items-center">
                    <input type="text" 
                        className="placeholder-shown::text-slate-200 md:w-auto w-40
                        focus:border-b-2 focus:pb-1 focus:duration-[0.1s] focus:-mb-2
                        duration-[0.1s] transition-all transition-200
                        bg-transparent outline-none text-xl text-white" 
                        placeholder="Search for something"
                    />
                    <button type='submit' className="
                        text-white p-2 relative overflow-hidden
                        top-1 transition-all duration-25 transform
                        hover:scale-105 hover:text-slate-400 active:scale-105 active:text-black

                        after:absolute after:-inset-1 after:bg-white
                        after:rounded-sm after:z-[-1] after:transition-transform after:duration-200
                        after:scale-0 active:after:scale-100 after:origin-center
                    ">
                        <HiMagnifyingGlass size={20} className=""/>
                    </button>
                </form>
                <ul className="w-1/4 md:w-2/4 -right-48 md:-right-[25%] relative  
                    flex gap-4 md:gap-3 bottom-8 -mb-10 justify-end md:justify-center text-white">
                    <li>
                        <Link id="people-link" to={'people'}>
                            <HiMiniUsers className="hover:text-slate-200" size={location.pathname.split('/')[2] == 'people' ? 46 : 40}/>
                            {location.pathname.split('/')[2] == 'people' && (
                                <label className="text-sm mx-auto" htmlFor="people-link">People</label>
                            )}
                        </Link>
                    </li>
                    <li>
                        <Link id="index-link" to={'/index'} className="grid">
                            <HiHome className="hover:text-slate-200" size={location.pathname.split('/')[1] == 'index' && !location.pathname.split('/')[2] ? 50 : 40}/>
                            {(location.pathname.split('/')[1] == 'index' && !location.pathname.split('/')[2] ) && (
                                <label className="text-sm mx-auto" htmlFor="index-link">Home</label>
                            )}
                        </Link>
                    </li>
                </ul>
                <div className={`absolute flex top-4 right-6 md:right-28 w-1/4 p-2 align-end rounded-md bg-slate-200`}>
                    <div className="max-w-36 h-fit px-2 me-1">
                        <img className="w-14 rounded-full shadow-md" alt="profile-picture" src={user?.pic && user.pic !== "" ? user?.pic : '/assets/profile_pictures/default-profile-pic.jpg'}/>
                    </div>
                    <div>
                        <Link to={'self'} className="block mt-1"><strong>{user?.user || 'NoUser'}</strong></Link>
                        {!selfPage
                        &&
                        (<span>{user?.name && user?.surnames ? `${user?.name} ${user?.surnames}` : 'NoName'}</span>)
                        }
                    </div>
                    <div className="flex mx-auto items-center gap-2">
                        <HiBell className="cursor-pointer" size={35}/>
                        <HiChatBubbleLeftRight className="cursor-pointer" size={35}/>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout