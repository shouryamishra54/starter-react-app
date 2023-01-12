//import "../styles/bootstrap.css";
//import defclass from "../styles/default.module.css";
//import pretty from "../styles/prettify.module.css";
import ErrorBoundary from "../ErrorBoundary";
import {useState} from "react"

function VehicleList(){
    const [vehicles, setVehicles]=useState()
    const [button, setButton]=useState(false)
    const [isLoading, setIsLoading]=useState(false)
    async function vehicleHandler(){
        //setButton((curState)=>[...curState, !curState[2]])
        //setIsLoading((curState)=>[...curState, !curState[2]])
        setButton((curState)=>!curState)
        setIsLoading(true)
        const response= await fetch("https://swapi.dev/api/vehicles/")
        const data=await response.json()
        const transformedVehicles=data.results.map((vehicle)=>{
            return ({name:vehicle.name,
                model:vehicle.model,
                manufacturer:vehicle.manufacturer,
                costincredits:vehicle.cost_in_credits,
                length:vehicle.length,
                maxatmospheringspeed:vehicle.max_atmosphering_speed,
                crew:vehicle.crew,
                passengers:vehicle.passengers,
                cargocapacity:vehicle.cargo_capacity,
                consumables:vehicle.consumables,
                vehicleclass:vehicle.vehicle_class
            })
        })
        console.log(transformedVehicles)
        setVehicles(transformedVehicles)
        //setIsLoading((curState)=>[...curState, !curState[2]])
        setIsLoading(false)
    }
    return (<div className="dropdown">
        <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" 
        onClick={vehicleHandler}>Vehicles<span className="caret"></span></button>
        <section className="container">
            {button && !isLoading && vehicles.length>0 && <ErrorBoundary>
                <ul>{vehicles.map((vehicle)=>{return (<li>{vehicle.name}</li>)})}</ul>
                </ErrorBoundary>}
            {button && !isLoading && vehicles.length === 0 && <p>No Planet Found</p>}
            {button && isLoading && <p>Loading...</p>}
        </section>
    </div>)
}
export default VehicleList;