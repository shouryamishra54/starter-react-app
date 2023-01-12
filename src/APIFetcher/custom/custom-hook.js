import { useEffect, useState } from "react";

function CustomHook(header=false){
    const [counter, setCounter]=useState(0);
    useEffect(()=>{
        const interval=setInterval(()=>{
            if(!header){
                setCounter((curstate)=>curstate-1)
            }else{
                setCounter((curstate)=>curstate+1)
            }
        }, 1000)
        return ()=>clearInterval(interval);
    }, [])    
    return counter;
}
export default CustomHook;