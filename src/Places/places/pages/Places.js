<<<<<<< HEAD
import { Accordion, Button, Card, Col, Container, NavLink, OverlayTrigger, Row, Tooltip } from "react-bootstrap"
import { DUMMY_PLACES } from "./UserPlaces"
import { USERS } from "../../users/pages/Users";
import { List } from "reactstrap";
import UseHttp from "../../shared/hooks/use-http";
import { getAllPlaces } from "../../shared/libs/api";
import { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";

function Places(props){
    // const places=DUMMY_PLACES;
    const history=useHistory();
    const params=useLocation().search
    // console.log(history)
    // console.log(params)
    const {isLoading, error, data, sendRequest:allPlacesRequest}=UseHttp(getAllPlaces)
    useEffect(()=>{
        allPlacesRequest({params})
    }, [])
    // console.log(data.places)
    /*return (<Container>
        <Row>
        <Col>
        <Card>
            <Card.Header><Card.Title>
                <NavLink href="/places">List of famous places all over the world</NavLink>
            </Card.Title></Card.Header>
            <Card.Body>
                <Accordion alwaysOpen>
                    {places.map((place)=>{
                        return <Accordion.Item eventKey={place.id}>
                            <Accordion.Header>
                                <h1>{place.title}</h1>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col sm={4}>
                                        <Card.Img 
                                            height={500} width={300}
                                            src={place.imageUrl}/>
                                    </Col>
                                    <Col sm={8}>
                                        <h6>{place.address}</h6>
                                        <h5>{USERS.find((user)=>{return user.id === place.creator})}</h5>
                                        <p>{place.description}</p>
                                        <h6>{place.location}</h6>
                                        <Button href={`/places/${place.id}`}>View more details</Button>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    })}
                </Accordion>
            </Card.Body>
        </Card>
        </Col>
        </Row>
    </Container>)*/
    return <Container>
        <Row>
        <Col>
        <br/><br/>
        <Card border="light">
            <Card.Header><Card.Title>
                <h4><strong>
                    <NavLink href="/places">List of famous places all over the world</NavLink>
                </strong></h4>
            </Card.Title></Card.Header>
            <Card.Body>
                {isLoading && <Row><Col>
                    <h3><strong>Loading...</strong></h3>
                </Col></Row>}
                {error && <Row><Col>
                    <h3><strong>Error Occured: </strong></h3>
                    <h5>{error}</h5>
                </Col></Row>}
                {data && data.places && data.places.length>0 && <Accordion alwaysOpen flush>
                    {data.places.map((place)=>{
                    // const user=USERS.find((user)=>{return user.id === place.creator})
                    // console.log(user)
                    return <Accordion.Item eventKey={place.id}>
                        <Accordion.Header><h4>{place.title}</h4></Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col sm={4}>
                                    {place.imageUrl && <Card.Img 
                                        height={500} width={300}
                                        src={place.imageUrl}/>}
                                </Col>
                                <Col sm={8}>
                                    <h5>{place.address}</h5>
                                    <br/>
                                    <List tag={'ul'}>
                                    <li className="list-inline-item">
                                        <Button href={`/places/${place.id}`}>View More Details</Button>
                                    </li>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <li className="list-inline-item">
                                        <OverlayTrigger
                                        trigger={'hover'} placement={'bottom'} overlay={
                                            <Tooltip id={`tooltip-${place.id}`}>
                                                Go to places created by the user
                                            </Tooltip>
                                        }>
                                        <NavLink className="text-end" href={`/users/${place.creator}`}>
                                            {place.creator?'- '+place.creator:''}
                                        </NavLink>
                                        </OverlayTrigger>
                                    </li>
                                    </List>
                                    <br/>
                                    <p>{place.description}</p><br/>
                                    <h5>Location: </h5>
                                    {place.location?<p><List tag={'ul'} type={'inline'}>
                                        <li>Latitude: {place.location.lat}</li>
                                        <li>Longitude: {place.location.lng}</li>
                                    </List></p>:''}
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>})}
                </Accordion>}
                {data && data.places && data.places.length<=0 && <Row><Col>
                    <h3><strong>No place found</strong></h3>
                </Col></Row>}
            </Card.Body>
        </Card>
        </Col>
        </Row>
    </Container>
}
=======
import { Accordion, Button, Card, Col, Container, NavLink, OverlayTrigger, Row, Tooltip } from "react-bootstrap"
import { DUMMY_PLACES } from "./UserPlaces"
import { USERS } from "../../users/pages/Users";
import { List } from "reactstrap";
import UseHttp from "../../shared/hooks/use-http";
import { getAllPlaces } from "../../shared/libs/api";
import { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";

function Places(props){
    // const places=DUMMY_PLACES;
    const history=useHistory();
    const params=useLocation().search
    // console.log(history)
    // console.log(params)
    const {isLoading, error, data, sendRequest:allPlacesRequest}=UseHttp(getAllPlaces)
    useEffect(()=>{
        allPlacesRequest({params})
    }, [])
    // console.log(data.places)
    /*return (<Container>
        <Row>
        <Col>
        <Card>
            <Card.Header><Card.Title>
                <NavLink href="/places">List of famous places all over the world</NavLink>
            </Card.Title></Card.Header>
            <Card.Body>
                <Accordion alwaysOpen>
                    {places.map((place)=>{
                        return <Accordion.Item eventKey={place.id}>
                            <Accordion.Header>
                                <h1>{place.title}</h1>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col sm={4}>
                                        <Card.Img 
                                            height={500} width={300}
                                            src={place.imageUrl}/>
                                    </Col>
                                    <Col sm={8}>
                                        <h6>{place.address}</h6>
                                        <h5>{USERS.find((user)=>{return user.id === place.creator})}</h5>
                                        <p>{place.description}</p>
                                        <h6>{place.location}</h6>
                                        <Button href={`/places/${place.id}`}>View more details</Button>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    })}
                </Accordion>
            </Card.Body>
        </Card>
        </Col>
        </Row>
    </Container>)*/
    return <Container>
        <Row>
        <Col>
        <br/><br/>
        <Card border="light">
            <Card.Header><Card.Title>
                <h4><strong>
                    <NavLink href="/places">List of famous places all over the world</NavLink>
                </strong></h4>
            </Card.Title></Card.Header>
            <Card.Body>
                {isLoading && <Row><Col>
                    <h3><strong>Loading...</strong></h3>
                </Col></Row>}
                {error && <Row><Col>
                    <h3><strong>Error Occured: </strong></h3>
                    <h5>{error}</h5>
                </Col></Row>}
                {data && data.places && data.places.length>0 && <Accordion alwaysOpen flush>
                    {data.places.map((place)=>{
                    // const user=USERS.find((user)=>{return user.id === place.creator})
                    // console.log(user)
                    return <Accordion.Item eventKey={place.id}>
                        <Accordion.Header><h4>{place.title}</h4></Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col sm={4}>
                                    {place.imageUrl && <Card.Img 
                                        height={500} width={300}
                                        src={place.imageUrl}/>}
                                </Col>
                                <Col sm={8}>
                                    <h5>{place.address}</h5>
                                    <br/>
                                    <List tag={'ul'}>
                                    <li className="list-inline-item">
                                        <Button href={`/places/${place.id}`}>View More Details</Button>
                                    </li>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <li className="list-inline-item">
                                        <OverlayTrigger
                                        trigger={'hover'} placement={'bottom'} overlay={
                                            <Tooltip id={`tooltip-${place.id}`}>
                                                Go to places created by the user
                                            </Tooltip>
                                        }>
                                        <NavLink className="text-end" href={`/users/${place.creator}`}>
                                            {place.creator?'- '+place.creator:''}
                                        </NavLink>
                                        </OverlayTrigger>
                                    </li>
                                    </List>
                                    <br/>
                                    <p>{place.description}</p><br/>
                                    <h5>Location: </h5>
                                    {place.location?<p><List tag={'ul'} type={'inline'}>
                                        <li>Latitude: {place.location.lat}</li>
                                        <li>Longitude: {place.location.lng}</li>
                                    </List></p>:''}
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>})}
                </Accordion>}
                {data && data.places && data.places.length<=0 && <Row><Col>
                    <h3><strong>No place found</strong></h3>
                </Col></Row>}
            </Card.Body>
        </Card>
        </Col>
        </Row>
    </Container>
}
>>>>>>> b2d305ed7b17da04bc48e631d42f0e92ca8594f6
export default Places