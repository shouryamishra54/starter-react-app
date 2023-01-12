//import "../styles/bootstrap.css";
//import defclass from "../styles/default.module.css";
//import pretty from "../styles/prettify.module.css";
import ErrorBoundary from "../ErrorBoundary";
import {useState} from "react"

function PeopleList(){
    const [people, setPeople]=useState()
    const [button, setButton]=useState(false)
    const [isLoading, setIsLoading]=useState(false)
    async function peopleHandler(){
        //setButton((curState)=>[...curState, !curState[2]])
        //setIsLoading((curState)=>[...curState, !curState[2]])
        setButton((curState)=>!curState)
        setIsLoading(true)
        const response= await fetch("https://swapi.dev/api/people/")
        const data=await response.json()
        const transformedPeople=data.results.map((person)=>{
            return ({name:person.name,
            height:person.height,
            mass:person.mass,
            haircolor:person.hair_color,
            skincolor:person.skin_color,
            eyecolor:person.eye_color,
            birthyear:person.birth_year,
            gender:person.gender,
            })
        })
        console.log(transformedPeople)
        setPeople(transformedPeople)
        //setIsLoading((curState)=>[...curState, !curState[2]])
        setIsLoading(false)
    }
    return (<div className="dropdown">
        <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" 
        onClick={peopleHandler}>People<span className="caret"></span></button>
        <section className="container">
            {button && !isLoading && people.length>0 && <ErrorBoundary>
                <ul>{people.map((person)=>{return (<li>{person.name}</li>)})}</ul>
                </ErrorBoundary>}
            {button && !isLoading && people.length === 0 && <p>No Person Found</p>}
            {button && isLoading && <p>Loading...</p>}
        </section>
    </div>)
}
export default PeopleList;