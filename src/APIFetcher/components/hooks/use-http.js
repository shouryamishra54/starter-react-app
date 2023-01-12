import { useCallback, useState } from "react";

function UseHttp(){
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError]=useState();
    const sendRequest=useCallback(async(requestConfig, callback)=>{
        setIsLoading(true)
        setError(null)
        try{
            const response=await fetch(requestConfig.url,{
                method:requestConfig.method? requestConfig.method : "get",
                body: requestConfig.body? JSON.stringify(requestConfig.body) : null,
                headers: requestConfig.headers ? requestConfig.headers : {}
            })
            if(response.status !== 200 && response.status !== 201){
                throw new Error("Request Failed!")
            }
            const data=await response.json();
            console.log(data)
            callback(data)
            setIsLoading(false)
        }catch(err){
            setError(err.message || "Something went wrong!")
        }
    }, [])
    return {isLoading, error, sendRequest}
}
export default UseHttp;