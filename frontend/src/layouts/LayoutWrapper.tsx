import { useLocation } from "react-router-dom"
import Layout from './Layout'
export type Route = {
        title:string,
        text:string
    }
const LayoutWrapper = () => {
    const location = useLocation()
    
    const routesObj : { [key:string]: Route} = {
        "/": {title:"DamnBook | Login", text:"Enter The DamnBook"},
        "/sign-up": {title:"DamnBook | Register", text:"Register DamnBook"},
    }
    const titles = routesObj[location.pathname] || { title: "DamnBook", text: "" };

    return (
        <Layout titles={titles}/>
    )
}
export default LayoutWrapper