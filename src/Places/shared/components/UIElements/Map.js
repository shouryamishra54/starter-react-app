<<<<<<< HEAD
import { useEffect, useRef } from "react";

function Map(props){
    const mapRef=useRef();
    const {center, zoom}=props;
    useEffect(()=>{
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom
          });
          new window.google.maps.Marker({ position: center, map: map });
    }, [center, zoom])

    return (<div
        ref={mapRef}
        className={`${props.className}`}
        style={props.style}>
    </div>)
}
=======
import { useEffect, useRef } from "react";

function Map(props){
    const mapRef=useRef();
    const {center, zoom}=props;
    useEffect(()=>{
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom
          });
          new window.google.maps.Marker({ position: center, map: map });
    }, [center, zoom])

    return (<div
        ref={mapRef}
        className={`${props.className}`}
        style={props.style}>
    </div>)
}
>>>>>>> b2d305ed7b17da04bc48e631d42f0e92ca8594f6
export default Map;