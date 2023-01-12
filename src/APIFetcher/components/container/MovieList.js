//import "../styles/bootstrap.css";
//import defclass from "../styles/default.module.css";
//import pretty from "../styles/prettify.module.css";
import ErrorBoundary from "../ErrorBoundary";
import Movie from "../entities/Movie.js";
import {useState} from "react"

function MovieList(){
    const [movies, setMovies]=useState()
    const [button, setButton]=useState(false)
    const [isLoading, setIsLoading]=useState(false)
    async function moviesHandler(){
        //setButton((curState)=>[...curState, !curState[2]])
        //setIsLoading((curState)=>[...curState, !curState[2]])
        setButton((curState)=>!curState)
        setIsLoading(true)
        const response= await fetch("https://swapi.dev/api/films/")
        const data=await response.json()
        const transformedMovies=data.results.map((movieData)=>{
            return ({id:`movie${(Math.random()*100000000).toFixed(0)}`,
            title:movieData.title,
            episodeno:movieData.episode_id,
            openingcrawl:movieData.opening_crawl,
            director:movieData.director,
            producer:movieData.producer,
            releasedate:movieData.release_date})
        })
        console.log(transformedMovies)
        setMovies(transformedMovies)
        //setIsLoading((curState)=>[...curState, !curState[2]])
        setIsLoading(false)
    }
    return (<div className="dropdown">
        <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" 
        onClick={moviesHandler}>Movies<span className="caret"></span></button>
        <section className="container">
                {button && !isLoading && movies.length>0 && <ErrorBoundary>
                    {movies.map((movie)=>{return (<div className="panel panel-heading">
                        <Movie movieItem={movie}></Movie></div>)})}
                    </ErrorBoundary>}
                {button && !isLoading && movies.length === 0 && <p>No Movie Found</p>}
                {button && isLoading && <p>Loading...</p>}
        </section>
    </div>)
}
export default MovieList;