//import "../styles/bootstrap.css";
//import defclass from "../styles/default.module.css";
//import pretty from "../styles/prettify.module.css";
import ErrorBoundary from "../ErrorBoundary";
import {useState} from "react"

function PlanetList(){
    const [planets, setPlanets]=useState()
    const [button, setButton]=useState(false)
    const [isLoading, setIsLoading]=useState(false)
    async function planetHandler(){
        //setButton((curState)=>[...curState, !curState[2]])
        //setIsLoading((curState)=>[...curState, !curState[2]])
        setButton((curState)=>!curState)
        setIsLoading(true)
        const response= await fetch("https://swapi.dev/api/planets/")
        const data=await response.json()
        const transformedPlanets=data.results.map((planet)=>{
            return ({name:planet.name,
            rotationperiod:planet.rotation_period,
            orbitalperiod:planet.orbital_period,
            diameter:planet.diameter,
            climate:planet.climate,
            gravity:planet.gravity,
            terrain:planet.terrain,
            surfacewater:planet.surface_water,
            population:planet.population
            })
        })
        console.log(transformedPlanets)
        setPlanets(transformedPlanets)
        //setIsLoading((curState)=>[...curState, !curState[2]])
        setIsLoading(false)
    }
    return (<div className="dropdown">
        <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" 
        onClick={planetHandler}>Planets<span className="caret"></span></button>
        <section className="container">
            {button && !isLoading && planets.length>0 && <ErrorBoundary>
                <ul>{planets.map((planet)=>{
                    return (<li>{planet.name}</li>)
                    })}</ul>
                </ErrorBoundary>}
            {button && !isLoading && planets.length === 0 && <p>No Planet Found</p>}
            {button && isLoading && <p>Loading...</p>}
        </section>
    </div>)
}
export default PlanetList;