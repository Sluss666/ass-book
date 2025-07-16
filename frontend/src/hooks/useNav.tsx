import { Link } from "react-router-dom"

const useNav = (href = '/', hrefText='Default', submitText='Default')=>{
    const Nav = ()=>(
    <>
        <div className="md:w-1/2 text-center grid mx-auto mb-3">
            <Link  to={href} className="font-bold md:font-normal underline hover:no-underline">
                {hrefText}
            </Link>
        </div>
        <div className="grid justify-center">
            <button type="submit" className="min-w-28 rounded-md text-center bg-black text-white font-bold p-2">
                {submitText}
            </button>
        </div>
    </>
    )
    return Nav
}

export default useNav