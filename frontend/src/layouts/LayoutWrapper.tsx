import { useLocation } from "react-router-dom"
import Layout from './Layout'
export type Route = {
        title:string,
        text:string
    }
const LayoutWrapper = () => {
    const location = useLocation()
    
    const routesObj : { [key:string]: Route} = {
        "/": {title:"AssBook | Login", text:"Enter AssBook"},
        "/sign-up": {title:"AssBook | Register", text:"Sign up"}
    }
    const titles = routesObj[location.pathname] || { title: "AssBook", text: "" };

    return (
        <Layout titles={titles}/>
    )
}
export default LayoutWrapper