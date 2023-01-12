<<<<<<< HEAD
import { Form } from "react-bootstrap";

function FormGroup(data){
    return (
        <li className={data.className} style={{"backgroundColor":"transparent"}}>
            <Form.Group  style={{"backgroundColor":"transparent"}}>
            <Form.Label htmlFor={data.id}></Form.Label>
            <Form.Control id={data.id} {...arguments} as={data.as} type={data.type} placeholder={data.placeholder} 
            onChange={data.onChange} onBlur={data.onBlur} value={data.value} onReset={data.onReset}
            isInvalid={data.touched && data.error ? true : false} rows={4} />
            <Form.Control.Feedback type={'invalid'}>{data.error}</Form.Control.Feedback>
            </Form.Group>
        </li>
    )
}
=======
import { Form } from "react-bootstrap";

function FormGroup(data){
    return (
        <li className={data.className} style={{"backgroundColor":"transparent"}}>
            <Form.Group  style={{"backgroundColor":"transparent"}}>
            <Form.Label htmlFor={data.id}></Form.Label>
            <Form.Control id={data.id} {...arguments} as={data.as} type={data.type} placeholder={data.placeholder} 
            onChange={data.onChange} onBlur={data.onBlur} value={data.value} onReset={data.onReset}
            isInvalid={data.touched && data.error ? true : false} rows={4} />
            <Form.Control.Feedback type={'invalid'}>{data.error}</Form.Control.Feedback>
            </Form.Group>
        </li>
    )
}
>>>>>>> b2d305ed7b17da04bc48e631d42f0e92ca8594f6
export default FormGroup