
import { useContext } from "react";
import { useAccordionButton } from "react-bootstrap/AccordionButton"
import AccordionContext from "react-bootstrap/AccordionContext";
import Button from "react-bootstrap/esm/Button";

function ContextAwareToggle(props){
    const activeEventKey=useContext(AccordionContext)
    const decorateOnClick=useAccordionButton(props.eventkey, 
        ()=>props.callback && props.callback(props.event)
    )
    const isCurrentActive=activeEventKey === props.eventkey
    return (<Button
        type="button"
        size="lg"
        variant="primary"
        style={{"color":isCurrentActive ? "pink" : "lavender"}}
        onClick={decorateOnClick}
    >
        {props.children}
    </Button>)
}
export default ContextAwareToggle;