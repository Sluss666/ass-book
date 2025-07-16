import { Outlet } from "react-router-dom"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { Link } from "react-router-dom"
import { HiHome } from "react-icons/hi2"
import { HiMiniUsers } from "react-icons/hi2"
const Layout = ()=>{
    const handleSearch = (e:React.FormEvent)=>{
        e.preventDefault()
    }
    return(
        <div className="w-screen h-screen m-0">
            <nav className="fixed w-screen min-h-4/6 bg-black p-4">
                <form onSubmit={(e)=>handleSearch(e)} className="-mt-1">
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
                <ul className="w-1/4 md:w-2/4 -right-48 md:-right-[25%] h-full relative  
                    flex gap-4 md:gap-3 bottom-8 -mb-10 justify-end md:justify-center text-white">
                    <li>
                        <Link to={'/friends'}>
                            <HiMiniUsers className="hover:text-slate-200" size={40}/>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/index'}>
                            <HiHome className="hover:text-slate-200" size={40}/>
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export 