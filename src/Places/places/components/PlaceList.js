import Card from "react-bootstrap/Card"
import Carousel from "react-bootstrap/Carousel"
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import PlaceItem from "./PlaceItem";
import Accordion from "react-bootstrap/Accordion";

function PlaceList(props){
    const places=props.places;
    return (<Container className="align-self-center container">
        <Card className="text-center" bg="light" style={{"padding":"5px"}}>
          <Card.Header><h3>User Place Portal</h3></Card.Header>
          <Card.Body class="align-self-center col-md-7 col-sm-10 col-xs-12">
            <Card.Title><strong>Places List</strong></Card.Title>
            <Carousel>
            {places.map((place)=>{
                return (<Carousel.Item>
                        <PlaceItem place={place}></PlaceItem>
                    </Carousel.Item>
                )
            })}
            </Carousel>
          </Card.Body>
          <Card.Footer className="text-muted"> Last updated 2 days ago</Card.Footer>
        </Card>
      </Container>);
}
export default PlaceList