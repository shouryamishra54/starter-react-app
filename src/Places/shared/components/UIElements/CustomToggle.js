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
export default CustomToggle;