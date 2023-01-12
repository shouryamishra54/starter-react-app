<<<<<<< HEAD
import { useContext } from "react";
import { Button, Container, Form, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { AuthContext } from "../../context/auth-context";

function NavLink(props){
    const authctx=useContext(AuthContext)
    const expand=props.expand;
    return (<Navbar key={expand} bg="light" expand={expand} className="mb-3" fixed={'top'} style={{"padding":"5px"}}>
        <Container>
        <Navbar.Brand className="me-auto" href="#">Responsive Navbar</Navbar.Brand>
        <Navbar.Brand href="/places">Places</Navbar.Brand>
        <Navbar.Brand href="/users">Users</Navbar.Brand>
        <Navbar.Toggle></Navbar.Toggle>
        <Navbar.Offcanvas scroll={true} style={{"textAlign":"center", "alignItems":"center"}}>
            <Offcanvas.Body>
                <Nav>
                    {!authctx.isLoggedIn && <Nav.Link href="/auth">Login</Nav.Link>}
                    {authctx.isLoggedIn && <Nav.Link href="/places/users/u1">My Places</Nav.Link>}
                    {authctx.isLoggedIn && <Nav.Link href="/new-place">New</Nav.Link>}
                    {authctx.isLoggedIn && <Form className="d-flex">
                        <Button variant="light">logout</Button>
                        </Form>}
                </Nav>
            </Offcanvas.Body>
        </Navbar.Offcanvas>
        </Container>
    </Navbar>)
}
=======
import { useContext } from "react";
import { Button, Container, Form, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { AuthContext } from "../../context/auth-context";

function NavLink(props){
    const authctx=useContext(AuthContext)
    const expand=props.expand;
    return (<Navbar key={expand} bg="light" expand={expand} className="mb-3" fixed={'top'} style={{"padding":"5px"}}>
        <Container>
        <Navbar.Brand className="me-auto" href="#">Responsive Navbar</Navbar.Brand>
        <Navbar.Brand href="/places">Places</Navbar.Brand>
        <Navbar.Brand href="/users">Users</Navbar.Brand>
        <Navbar.Toggle></Navbar.Toggle>
        <Navbar.Offcanvas scroll={true} style={{"textAlign":"center", "alignItems":"center"}}>
            <Offcanvas.Body>
                <Nav>
                    {!authctx.isLoggedIn && <Nav.Link href="/auth">Login</Nav.Link>}
                    {authctx.isLoggedIn && <Nav.Link href="/places/users/u1">My Places</Nav.Link>}
                    {authctx.isLoggedIn && <Nav.Link href="/new-place">New</Nav.Link>}
                    {authctx.isLoggedIn && <Form className="d-flex">
                        <Button variant="light">logout</Button>
                        </Form>}
                </Nav>
            </Offcanvas.Body>
        </Navbar.Offcanvas>
        </Container>
    </Navbar>)
}
>>>>>>> b2d305ed7b17da04bc48e631d42f0e92ca8594f6
export default NavLink;