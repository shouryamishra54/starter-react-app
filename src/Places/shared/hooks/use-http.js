import { useCallback, useEffect, useRef, useState } from "react"

function UseHttp(requestFunction){
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError]=useState();
    const [data, setData]=useState();
    const sendRequest=useCallback(async(requestData)=>{
        setIsLoading(true)
        setError(null)
        try{
            setError(null)
            const responseData=await requestFunction(requestData)
            setData(responseData)
            setIsLoading(false)
        }catch(e){
            const errmsg=e.message || "Something went wrong";
            setError(errmsg);
            setIsLoading(false);
        }
    })
    return {isLoading, error, data, sendRequest}
}
export default UseHttp