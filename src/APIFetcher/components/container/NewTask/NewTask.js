import { useState } from "react";
import TaskForm from "./TaskForm";
import UseHttp from "../../hooks/use-http";

//Sending Request through Hooks
function NewTask(props){
    const {isLoading, error, sendRequest:sendTaskRequest}=UseHttp();
    //const [error, setError]=useState();\
    function createTask(taskName, taskData){
        const createdTask={id:taskData.name, taskname:taskName}
        props.onAddTask(createdTask);
    }
    async function enterTaskHandler(taskName){
        sendTaskRequest({
            url:"https://react-http-b2f00-default-rtdb.firebaseio.com/tasks.json",
            method:"post",
            body:{text:taskName},
            headers:{
                "Content-Type":"application/json"
            }
        }, (data)=>{const createdTask={id:data.name, taskname:taskName};props.onAddTask(createdTask);})
        /*
        sendTaskRequest({
            url:"https://react-http-b2f00-default-rtdb.firebaseio.com/tasks.json",
            method:"post",
            body:{text:taskName},
            headers:{
                "Content-Type":"application/json"
            }
        }, createTask.bind(null, taskName))
        */
    }
    return (<container>
        <TaskForm onEnterTask={enterTaskHandler} loading={isLoading}></TaskForm>
        {error && <h3>{error}</h3>}
    </container>)
}
export default NewTask;