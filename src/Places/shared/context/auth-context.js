import React, { useState } from "react";

export const AuthContext = React.createContext({
    token:"",
    userId:"",
    isLoggedIn:false,
    login:(token, userId, expirationTime)=>{},
    logout:()=>{}
})
export function AuthContextProvider(props){
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [userId, setUserId] = useState(localStorage.getItem("userId"))
    const [tokenExpirationTime, setTokenExpirationTime] = useState(new Date(localStorage.getItem("tokenExpirationTime")))
    const userIsLoggedIn = !!token && (tokenExpirationTime.getTime() > new Date().getTime());
    const loginHandler=(token, userId, expirationTime)=>{
        // if(localStorage.getItem("token") !== token && localStorage.getItem("userId") !== userId){
            setToken(token)
            setUserId(userId)
            console.log(expirationTime)
            console.log(typeof(expirationTime))
            const tokenExpirationTime=expirationTime || new Date(new Date().getTime()+ (1000*60*60))
            setTokenExpirationTime(tokenExpirationTime)
            localStorage.setItem("token", token)
            localStorage.setItem("userId", userId)
            localStorage.setItem("tokenExpirationTime", tokenExpirationTime)
        // }
    }
    const logoutHandler=()=>{
        if(localStorage.getItem("token") && localStorage.getItem("token") === token){
            setToken(null)
            setUserId(null)
            setTokenExpirationTime(null)
            localStorage.clear()
        }
    }
    return (<AuthContext.Provider value={{
        token:token,
        userId:userId,
        tokenExpirationTime:tokenExpirationTime,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }}>
        {props.children}
    </AuthContext.Provider>)
}

// export default AuthContext;