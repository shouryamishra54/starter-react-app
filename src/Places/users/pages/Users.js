<<<<<<< HEAD
import { Card, Col, Nav, Navbar, NavLink, Row } from "react-bootstrap";
import UserList from "../components/UserList";
import UseHttp from "../../shared/hooks/use-http";
import { getAllUsers } from "../../shared/libs/api";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

export const USERS = [
  {
    id: 'u1',
    name: 'Shourya Mishra',
    image: 
      'https://instagram.fdel4-2.fna.fbcdn.net/v/t51.2885-15/108439021_4440427222642057_3154425594131377289_n.jpg?stp=dst-jpg_e15_p640x640&_nc_ht=instagram.fdel4-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=9AeKWIbbgM4AX9qs3ke&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjM1MDQ0ODcxNzYyODUxNjcwNQ%3D%3D.2-ccb7-5&oh=00_AT_ROOD9yWrZGjNsMHxum3d2XIyNCN6O51PD-g3lBkjCWA&oe=633CAF5D&_nc_sid=30a2ef',
    places: 3
  },
  {
      id: 'u2',
      name: 'Tejas Mishra',
      image: 
        'https://instagram.fdel4-2.fna.fbcdn.net/v/t51.2885-15/309581876_620615659559463_4443950631249594755_n.webp?stp=dst-jpg_e35&_nc_ht=instagram.fdel4-2.fna.fbcdn.net&_nc_cat=103&_nc_ohc=TyVjH_M-zSAAX9WWpI0&tn=x_XmmzhCytfh7YeN&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkzNjk4MDgzMzI1MzA5OTgyMQ%3D%3D.2-ccb7-5&oh=00_AT_6nmaYLjzbh51nd5AtmIkHqwp2lzoxircCpkgYaPSktA&oe=633CF274&_nc_sid=30a2ef',
      places: 4
  },
  {
      id: 'u3',
      name: 'Max Schwarz',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      places: 3
  }
];
function Users(props){
  const {isLoading, error, data: users, sendRequest:allUsersRequest}=UseHttp(getAllUsers)
  const history=useHistory();
  const params=useLocation().search

  useEffect(()=>{
    allUsersRequest({params})
  }, [])
  useEffect(()=>{
    console.log(users)
  }, [users])
  useEffect(()=>{
    console.log(error)
  }, [error])
  return (<div>
      <br/><br/>
      <Card border="light">
        <Card.Header>
          <Card.Title><h4><strong>
            <NavLink href="/users">List of Users</NavLink>
          </strong></h4></Card.Title>
        </Card.Header>
        <Card.Body>
          {isLoading && <Row><Col>
              <h3><strong>Loading...</strong></h3>
          </Col></Row>}
          {error && <Row><Col>
              <h3><strong>Error Occured: </strong></h3>
              <h5>{error}</h5>
          </Col></Row>}
          {users  && <UserList users={Object.values(users)} />}
          {(!users || (users && users.length<=0)) && <Row><Col>
              <h3><strong>No User found</strong></h3>
          </Col></Row>}
        </Card.Body>
      </Card>
    </div>)
}
=======
import { Card, Col, Nav, Navbar, NavLink, Row } from "react-bootstrap";
import UserList from "../components/UserList";
import UseHttp from "../../shared/hooks/use-http";
import { getAllUsers } from "../../shared/libs/api";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

export const USERS = [
  {
    id: 'u1',
    name: 'Shourya Mishra',
    image: 
      'https://instagram.fdel4-2.fna.fbcdn.net/v/t51.2885-15/108439021_4440427222642057_3154425594131377289_n.jpg?stp=dst-jpg_e15_p640x640&_nc_ht=instagram.fdel4-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=9AeKWIbbgM4AX9qs3ke&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjM1MDQ0ODcxNzYyODUxNjcwNQ%3D%3D.2-ccb7-5&oh=00_AT_ROOD9yWrZGjNsMHxum3d2XIyNCN6O51PD-g3lBkjCWA&oe=633CAF5D&_nc_sid=30a2ef',
    places: 3
  },
  {
      id: 'u2',
      name: 'Tejas Mishra',
      image: 
        'https://instagram.fdel4-2.fna.fbcdn.net/v/t51.2885-15/309581876_620615659559463_4443950631249594755_n.webp?stp=dst-jpg_e35&_nc_ht=instagram.fdel4-2.fna.fbcdn.net&_nc_cat=103&_nc_ohc=TyVjH_M-zSAAX9WWpI0&tn=x_XmmzhCytfh7YeN&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkzNjk4MDgzMzI1MzA5OTgyMQ%3D%3D.2-ccb7-5&oh=00_AT_6nmaYLjzbh51nd5AtmIkHqwp2lzoxircCpkgYaPSktA&oe=633CF274&_nc_sid=30a2ef',
      places: 4
  },
  {
      id: 'u3',
      name: 'Max Schwarz',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      places: 3
  }
];
function Users(props){
  const {isLoading, error, data: users, sendRequest:allUsersRequest}=UseHttp(getAllUsers)
  const history=useHistory();
  const params=useLocation().search

  useEffect(()=>{
    allUsersRequest({params})
  }, [])
  useEffect(()=>{
    console.log(users)
  }, [users])
  useEffect(()=>{
    console.log(error)
  }, [error])
  return (<div>
      <br/><br/>
      <Card border="light">
        <Card.Header>
          <Card.Title><h4><strong>
            <NavLink href="/users">List of Users</NavLink>
          </strong></h4></Card.Title>
        </Card.Header>
        <Card.Body>
          {isLoading && <Row><Col>
              <h3><strong>Loading...</strong></h3>
          </Col></Row>}
          {error && <Row><Col>
              <h3><strong>Error Occured: </strong></h3>
              <h5>{error}</h5>
          </Col></Row>}
          {users  && <UserList users={Object.values(users)} />}
          {(!users || (users && users.length<=0)) && <Row><Col>
              <h3><strong>No User found</strong></h3>
          </Col></Row>}
        </Card.Body>
      </Card>
    </div>)
}
>>>>>>> b2d305ed7b17da04bc48e631d42f0e92ca8594f6
export default Users