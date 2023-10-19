import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './User.css'


export default function UpdateUser(props) {
    const { uid } = useParams()
    console.log(uid)
    const [viewUser, setviewUser] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4055/api/admin/user/finduser/${uid}`)
            .then(result => {
                console.log(result)
                setviewUser(result.data)
            }
            )
            .catch(err => console.log(err))
    }, [uid])
    return (
        <div >
            {
                viewUser.map((user) => {
                    return (
                        <div className='container border rounded m-4' 
                        style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
                        key={user._id}>

                            <div className=' d-flex my-3 justify-content-center '>
                                <img className="" src={user.photo} alt="" style={{ height: "200px", width: "200px", borderRadius: "50%",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  }} />
                            </div>
                            <div className='my-3'>

                                <div className='row' >
                                    <div className="mb-3 col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">User ID</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={user.uid} />
                                    </div>
                                    <div className="mb-3 col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Name</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={user.name} />
                                    </div>
                                </div>
                                <div className='row' >
                                    <div className="mb-3 col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Mobile No.</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={user.mobile} />
                                    </div>
                                    <div className="mb-3 col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Aadhar No.</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={user.aadhar} />
                                    </div>
                                </div>
                                <div className='row' >
                                    <div className="mb-3 col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Email</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={user.email} />
                                    </div>
                                    <div className="mb-3 col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Qualification</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={user.qualification} />
                                    </div>
                                </div>
                                <div className='row' >
                                    <div className="mb-3 col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">DOB</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={user.dob} />
                                    </div>
                                    <div className="mb-3 col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">DOJ</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={user.doj} />
                                    </div>
                                </div>
                                <div className='row' >
                                    <div className="mb-3 col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Address</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={user.address} />
                                    </div>
                                    <div className="mb-3 col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">State</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={user.state} />
                                    </div>
                                </div>
                                <div className='row' >
                                    <div className="mb-3 col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">City</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={user.city} />
                                    </div>
                                    <div className="mb-3 col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Pin</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" disabled placeholder={user.pin} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );

}
