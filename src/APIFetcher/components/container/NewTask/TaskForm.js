import { useRef } from "react";

function TaskForm(data){
    const taskInputRef=useRef()
    function submitHandler(event){
        event.preventDefault();
        const taskName=taskInputRef.current.value
        data.onEnterTask(taskName)
        taskInputRef.current.value=''
    }
    return (<form className="form form-control" onSubmit={submitHandler}>
        <input type="text" ref={taskInputRef}></input>
        <button type="submit">{data.loading? "Sending..." : "Add task"}</button>
    </form>)
}
export default TaskForm;