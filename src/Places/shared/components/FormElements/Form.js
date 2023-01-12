import React from "react";
import "./Form.css";
import { Button, ButtonGroup, Card, Container, Form as Entry } from "react-bootstrap";
// import FormGroup from "../../components/FormElements/FormGroup";

function Form(data){

    return (<div class="container register">
    <div class="row">
        <div class="col-md-3 form-left" style={{"color":"blue"}}>
            <img src="https://i.pinimg.com/originals/7d/96/a9/7d96a91af93b047dc9bf90cc33932bb4.jpg" 
            alt=""/>
            <h3>Welcome</h3>
            <p>You are 30 seconds away from earning your own money!</p>
        </div>
        <div class="col-md-9 form-right">
            
                <Entry onSubmit={data.onSubmit} className={data.formClassName}>
                    <h2 className="">{data.header}</h2>
                    <div class="">
                        {data.children}
                    </div>    
                    <ul className="list-group list-group-horizontal float-end">
                        <li className="list-group-item border-0" style={{"backgroundColor":"transparent"}}>
                            <Button variant="secondary" onClick={data.onCancel}>Cancel</Button>
                        </li>
                        <li className="list-group-item border-0" style={{"backgroundColor":"transparent"}}>
                            <Button variant="primary" type="submit" disabled={data.submitting === true}>Submit</Button>
                        </li>
                    </ul>
                </Entry>
            </div>
        </div>
    </div>)
}
export default Form;