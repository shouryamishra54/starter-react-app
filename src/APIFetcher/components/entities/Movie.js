import ErrorBoundary from "../ErrorBoundary";
import {useEffect, useState} from "react"

function Movie(data){
    const [isClicked, setIsClicked]=useState(false)
    function clickHandler(){
        setIsClicked((curState)=>!curState)
    }
    const content=<div className="panel-collapse">
             {isClicked? (<table className="table table-condensed table-bordered">
                 <tbody>
                     <tr>
                         <td>Episode Number: </td>
                         <td>{data.movieItem.episodeno}</td>
                     </tr>
                     <tr>
                         <td>Opening Crawl: </td>
                         <td>{data.movieItem.openingcrawl}</td>
                     </tr>
                     <tr>
                         <td>Director/s: </td>
                         <td>{data.movieItem.director}</td>
                     </tr>
                     <tr>
                         <td>Producer/s: </td>
                         <td>{data.movieItem.producer}</td>
                     </tr>
                     <tr>
                         <td>Release Date: </td>
                         <td>{data.movieItem.releasedate}</td>
                     </tr>
                 </tbody>
             </table>):""}
         </div>
    console.log(content)
    return (<div className="panel panel-heading">
        <a data-toggle="collapse" href={`#${data.movieItem.id}`} onClick={clickHandler}>{data.movieItem.title}</a>
        {isClicked && content}
    </div>)
}
export default Movie;