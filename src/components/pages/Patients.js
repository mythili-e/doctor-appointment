import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Patients=()=>{
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState([]);
    const [ inputs, setInputs ] = useState({});
    const [modalUpdate, setModalUpdate] =useState(false);
    console.log(editData,'editData');
    const getCustomersData = () => {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then(data => setData(data.data))
            .catch(error => alert("error:" +  error));
    };
    useEffect(() => {
        getCustomersData();
      }, []);

    const handleChange=(event)=>{
        const name= event.target.name;
        const value=event.target.value;    
        setInputs(values =>({...values, [name] : value }))
    }

    const editModal=(id)=>{
    const getURL = "https://jsonplaceholder.typicode.com/posts/" + id;
    axios
        .get(getURL)
        .then(response => setEditData(response.data))
        .catch(error => alert("error:" +  error));
    setModalUpdate(true);
    console.log(getURL);
    }
    const handleClose = () => setModalUpdate(false);

    const handleUpdate=(id)=>{
        console.log(inputs);
        axios.put("https://jsonplaceholder.typicode.com/posts/"+ id,inputs)
        .then((res) => {
            alert("success:"+ res )
        })
        .catch((err)=>{
            alert(err)
        })
    }

    //to delete patient entry
    const deletePatient = (id) => {
        axios.delete("https://jsonplaceholder.typicode.com/posts/" + id)
        .then((res)=>{
            alert('delete success');
        })
        .catch((err)=>{
            alert(err);
        })
    }     
    return(
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((d)=>{
                    return(
                        <tr>
                            <td>{d.id}</td>
                            <td>{d.userId}</td>
                            <td>{d.title}</td>
                            <td>{d.body}</td>
                            <td>
                                <i class="bi bi-pencil-square" onClick={()=>editModal(d.id)}></i>
                                <i class="bi bi-trash3-fill" onClick={()=>deletePatient(d.id)}></i>
                            </td>

                        </tr>
                    );
                })}               
            </tbody>
        </Table>
    
        <Modal show={modalUpdate} onHide={handleClose}>

        <Modal.Header closeButton>
            <Modal.Title>Edit Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Form.Group className="mb-3">

                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="enter your name"
                    autoFocus
                    value={editData && editData.id}
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    autoFocus
                    value={editData && editData.body}
                />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Check inline type="radio" name="gender" id="radio1" custom checked label="Male" />
                <Form.Check inline type="radio" name="gender" id="radio2" custom label="Female" />
                </Form.Group>
                
                <Form.Group
                className="mb-3">
                <Form.Label>Enter your Contact Number</Form.Label>
                <Form.Control type="contact"
                placeholder="Enter Number" value={editData && editData.title}/>                
                </Form.Group>
            </Form>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={()=>handleUpdate(editData.id)}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
export default Patients; 