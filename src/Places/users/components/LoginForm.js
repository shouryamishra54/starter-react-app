import { useContext, useEffect, useRef, useState } from "react"
import * as Yup from "yup";
import SignUpForm from "./SignUpForm";
import classes from "../../shared/styles/Form.module.css";
import UseHttp from "../../shared/hooks/use-http";
import { signIn } from "../../shared/libs/api";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import { useFormik } from "formik";

function LoginForm(){
    const authctx=useContext(AuthContext)
    const emailInputRef=useRef()
    const passwordInputRef=useRef()
    // const dispatch=useDispatch()
    const {isLoading, error, data: loggedInUser, sendRequest:signInRequest}=UseHttp(signIn)
    //const [isLoading, setIsLoading]=useState()
    const history=useHistory();
    const [isLogin, setIsLogin]=useState(true);
    const formik=useFormik({initialValues: {
        email:'',
        password:''
        },
        validationSchema: Yup.object({
            email:Yup.string().required("Email is required").email("Please enter a valid email"),
            password:Yup.string().required("Password is required")
        }),
        onSubmit:(values)=>{
            setTimeout(()=>{
                console.log("Shourya")
                signInRequest({
                    email:emailInputRef.current.value.trim(),
                    password:passwordInputRef.current.value.trim()
                })
                reset()
            }, 1000)
        }
    })
    function switchAuthModeHandler(){
        setIsLogin(false)
    }
    function reset(){
        emailInputRef.current.value="";
        passwordInputRef.current.value=""
    }
    function submitLoginHandler(e){
        e.preventDefault();
        if(e.target.value.trim().length>0 && e.target.value.trim().length>0){
            signInRequest({
                email:emailInputRef.current.value.trim(),
                password:passwordInputRef.current.value.trim()
            })
        }
    }
    useEffect(()=>{
        setTimeout(()=>{
            if(loggedInUser && loggedInUser.userData && loggedInUser.userData.token && loggedInUser.userData.userId){
                authctx.login(loggedInUser.userData.token, loggedInUser.userData.userId)
                console.log(authctx.isLoggedIn)
                // dispatch({type:"loginUser", action:authctx.userId})
                history.push("/")
            }
        }, 500)
    }, [loggedInUser])
    console.log(error)
    return (
        <div>
            {isLogin && <section className={classes.auth}>
                <h2>{isLogin ? "Login":"Sign Up"}</h2><br/><br/>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className={classes.control}>
                        <Form.Label htmlFor="email">Email: </Form.Label>
                        <Form.Control type="email" id="email" name="email" ref={emailInputRef} 
                        onChange={formik.handleChange} onblur={formik.handleBlur} value={formik.values.email}
                        isInvalid={formik.touched.email && formik.errors.email ? true : false}/>
                        <Form.Control.Feedback type={'invalid'}>{formik.errors.email}</Form.Control.Feedback>
                    </Form.Group><br/>
                    <Form.Group className={classes.control}>
                        <Form.Label htmlFor="password">Password: </Form.Label>
                        <Form.Control type="password" id="password" name="password" ref={passwordInputRef} 
                        onChange={formik.handleChange} onblur={formik.handleBlur} value={formik.values.password}
                        isInvalid={formik.touched.password && formik.errors.password ? true : false}/>
                        <Form.Control.Feedback type={'invalid'}>{formik.errors.password}</Form.Control.Feedback>
                    </Form.Group><br/>
                    <div className={classes.actions}>
                    {!isLoading && (
                        <Button type="submit"><strong>Login</strong></Button>
                    )}
                    {isLoading && <p>Sending request...</p>}
                    <Button type={'button'} className={classes.toggle} onClick={switchAuthModeHandler}>
                        Create new account
                    </Button>
                    </div>
                </Form>  
            </section>}
            {!isLogin && <SignUpForm></SignUpForm>}
        </div>
    )
}
export default LoginForm