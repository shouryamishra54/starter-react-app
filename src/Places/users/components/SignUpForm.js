import { useContext, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import classes from "../../shared/styles/Form.module.css";
import UseHttp from "../../shared/hooks/use-http";
import {signUp} from "../../shared/libs/api";
import { AuthContext } from "../../shared/context/auth-context";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Button, Figure, Form } from "react-bootstrap";

function SignUpForm(){
    const authctx=useContext(AuthContext)
    const firstnameInputRef=useRef();
    const lastnameInputRef=useRef();
    const usernameInputRef=useRef();
    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    const confirmPasswordInputRef=useRef();
    const history=useHistory();
    // const dispatch=useDispatch();
    const {isLoading, error, data: newUser, sendRequest:signUpRequest}=UseHttp(signUp)
    const [isLogin, setIsLogin]=useState(false);
    const [previewURL, setPreviewURL]=useState();
    const [file, setFile]=useState()
    const [fileObject, setFileObject]=useState();
    //const [isLoading, setIsLoading]=useState(false);
    const [passwordError, setPasswordError]=useState(false);
    const formik=useFormik({
        initialValues:{
            firstname: '',
            lastname: '',
            username: '',
            image: undefined,
            email: '',
            password: '',
            confirmpass: ''
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required("Firstname is required")
            .max(20, "Must not be greater than 20 characters"),
            lastname: Yup.string().required("Lastname is required")
            .max(30, "Must not be greater than 30 characters"),
            username: Yup.string().required("Username is required"),
            email: Yup.string().required("Email ID is required").email("Email is invalid"),
            password: Yup.string().required("Password is required").min(8, "Must be atleast 8 characters")
            .matches(/[0-9]/, "Must always contain a number")
            .matches(/[a-z]/, "Must always contain a lowercase alphabet")
            .matches(/[A-Z]/, "Must always contain an uppercase alphabel")
            .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, "Must always contain a special characters"),
            confirmpass: Yup.string().required("You must enter the password to confirm"),
        }),
        validate:(values)=>{
            let errors={}
            if(values.password !== values.confirmpass){
                errors="Must be same as the password"
            }
            return errors;
        },
        onSubmit:(values, {resetForm})=>{
            console.log("Shourya")
            setTimeout(()=>{
                console.log("Shourya")
                if(!isLogin){
                    // console.log(file)
                    // alert(JSON.stringify(values, null, 2));
                    signUpRequest({
                        firstname: values.firstname.trim(),
                        lastname: values.lastname.trim(),
                        username: values.username.trim(),
                        image: file,
                        email: values.email.trim(),
                        password: values.password.trim()
                    })
                    resetForm();
                }
            }, 1000)
        }
    })
    function switchAuthModeHandler(){
        setIsLogin(true)   
    }
    function validatePassword(){
        return passwordInputRef.current.value === confirmPasswordInputRef.current.value
    }
    function reset(){
        firstnameInputRef.current.value="";
        lastnameInputRef.current.value="";
        usernameInputRef.current.value="";
        emailInputRef.current.value="";
        passwordInputRef.current.value="";
        confirmPasswordInputRef.current.value="";
    }
    function submitSignUpHandler(e){
        e.preventDefault();
        if(!validatePassword()){
            setPasswordError(true)
            return
        }
        if(usernameInputRef.current.value.trim().length<=0){
            return
        }
        if(emailInputRef.current.value.trim().length<=0){
            return
        }if(!isLogin){
            signUpRequest({
                firstname: firstnameInputRef.current.value,
                lastname: lastnameInputRef.current.value,
                username: usernameInputRef.current.value,
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value
            })
            reset();
        }
    }
    useEffect(()=>{
        console.log(newUser)
        setTimeout(()=>{
            if(newUser && newUser.userData && newUser.userData.token && newUser.userData.userId){
                authctx.login(newUser.userData.token, newUser.userData.userId)
                console.log(newUser)
                // dispatch({type:"logoutUser"})
                history.push("/")
            }
        }, 500)
    }, [newUser])
    function addtoFiles(event){
        event.preventDefault();
        setFile(event.target.files[0])
    }
    useEffect(()=>{
        if(!file || file === null){
            return;
        }
        let fileObject=new Object()
        for(const a in file){
            fileObject[a]=file[a]
        }
        setFileObject(fileObject)
        // formik.setValues({...formik.values, image: file})
        const fileReader=new FileReader();
        fileReader.onload=()=>{
            setPreviewURL(fileReader.result);
        }
        fileReader.readAsDataURL(file)
    }, [file])
    // console.log(file)
    // console.log(formik.values.image)
    return (
        <div>
            {!isLogin && <section className={classes.auth}>
                <h2>{isLogin ? "Login":"Sign Up"}</h2>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="firstname">First Name</Form.Label>
                        <Form.Control id="firstname" name="firstname" placeholder="Enter the First Name" 
                        type={'text'} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.firstname} onTouchEnd={formik.handleBlur} firstnameInputRef
                        isInvalid={formik.touched.firstname && formik.errors.firstname ? true : false}/>
                        <Form.Control.Feedback type={'invalid'}>
                            {formik.errors.firstname}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="lastname">Last Name</Form.Label>
                        <Form.Control id="lastname" name="lastname" placeholder="Enter the Last Name" 
                        type={'text'} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.lastname} onTouchEnd={formik.handleBlur} lastnameInputRef
                        isInvalid={formik.touched.lastname && formik.errors.lastname ? true : false}/>
                        <Form.Control.Feedback type={'invalid'}>
                            {formik.errors.lastname}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="username">Last Name</Form.Label>
                        <Form.Control id="username" name="username" placeholder="Enter the Username" 
                        type={'text'} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.username} onTouchEnd={formik.handleBlur} usernameInputRef
                        isInvalid={formik.touched.username && formik.errors.username ? true : false}/>
                        <Form.Control.Feedback type={'invalid'}>
                            {formik.errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="emailid">Email</Form.Label>
                        <Form.Control id="emailid" name="email" placeholder="Enter the Email" 
                        type={'email'} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.email} onTouchEnd={formik.handleBlur} emailInputRef
                        isInvalid={formik.touched.email && formik.errors.email ? true : false}/>
                        <Form.Control.Feedback type={'invalid'}>
                            {formik.errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="userimage">Email</Form.Label>
                        <Form.Control id="userimage" name="userimage" placeholder="Upload image" 
                        type={'file'} accept={'.jpg,.png,jpeg'} multiple onChange={formik.handleChange && addtoFiles} 
                        value={formik.values.image} onTouchEnd={formik.handleBlur} onBlur={formik.handleBlur}
                        isInvalid={formik.touched.image && formik.errors.image ? true : false}/>
                        <Form.Control.Feedback type={'invalid'}>
                            {formik.errors.image}
                        </Form.Control.Feedback>
                        <div className="image-upload__preview"><br/>
                            {previewURL && <div><Figure.Image 
                                className="img-thumbnail" thumbnail={true}
                                width={200} height={200} 
                                src={previewURL} alt="Preview" >
                            </Figure.Image>
                            <Figure.Caption>{formik.values.image}</Figure.Caption>
                            </div>}
                            {!previewURL && <p>Please pick an image.</p>}
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control id="password" name="password" placeholder="Enter the Password" 
                        type={'password'} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.password} onTouchEnd={formik.handleBlur} passwordInputRef
                        isInvalid={formik.touched.password && formik.errors.password ? true : false}/>
                        <Form.Control.Feedback type={'invalid'}>
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="confirmpass">Confirm Password</Form.Label>
                        <Form.Control id="confirmpass" name="confirmpass" placeholder="Confirm Password" 
                        type={'password'} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.confirmpass} onTouchEnd={formik.handleBlur} confirmpassInputRef
                        isInvalid={formik.touched.confirmpass && formik.errors.confirmpass ? true : false}/>
                        <Form.Control.Feedback type={'invalid'}>
                            {formik.errors.confirmpass}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {passwordError && <p>Confirm Password is not equal to the earlier one.</p>}
                    <div className={classes.actions}>
                        {!isLoading && (
                            <Button type={'submit'}><strong>Sign Up</strong></Button>
                        )}
                        {isLoading && <p>Sending request...</p>}
                        <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
                            Login with an Existing Account
                        </button>
                    </div>                    
                </Form>    
            </section>}
            {isLogin && <LoginForm></LoginForm>}
        </div>)
}
export default SignUpForm