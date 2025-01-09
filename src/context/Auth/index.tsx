import { PropsWithChildren ,createContext, useState } from "react";

type AuthContextType = any;

export const AuthContext = createContext<AuthContextType>(null);



export const AuthProvider:React.FC<PropsWithChildren>=({children})=>{

 const [user,setUser]=useState()

 const handleSetUser=(user:any)=>{
  setUser(user)
 }

 return <AuthContext.Provider value={{user,handleSetUser}}>{children}</AuthContext.Provider>
 
}