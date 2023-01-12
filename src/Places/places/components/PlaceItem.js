import Carousel from "react-bootstrap/Carousel"
import Image from "react-bootstrap/esm/Image"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../shared/context/auth-context"
import Container from "react-bootstrap/esm/Container"
import Map from "../../shared/components/UIElements/Map";
import Modal from "react-bootstrap/Modal";
import { Figure } from "react-bootstrap";
import { NavLink, Redirect, useHistory } from "react-router-dom";
// import Modal from "../../shared/components/UIElements/Modal";

function PlaceItem(props){
    const [mapOpened, setMapOpened]=useState(false);
    function mapClickHandler(){
        setMapOpened((prev)=>!prev)
    }
    /*function redirect(id){
        const history=useHistory();
        history.push(`/places/${id}`)
    }*/
    console.log(mapOpened)
    return (<Card bg="secondary">
        <Card.Body>
            <Card.Img
                height={500} width={300}
                src={props.place.imageUrl}/>
            <Carousel.Caption>
            <h3>
                <NavLink class="nav-link" style={{"color": "white"}} to={`/places/${props.place.id}`}>
                    {props.place.title}
                </NavLink>
            </h3>
            <p style={{"color": "white"}}>{props.place.address}</p>
            <ButtonGroup>
                <Button type="button" size="lg" variant="primary" onClick={mapClickHandler}>
                    Show on Map
                </Button>
            </ButtonGroup></Carousel.Caption>
            <Modal
                show={mapOpened}
                onHide={mapClickHandler}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>{props.place.address}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h2>We are not able to open the map right now due to techincal issues.</h2>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={mapClickHandler}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </Card.Body>
        <Card.Footer>
            <div></div>
        </Card.Footer>
    </Card>)
}
export default PlaceItem