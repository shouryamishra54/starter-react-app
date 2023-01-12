<<<<<<< HEAD
import React, { useContext, useEffect, useRef, useState } from "react";
import FormGroup from "../../shared/components/FormElements/FormGroup";
import Form from "../../shared/components/FormElements/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { DUMMY_PLACES } from "./UserPlaces";
import UseHttp from "../../shared/hooks/use-http";
import { getPlaceByPlaceId, updatePlace } from "../../shared/libs/api";
import { AuthContext } from "../../shared/context/auth-context";

function EditPlace(props){
    const placeId=useParams().pid;
    // const place=DUMMY_PLACES.find((place)=>{return place.id === placeId})
    const {updateIsLoading, updatePlaceError, data: updatedPlace, sendRequest:updatePlaceRequest}=UseHttp(updatePlace)
    const {placeIsLoading, placeError, data: place, sendRequest:placeByPlaceIdRequest}=UseHttp(getPlaceByPlaceId)
    const [submitting, setSubmitting]=useState()
    const [toggle, setToggle]=useState(false)
    const history=useHistory();
    const authctx=useContext(AuthContext)
    const token=authctx.token
    useEffect(()=>{
        placeByPlaceIdRequest({id: placeId})
    }, [])
    const formik=useFormik({
        initialValues:{
            placename: '',
            address: '',
            description: '',
        },
        validationSchema:Yup.object({
            placename: Yup.string().required("Please enter the place name"),
            address: Yup.string().required("Please enter the address"),
            description: Yup.string()
        }),
        onSubmit:(values, {resetForm})=>{
            setSubmitting(true)
            console.log(place)
            setTimeout(()=>{
                if(updatePlaceError){
                    console.log(updatePlaceError)
                }
                // if(isLoading === true){
                    if(!token || updatePlaceError){
                        alert(JSON.stringify(values, null, 2));
                        console.log(updatePlaceError)
                    }else{
                        // alert(JSON.stringify(values, null, 2));
                        updatePlaceRequest({id: placeId, ...values})
                        resetForm()
                        setSubmitting(false)  
                    }
                // }
                // alert(JSON.stringify(values, null, 2));
            }, 2000)
        }
    })
    useEffect(()=>{
        console.log(placeIsLoading)
        console.log(placeError)
        if(place && place !== null){
            formik.setValues({
                placename: place.title,
                address: place.address,
                description: place.description
            })
        }
    }, [place])
    useEffect(()=>{
        placeByPlaceIdRequest({id: placeId})
    }, [updatedPlace])
    function cancelHandler(){
        console.log("Cancelled")
        history.goBack()
    }
    return (<div>
        <h3>Edit Place</h3>
        {placeError && <Container>
            <Row><Col><h3>{placeError}</h3></Col></Row>
            </Container>}
        {placeIsLoading && <Container>
            <Row><Col><h3>{placeIsLoading}</h3></Col></Row>
            </Container>}
        {(place && place !== null && place.creator === authctx.userId) && <Form onSubmit={(e)=>{
            e.preventDefault();
            setToggle(true);
        }} formClassName="form-inline form-control-plaintext" 
        onCancel={cancelHandler} submitting={submitting}
        header="Edit Place Details">
            <Modal show={toggle} onHide={()=>{setToggle(false)}} backdrop="static">
                <Modal.Header closeButton><Modal.Title>Place Change Warning</Modal.Title></Modal.Header>
                <Modal.Body>
                    <h4>Do you want to coutinue updating place?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{setToggle(false)}}>No</Button>
                    <Button onClick={()=>{
                console.log("Hello")
                setSubmitting(true);
                        setToggle(false)
                        formik.submitForm()
                    }}>Yes</Button>
                </Modal.Footer>
            </Modal>
            <ul className="list-group">
                <FormGroup className= "list-group-item border-0 col-md-6" id="placename"
                name="placename" controlId="placename" type="text" placeholder="Enter Place name"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.placename}
                touched={formik.touched.placename} error={formik.errors.placename}>
                </FormGroup>
                <FormGroup className= "list-group-item border-0" id="address" name="address"
                controlId="address" type="text" placeholder="Address" onChange={formik.handleChange}
                onBlur={formik.handleBlur}   value={formik.values.address}
                touched={formik.touched.address} error={formik.errors.address}>
                </FormGroup>
            </ul>
            <ul className="list-group list-group-horizontal row-cols-md-1">
                <FormGroup className= "list-group-item border-0" id="description" name="description" 
                controlId="description" as="textarea" placeholder="Description (Optional)" 
                onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.description}
                touched={formik.values.description} error={formik.errors.description} rows={4} >
                </FormGroup>
            </ul>
        </Form>}
        {(place && place !== null && place.creator !== authctx.userId) && <Row>
            <Col>
            <h3>You are not allowed to edit this place.</h3>
            </Col>
            </Row>}
    </div>
    )
}
=======
import React, { useContext, useEffect, useRef, useState } from "react";
import FormGroup from "../../shared/components/FormElements/FormGroup";
import Form from "../../shared/components/FormElements/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { DUMMY_PLACES } from "./UserPlaces";
import UseHttp from "../../shared/hooks/use-http";
import { getPlaceByPlaceId, updatePlace } from "../../shared/libs/api";
import { AuthContext } from "../../shared/context/auth-context";

function EditPlace(props){
    const placeId=useParams().pid;
    // const place=DUMMY_PLACES.find((place)=>{return place.id === placeId})
    const {updateIsLoading, updatePlaceError, data: updatedPlace, sendRequest:updatePlaceRequest}=UseHttp(updatePlace)
    const {placeIsLoading, placeError, data: place, sendRequest:placeByPlaceIdRequest}=UseHttp(getPlaceByPlaceId)
    const [submitting, setSubmitting]=useState()
    const [toggle, setToggle]=useState(false)
    const history=useHistory();
    const authctx=useContext(AuthContext)
    const token=authctx.token
    useEffect(()=>{
        placeByPlaceIdRequest({id: placeId})
    }, [])
    const formik=useFormik({
        initialValues:{
            placename: '',
            address: '',
            description: '',
        },
        validationSchema:Yup.object({
            placename: Yup.string().required("Please enter the place name"),
            address: Yup.string().required("Please enter the address"),
            description: Yup.string()
        }),
        onSubmit:(values, {resetForm})=>{
            setSubmitting(true)
            console.log(place)
            setTimeout(()=>{
                if(updatePlaceError){
                    console.log(updatePlaceError)
                }
                // if(isLoading === true){
                    if(!token || updatePlaceError){
                        alert(JSON.stringify(values, null, 2));
                        console.log(updatePlaceError)
                    }else{
                        // alert(JSON.stringify(values, null, 2));
                        updatePlaceRequest({id: placeId, ...values})
                        resetForm()
                        setSubmitting(false)  
                    }
                // }
                // alert(JSON.stringify(values, null, 2));
            }, 2000)
        }
    })
    useEffect(()=>{
        console.log(placeIsLoading)
        console.log(placeError)
        if(place && place !== null){
            formik.setValues({
                placename: place.title,
                address: place.address,
                description: place.description
            })
        }
    }, [place])
    useEffect(()=>{
        placeByPlaceIdRequest({id: placeId})
    }, [updatedPlace])
    function cancelHandler(){
        console.log("Cancelled")
        history.goBack()
    }
    return (<div>
        <h3>Edit Place</h3>
        {placeError && <Container>
            <Row><Col><h3>{placeError}</h3></Col></Row>
            </Container>}
        {placeIsLoading && <Container>
            <Row><Col><h3>{placeIsLoading}</h3></Col></Row>
            </Container>}
        {(place && place !== null && place.creator === authctx.userId) && <Form onSubmit={(e)=>{
            e.preventDefault();
            setToggle(true);
        }} formClassName="form-inline form-control-plaintext" 
        onCancel={cancelHandler} submitting={submitting}
        header="Edit Place Details">
            <Modal show={toggle} onHide={()=>{setToggle(false)}} backdrop="static">
                <Modal.Header closeButton><Modal.Title>Place Change Warning</Modal.Title></Modal.Header>
                <Modal.Body>
                    <h4>Do you want to coutinue updating place?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{setToggle(false)}}>No</Button>
                    <Button onClick={()=>{
                console.log("Hello")
                setSubmitting(true);
                        setToggle(false)
                        formik.submitForm()
                    }}>Yes</Button>
                </Modal.Footer>
            </Modal>
            <ul className="list-group">
                <FormGroup className= "list-group-item border-0 col-md-6" id="placename"
                name="placename" controlId="placename" type="text" placeholder="Enter Place name"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.placename}
                touched={formik.touched.placename} error={formik.errors.placename}>
                </FormGroup>
                <FormGroup className= "list-group-item border-0" id="address" name="address"
                controlId="address" type="text" placeholder="Address" onChange={formik.handleChange}
                onBlur={formik.handleBlur}   value={formik.values.address}
                touched={formik.touched.address} error={formik.errors.address}>
                </FormGroup>
            </ul>
            <ul className="list-group list-group-horizontal row-cols-md-1">
                <FormGroup className= "list-group-item border-0" id="description" name="description" 
                controlId="description" as="textarea" placeholder="Description (Optional)" 
                onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.description}
                touched={formik.values.description} error={formik.errors.description} rows={4} >
                </FormGroup>
            </ul>
        </Form>}
        {(place && place !== null && place.creator !== authctx.userId) && <Row>
            <Col>
            <h3>You are not allowed to edit this place.</h3>
            </Col>
            </Row>}
    </div>
    )
}
>>>>>>> b2d305ed7b17da04bc48e631d42f0e92ca8594f6
export default EditPlace