<<<<<<< HEAD
import React, { useState } from "react";
import { Button, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";

function MainNavigation(props){
    const [drawerOpened, setDrawerOpened]=useState(false);
    function openDrawer(){
        setDrawerOpened(true)
    }
    function closeDrawer(){
        setDrawerOpened(false)
    }
    return (<React.Fragment>
            <NavLink expand={false}/>
        <Offcanvas show={drawerOpened} onHide={closeDrawer}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>)
}
=======
import React, { useState } from "react";
import { Button, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";

function MainNavigation(props){
    const [drawerOpened, setDrawerOpened]=useState(false);
    function openDrawer(){
        setDrawerOpened(true)
    }
    function closeDrawer(){
        setDrawerOpened(false)
    }
    return (<React.Fragment>
            <NavLink expand={false}/>
        <Offcanvas show={drawerOpened} onHide={closeDrawer}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>)
}
>>>>>>> b2d305ed7b17da04bc48e631d42f0e92ca8594f6
export default MainNavigation