import { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { NavLink, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { AuthContext } from "../../shared/context/auth-context";
import { DUMMY_PLACES } from "./UserPlaces";
import UseHttp from "../../shared/hooks/use-http";
import { getPlaceByPlaceId } from "../../shared/libs/api";

function Place(){
    const pid=useParams().pid;
    const history=useHistory();
    const {isLoading, error, data: place, sendRequest:placeByPlaceIdRequest}=UseHttp(getPlaceByPlaceId)
    // const place=DUMMY_PLACES.find((p)=>{return p.id === pid})
    let creator
    console.log(place)
    const auth=useContext(AuthContext).isLoggedIn;
    const userId=useContext(AuthContext).userId;
    const [mapOpened, setMapOpened]=useState(false);
    const [save, setSave]=useState();
    const [shareModal, setShareModal]=useState();
    const [deleteBoxOpened, setDeleteBoxOpened]=useState();
    function mapClickHandler(){
        setMapOpened((prev)=>!prev)
    }
    function saveSelector(){
        setSave((prev)=>!prev)
    }
    function shareModalOpen(){
        setShareModal((prev)=>!prev)
    }
    useEffect(()=>{
        placeByPlaceIdRequest({id: pid})
    }, [])
    useEffect(()=>{
        if(place && place !== null){
            creator=place.creator
        }
        console.log(place)
    }, [place])
    return (<Container>
        <Card className="text-center" bg="light" style={{"padding":"5px"}}>
            {error && <Row><Col><h3>{error}</h3></Col></Row>}
            {isLoading && <Row><Col><h3>{isLoading}</h3></Col></Row>}
            {(place && place !== null) &&
            <Card.Body>
                <header>
                    <div class="row">
                    <div class="col-md-8 col-sm-8 col-xs-12">
                    <div class="post-meta-left-box text-start">
                    <ul class="breadcrumbs" style={{"listStyle":"none"}}>
                        <li><NavLink to="/">Home</NavLink>
                        <span> / </span><span>Gateway of India</span></li>
                        <l1><h1>Gateway of India</h1></l1>
                    </ul>    
                    </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="post-meta-left-box text-start">
                        <div class="col-md-6 offset-md-5">
                            <div class="row">
                                <div class="col-md-6"><Button variant="secondary" style={{"width":"100px"}} onClick={shareModalOpen}>Share</Button></div>
                                <div class="col-md-6"><Button variant="secondary" style={{"width":"100px"}} onClick={saveSelector}>Save</Button></div>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-md-5 align-self-center text-start">
                                Be the first one to review!
                            </div>
                            <div class="col-md-6">
                                <Button size="lg" style={{"width":"200px"}}>Submit Review</Button>
                            </div>
                        </div>
                        <br/>
                    </div>
                    </div>
                    </div>
                </header>
                <section>
                    <div></div>
                </section>
            <Card.Img
                src={place.imageUrl}/>
            <h3>
                {place.title}
            </h3>
            <p>{place.description}</p>
            <ButtonGroup>
                <Button type="button" size="lg" variant="primary" onClick={mapClickHandler}>
                    Show on Map
                </Button>
                {auth && (userId === place.creator) && <Button type="button" size="lg" href={`/places/${pid}/edit-place`}>Edit
                    </Button>}
                {auth && (userId === place.creator) && <Button type="button" size="lg" variant="danger" onClick={()=>{
                    setDeleteBoxOpened(true)
                }}>Delete
                    </Button>}
            </ButtonGroup>
            <Modal
                show={mapOpened}
                onHide={mapClickHandler}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>{place.address}</Modal.Title>
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
            <Modal 
                show={deleteBoxOpened}
                onHide={()=>{setDeleteBoxOpened(false)}}
                backdrop="static">
                <Modal.Header closeButton><Modal.Title>{place.address}</Modal.Title></Modal.Header>
                <Modal.Body>
                    <h4>Do you confirm to delete this place?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{setDeleteBoxOpened(false)}}>
                        No
                    </Button>
                    <Button variant="primary" onClick={()=>{
                        console.log("Delete Confirmed")
                        setDeleteBoxOpened(false)
                        history.push("/users/"+creator)
                    }}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </Card.Body>}
            {(!place || place == null) && 
            <Card.Body>
                <h3>No Place found for the given ID</h3>    
            </Card.Body>}
            <Card.Footer>
                <Button variant="light" onClick={history.goBack}>Go Back</Button>
            </Card.Footer>
        </Card></Container>
    )
}
export default Place