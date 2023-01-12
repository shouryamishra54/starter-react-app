<<<<<<< HEAD
import { useAccordionButton } from "react-bootstrap/AccordionButton"
import Button from "react-bootstrap/esm/Button";

function CustomToggle(props){
    const decorateOnClick=useAccordionButton(props.eventkey, ()=>{
        console.log("totally custom");
    })
    return (<Button
        size="lg"
        type="button"
        variant="primary"
        style={{"color":"while"}}
        onClick={decorateOnClick}
    >
        {props.children}
    </Button>)

}
=======
import { useAccordionButton } from "react-bootstrap/AccordionButton"
import Button from "react-bootstrap/esm/Button";

function CustomToggle(props){
    const decorateOnClick=useAccordionButton(props.eventkey, ()=>{
        console.log("totally custom");
    })
    return (<Button
        size="lg"
        type="button"
        variant="primary"
        style={{"color":"while"}}
        onClick={decorateOnClick}
    >
        {props.children}
    </Button>)

}
>>>>>>> b2d305ed7b17da04bc48e631d42f0e92ca8594f6
export default CustomToggle;