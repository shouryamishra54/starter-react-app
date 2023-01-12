import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import UseHttp from "../../shared/hooks/use-http";
import { getPlacesByUserId } from "../../shared/libs/api";
import { useDebugValue, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Container, Row } from "react-bootstrap";

export const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'
    },
    {
      id: 'p2',
      title: 'Emp. State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'
    }
];
function UserPlaces(props){
  const history=useHistory();
  const params=useLocation().search
  const userId=useParams().userId
  const {isLoading, error, data: userPlaces, sendRequest:userPlacesRequest}=UseHttp(getPlacesByUserId)
  // const userPlaces=DUMMY_PLACES.filter((place)=>{return (place.creator === userId)})
  useEffect(()=>{
    userPlacesRequest({
      id: userId,
      params: params
    })
  }, [])
  return (<Container>
    <Row>
      <Col>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      {userPlaces && userPlaces.length>0 && <PlaceList places={userPlaces}></PlaceList>}
      </Col>
    </Row>
  </Container>)
  
}
export default UserPlaces