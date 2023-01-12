import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Card, Container } from "react-bootstrap";
import FormGroup from "../../shared/components/FormElements/FormGroup";
import Form from "../../shared/components/FormElements/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import UseHttp from "../../shared/hooks/use-http";
import { addNewPlace } from "../../shared/libs/api";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NewPlace(props){
    const [submitting, setSubmitting]=useState()
    const history=useHistory()
    const {isLoading, error, data, sendRequest:newPlaceRequest}=UseHttp(addNewPlace)
    const authctx=useContext(AuthContext)
    const token=authctx.token
    function reset(){
        console.log("Hello")
        formik.resetForm()
    }
    const formik=useFormik({
        initialValues:{
            placename: '',
            description: '',
            address: '',
            pincode: '',
            cityname: '',
            statename: '',
            country: ''
        },
        validationSchema:Yup.object({
            placename: Yup.string().required("Please enter the place name"),
            description: Yup.string(),
            address: Yup.string().required("Please enter the address"),
            pincode: Yup.string(),
            city: Yup.string(),
            state: Yup.string(),
            country: Yup.string()
        }),
        onSubmit:(values, {resetForm})=>{
            setSubmitting(true)
            setTimeout(()=>{
                if(error){
                    console.log(error)
                }
                // if(isLoading === true){
                    if(!token || error){
                        console.log(error)
                    }else{
                        newPlaceRequest({...values, creator: authctx.userId})
                        resetForm()
                        setSubmitting(false)  
                    }
                // }
                // alert(JSON.stringify(values, null, 2));
            }, 2000)
        }
    })
    useEffect(()=>{
        /*if(isLoading === true && (!error || error === null || error === undefined)){
            history.push("/places")
        }*/
        console.log(data)
        if(data && data.newPlace && data.newPlace.title)
        {
            history.push("/places")
        }
        console.log(error)
    }, [data])
    useEffect(()=>{
        console.log(error)
    }, [isLoading, error])
    function submitHandler(e){
        e.preventDefault();
        console.log("Submitted")
    }
    function cancelHandler(){
        console.log("Cancelled")
    }
    // return (<Form></Form>)
    return (
            <Form onSubmit={formik.handleSubmit} formClassName="form-inline form-control-plaintext" 
            onCancel={cancelHandler} submitting={submitting}
            header="New Place Form">
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
                <ul className="list-group">
                    <FormGroup className="list-group-item border-0" id="description" name="description"
                    controlId="description" as="textarea" placeholder="Describe this place"
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description}
                    touched={formik.touched.description} error={formik.errors.description} rows={4} />
                </ul>
                <ul className="list-group list-group-horizontal row-cols-md-2">
                    <FormGroup className= "list-group-item border-0" id="pincode" name="pincode" 
                    controlId="pincode" type="number" placeholder="Pincode" onChange={formik.handleChange}
                    onBlur={formik.handleBlur}   value={formik.values.pincode}
                    touched={formik.values.pincode} error={formik.errors.pincode}>
                    </FormGroup>
                    <FormGroup className= "list-group-item border-0" id="cityname" name="cityname" 
                    controlId="cityname" type="text" placeholder="City" onChange={formik.handleChange}
                    onBlur={formik.handleBlur}   value={formik.values.cityname}
                    touched={formik.values.cityname} error={formik.errors.cityname}>
                    </FormGroup>
                </ul>
                <ul className="list-group list-group-horizontal row-cols-md-2">
                    <FormGroup className="list-group-item border-0" id="statename" name="statename" 
                    controlId="statename" type="text" placeholder="State" onChange={formik.handleChange}
                    onBlur={formik.handleBlur}   value={formik.values.statename}
                    touched={formik.values.statename} error={formik.errors.statename}>
                    </FormGroup>
                    <FormGroup className="list-group-item border-0" id="country" name="country" 
                    controlId="country" type="text" placeholder="Country" onChange={formik.handleChange}
                    onBlur={formik.handleBlur}   value={formik.values.country}
                    touched={formik.values.country} error={formik.errors.country}>
                    </FormGroup>
                </ul>
            </Form> 
        )
}
export default NewPlace;