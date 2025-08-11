import { useContext } from "react";
import { FriendsContext, type FSContext } from "./FriendsContext";

export const useFriends = ():FSContext=>{
    const context = useContext(FriendsContext)
    if(!context) throw new Error("useFriends must be used within a FriendsProvider")
    return context
}