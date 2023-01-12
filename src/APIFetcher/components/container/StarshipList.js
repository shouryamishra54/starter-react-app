//import "../styles/bootstrap.css";
//import defclass from "../styles/default.module.css";
//import pretty from "../styles/prettify.module.css";
import ErrorBoundary from "../ErrorBoundary";
import {useState} from "react"

function StarshipList(){
    const [starships, setStarships]=useState()
    const [button, setButton]=useState(false)
    const [isLoading, setIsLoading]=useState(false)
    async function starshipHandler(){
        //setButton((curState)=>[...curState, !curState[2]])
        //setIsLoading((curState)=>[...curState, !curState[2]])
        setButton((curState)=>!curState)
        setIsLoading(true)
        const response= await fetch("https://swapi.dev/api/starships/")
        const data=await response.json()
        const transformedStarships=data.results.map((starship)=>{
            return ({name:starship.name,
            model:starship.model,
            manufacturer:starship.manufacturer,
            costincredits:starship.cost_in_credits,
            length:starship.length,
            maxatmospheringspeed:starship.max_atmosphering_speed,
            crew:starship.crew,
            passengers:starship.passengers,
            cargocapacity:starship.cargo_capacity,
            consumables:starship.consumables,
            hyperdriverating:starship.hyperdrive_rating,
            mglt:starship.MGLT,
            starshipclass:starship.starship_class
            })
        })
        console.log(transformedStarships)
        setStarships(transformedStarships)
        //setIsLoading((curState)=>[...curState, !curState[2]])
        setIsLoading(false)
    }
    return (<div className="dropdown">
        <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" 
        onClick={starshipHandler}>Startships<span className="caret"></span></button>
        <section className="container">
            {button && !isLoading && starships.length>0 && <ErrorBoundary>
                <ul>{starships.map((startship)=>{return (<li>{startship.name}</li>)})}</ul>
                </ErrorBoundary>}
            {button && !isLoading && starships.length === 0 && <p>No Starship Found</p>}
            {button && isLoading && <p>Loading...</p>}
        </section>
    </div>)
}
export default StarshipList;