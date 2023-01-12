<<<<<<< HEAD
import Figure from "react-bootstrap/Figure";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import CustomToggle from "../../shared/components/UIElements/CustomToggle";
import Button from "react-bootstrap/esm/Button";
import { NavLink } from "react-router-dom";

function UserItem(props){
    return (<Card border={'light'}>
        <Card.Body>
            {props.item.image && <Figure>
                <Figure.Image
                    style={{"borderRadius":"50%"}} thumbnail={true}
                    width={200} height={200} 
                    src={`http://localhost:5000/${props.item.image}`} alt={props.item.name}>
                </Figure.Image>
                <Figure.Caption>
                    {props.item.name}
                </Figure.Caption>
            </Figure>}
            {props.item.places && props.item.places.length>0 &&
            <div>
                <h3>
                    {`${props.item.places.length} ${props.item.places.length === 1 ? "Place" : "Places"}`}
                </h3>
                <Button variant="primary" href={`/users/${props.item.userId}`}>
                    Go to {props.item.places.length === 1 ? "Place" : "Places"}
                </Button>
            </div>
            }
            {(!props.item.places || props.item.places.length <= 0) && 
            <h3>No Place exist for this user</h3>}
        </Card.Body>
    </Card>)
}
=======
import Figure from "react-bootstrap/Figure";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import CustomToggle from "../../shared/components/UIElements/CustomToggle";
import Button from "react-bootstrap/esm/Button";
import { NavLink } from "react-router-dom";

function UserItem(props){
    return (<Card border={'light'}>
        <Card.Body>
            {props.item.image && <Figure>
                <Figure.Image
                    style={{"borderRadius":"50%"}} thumbnail={true}
                    width={200} height={200} 
                    src={`http://localhost:5000/${props.item.image}`} alt={props.item.name}>
                </Figure.Image>
                <Figure.Caption>
                    {props.item.name}
                </Figure.Caption>
            </Figure>}
            {props.item.places && props.item.places.length>0 &&
            <div>
                <h3>
                    {`${props.item.places.length} ${props.item.places.length === 1 ? "Place" : "Places"}`}
                </h3>
                <Button variant="primary" href={`/users/${props.item.userId}`}>
                    Go to {props.item.places.length === 1 ? "Place" : "Places"}
                </Button>
            </div>
            }
            {(!props.item.places || props.item.places.length <= 0) && 
            <h3>No Place exist for this user</h3>}
        </Card.Body>
    </Card>)
}
>>>>>>> b2d305ed7b17da04bc48e631d42f0e92ca8594f6
export default UserItem