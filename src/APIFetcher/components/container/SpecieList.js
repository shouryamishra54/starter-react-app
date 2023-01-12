//import "../styles/bootstrap.css";
//import defclass from "../styles/default.module.css";
//import pretty from "../styles/prettify.module.css";
import ErrorBoundary from "../ErrorBoundary";
import {useState} from "react"

function SpeciesList(){
    const [species, setSpecies]=useState()
    const [button, setButton]=useState(false)
    const [isLoading, setIsLoading]=useState(false)
    async function speciesHandler(){
        //setButton((curState)=>[...curState, !curState[2]])
        //setIsLoading((curState)=>[...curState, !curState[2]])
        setButton((curState)=>!curState)
        setIsLoading(true)
        const response= await fetch("https://swapi.dev/api/species/")
        const data=await response.json()
        const transformedSpecies=data.results.map((item)=>{
            return ({name:item.name,
            classification:item.classification,
            designation:item.designation,
            averageheight:item.average_height,
            skincolors:item.skin_colors,
            haircolors:item.hair_colors,
            eyecolors:item.eye_colors,
            averagelifespan:item.average_lifespan,
            homeworld:item.homeworld,
            language:item.language
            })
        })
        console.log(transformedSpecies)
        setSpecies(transformedSpecies)
        //setIsLoading((curState)=>[...curState, !curState[2]])
        setIsLoading(false)
    }
    return (<div className="dropdown">
        <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" 
        onClick={speciesHandler}>Species<span className="caret"></span></button>
        <section className="container">
            {button && !isLoading && species.length>0 && <ErrorBoundary>
                <ul>{species.map((item)=>{return (<li>{item.name}</li>)})}</ul>
                </ErrorBoundary>}
            {button && !isLoading && species.length === 0 && <p>No Species Found</p>}
            {button && isLoading && <p>Loading...</p>}
        </section>
    </div>)
}
export default SpeciesList;