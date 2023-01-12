import { useState } from "react";
import TaskForm from "./TaskForm";

function NewTask(props){
    const [isLoading, setIsLoading]=useState(false)
    const [error, setError]=useState();
    async function enterTaskHandler(taskName){
        try{
            setIsLoading(true);
            const response=await fetch("https://react-http-b2f00-default-rtdb.firebaseio.com/tasks.json",
            {
                method:"post",
                body:JSON.stringify({text:taskName}),
                headers:{
                    'Content-Type':"application/json"
                }
            })
            if(response.status !== 200 && response.status !== 201){
                throw new Error("Request Failed!")
            }
            const data=await response.json();
            const createdTask={id:data.name, taskname:taskName}
            props.onAddTask(createdTask)
            setIsLoading(false)
        }catch(err){
            console.log(err)
            setError(err.message || "Something went wrong!")
        }
    }
    return (<container>
        <TaskForm onEnterTask={enterTaskHandler} loading={isLoading}></TaskForm>
        {error && <h3>{error}</h3>}
    </container>)
}
export default NewTask;