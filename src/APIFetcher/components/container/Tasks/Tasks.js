
function Tasks(data){
    console.log(data)
    const content=()=>{
        if(data && data.tasks){
            return (<div>{data.tasks.map((item)=>{return (<li>Task Name: {item.taskname}</li>)})}</div>)
        }else{
            return (<div>Loading...</div>)
        }
    }
    return (<div className="container">{data.tasks.map((item)=>{return (<li>Task Name: {item.taskname}</li>)})}</div>)
}
export default Tasks