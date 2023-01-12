<<<<<<< HEAD
import UserItem from "./UserItem";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import CustomToggle from "../../shared/components/UIElements/CustomToggle";

function UserList(props){
    return (<Accordion flush>
        {props.users.map((userItem)=>{
            return (<Accordion.Item eventKey={userItem.userId}>
                <Accordion.Header style={{"color":"#555555"}}>
                    {userItem.name}
                </Accordion.Header>
                <Accordion.Body>
                    <Card.Body>
                        <UserItem item={userItem}></UserItem>
                    </Card.Body>
                </Accordion.Body>
            </Accordion.Item>
            )
        })}
    </Accordion>)
}
=======
import UserItem from "./UserItem";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import CustomToggle from "../../shared/components/UIElements/CustomToggle";

function UserList(props){
    return (<Accordion flush>
        {props.users.map((userItem)=>{
            return (<Accordion.Item eventKey={userItem.userId}>
                <Accordion.Header style={{"color":"#555555"}}>
                    {userItem.name}
                </Accordion.Header>
                <Accordion.Body>
                    <Card.Body>
                        <UserItem item={userItem}></UserItem>
                    </Card.Body>
                </Accordion.Body>
            </Accordion.Item>
            )
        })}
    </Accordion>)
}
>>>>>>> b2d305ed7b17da04bc48e631d42f0e92ca8594f6
export default UserList