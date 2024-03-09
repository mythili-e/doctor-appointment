import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from "axios";

const Add=()=>{
    const [ inputs, setInputs ] = useState({});
    const [userErr, setUserErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    // const [validNumberErr, setValidNumberErr] = useState([false]);
    const validUserName = new RegExp(/^[a-zA-Z]+([a-zA-Z](_|-| )[a-zA-Z])*[a-zA-Z]+$/);
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

    const handleChange=(event)=>{
        const name= event.target.name;
        const value=event.target.value;    
        setInputs(values =>({...values, [name] : value }))
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        if(!validUserName.test(inputs.name)){
            setUserErr(true);
            return;
        }
        if(!validEmail.test(inputs.email)){
            setEmailErr(true);
            return;
        }

        axios.post("https://jsonplaceholder.typicode.com/posts",inputs)
        .then((res)=>{
            alert(res);
        })
        .catch((err)=>{
            alert(err);
        })
    }
    return(        
        <>
        <h1>Patient Registration Form</h1>
        <Form onSubmit={handleSubmit} className="formStyle">
            <Form.Group className="mb-3">
                <Form.Label>Patient Name:</Form.Label>
                <Form.Control  type="Name" name="name" placeholder="Patient Name" onChange={handleChange}/>  
                {userErr && <span style={{color: "red"}}>please enter only character</span>} 
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Gender:</Form.Label>
                <Form.Check inline type="radio" name="gender" id="radio1" custom checked label="Male" />
                <Form.Check inline type="radio" name="gender" id="radio2" custom label="Female" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" name="email" placeholder="Enter Email" onChange={handleChange} />
                {emailErr && <span style={{color: "red"}}>please enter correct email</span>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Contact Number:</Form.Label>
                <Form.Control type="text" name="contact" placeholder="Contact Number" onChange={handleChange} />
                {/* {validContactNumberErr && <span style={{color: "red"}}>please enter only integer</span>} */}
            </Form.Group>
            <div className='buttonStyle'>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </div>
        </Form>
        </>
    );
}
export default Add; 