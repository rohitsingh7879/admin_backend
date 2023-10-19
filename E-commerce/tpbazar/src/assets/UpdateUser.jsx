import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './User.css'


export default function UpdateUser(props) {
    // console.log(props.userUid)
    const [values, setvalues] = useState({
        uid: '',
        name: '',
        email: '',
        password: "",
        mobile: "",
        aadhar: '',
        dob: '',
        doj: '',
        qualification: '',
        address: '',
        state: '',
        city: '',
        pin: '',
        photo: null,
        status: '',

    })
    // console.log(values)
    const navigate = useNavigate()
    const handelSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
          //form data name and value
        formData.append("name", values.name);//form data name and value
        formData.append('email', values.email)
        formData.append('password', values.password)
        formData.append('mobile', values.mobile)
        formData.append('aadhar', values.aadhar)
        formData.append('dob', values.dob)
        formData.append('doj', values.doj)
        formData.append('qualification', values.qualification)
        formData.append('address', values.address)
        formData.append('state', values.state)
        formData.append('city', values.city)
        formData.append('pin', values.pin)
        formData.append('photo', values.photo)
        // formData.append('status', values.status)

        axios.put(`http://localhost:4055/api/admin/user/user_update/${props.userUid}`,formData)
            .then(result => {
                // console.log(res)
                if (result.data.affectedRows == 1) {
                    alert("User Details Updated Successfully")
                    navigate('/user')
                }
                else {
                    alert("User Details Updatedion failed")
                }
            })
            .then(err => console.log(err))

    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            className='modalheight'
            //   centered
            style={{ height: "100vh" }}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update User Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='' style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
                       >
                <div className='row' >
                    <div className="mb-3 col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">User ID</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={props.userUid} />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Name</label>
                        <input type="text" onChange={(e) => setvalues({ ...values, name: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="Enter user name" />
                    </div>
                </div>
                <div className="row">

                    <div className="mb-3 col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Email address</label>
                        <input type="email" onChange={(e) => setvalues({ ...values, email: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>

                    <div className="mb-3  col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Password</label>
                        <input type="number" onChange={(e) => setvalues({ ...values, password: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="Enter user password" />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3  col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Enter user Mobile Number</label>
                        <input type="number" onChange={(e) => setvalues({ ...values, mobile: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="Enter user monile number" />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Aadhar Number</label>
                        <input type="email" onChange={(e) => setvalues({ ...values, aadhar: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="Enter user aadhar no." />
                    </div>

                </div>
                <div className="row">
                    <div className="mb-3  col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">DOB</label>
                        <input type="date" onChange={(e) => setvalues({ ...values, dob: e.target.value })} className="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">DOJ</label>
                        <input type="date" onChange={(e) => setvalues({ ...values, doj: e.target.value })} className="form-control" id="exampleFormControlInput1" />
                    </div>

                </div>
                <div className="row">
                    <div className="mb-3  col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Qualification</label>
                        <input type="text" onChange={(e) => setvalues({ ...values, qualification: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="Enter user qualification" />
                    </div>
                    <div className="mb-3  col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Address</label>
                        <input type="text" onChange={(e) => setvalues({ ...values, address: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="Enter user address" />
                    </div>

                </div>
                <div className="row">
                    <div className="mb-3  col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">state</label>
                        <input type="text" onChange={(e) => setvalues({ ...values, state: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="Enter user state" />
                    </div>
                    <div className="mb-3  col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">City</label>
                        <input type="text" onChange={(e) => setvalues({ ...values, city: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="Enter user city" />
                    </div>

                </div>
                <div className="row">
                    <div className="mb-3  col">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Pin</label>
                        <input type="text" onChange={(e) => setvalues({ ...values, pin: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="Enter user pin" />
                    </div>
                    <div className="mb-3 col ">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Photo</label>
                        <input type="file" onChange={(e) => setvalues({ ...values, photo: e.target.files[0] })} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                </div>

            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <button type="button" onClick={handelSubmit} className="btn btn-primary">Update</button>
            </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
}
