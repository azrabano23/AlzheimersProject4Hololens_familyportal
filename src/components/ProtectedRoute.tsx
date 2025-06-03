
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../data/userstore";



const ProtectedRoute = ({children} : {children : ReactNode}) => {
    const user = useUserStore((state) => state.userData?.user);
    const groupId = useUserStore((state) => state.userData?.stored.activeRole)
    const navigator = useNavigate()

    console.log(user, "PROTECTED")
    
    useEffect(() => {
        if (user == undefined || groupId == undefined){
            navigator("/")
        }
    }, [])


  return (
    <>{children}</>
  )
}

export default ProtectedRoute