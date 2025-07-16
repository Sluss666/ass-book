import { Outlet } from "react-router-dom"
import type { Route } from "./LayoutWrapper"
interface LayoutProps {
    titles:Route
}
function Layout({titles}:LayoutProps){
    const { title, text } = titles
    return (
        <div className="fixed h-screen w-screen md:flex">
            <div className="w-full md:w-3/4 my-10 md:my-0">
                <section className=" text-center">
                    <h1 className=" bottom-5 md:absolute md:text-black md:top-2 md:left-2 md:text-2xl
                     ms-2 text-3xl text-white font-bold">
                        {title}
                    </h1>
                </section>
                <img  src="/background.webp" className="-z-10 fixed h-screen w-full md:h-full top-0 " alt="background image"/>
            </div>
            <aside className="absolute bg-white h-full w-full md:w-2/6 rounded-lg md:rounded-none 
                            top-20 md:top-0 right-0 grid items-center md:border-2 md:border-l-black py-10 z-10">
                <p className="text-3xl md:text-2xl text-black font-bold text-center mb-10 md:m-20">{text}</p>
                <div className="">
                    <Outlet/>
                </div>
            </aside>
        </div>
    )
}

export default Layout