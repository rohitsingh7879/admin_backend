import React from 'react';
import { Button, Table, Col, Row, Form, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import './User.css'
import Sidebar from '../Sidebar'
import ViewAssignedRole from './ViewAssignRole'
import UpdateUser from './UpdateUser'
import ViewUser from './ViewUser'
function User() {
    const [updatemodalShow, setupdateModalShow] = React.useState(false)
    const [data, setData] = useState([])
    const [role, setroleData] = useState([])
    const [roleid, setroleidData] = useState([])
    const [search, setSearch] = useState('')
    const [modalShow, setModalShow] = React.useState(false);
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

    const [assignedrole, setassignedroleData] = useState([])
    const [name, setName] = useState([])

    const [userUid, setuserUid] = useState()
    const [uidforrevokrole, setuidforrevokrole] = useState()

    const handelViewRole = (uid) => {
        setuidforrevokrole(uid)
        // setUid(uid)
        // useEffect(() => {
        // console.log(uid)
        axios.get(`http://localhost:4055/api/admin/assignedrole/${uid}`)
            .then(result => {
                // console.log(result)
                setassignedroleData(result.data)

            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`http://localhost:4055/api/admin/user/finduser/${uid}`)
            .then(result => {

                result.data.map(data => {
                    // console.log(data.name)

                    setName(data.name)
                })
            }
            )
            .catch(err => console.log(err))

        setModalShow(true)
    };
    // assignedrole.map((data) => {
    //     console.log(data)
    // })
    // console.log(assignedrole)
    
    const [status, setstatus] = useState("")
    const [uid, setUid] = useState(null); // Initialize uid state

    const switchClick = (uid) => {
        setUid(uid)
        axios.get(`http://localhost:4055/api/admin/user/finduser/${uid}`)
            .then(result => {
                result.data.map(data => {
                    if (data.status == 'deactive') {
                        setstatus("active")
                        
                        
                    } else {
                        setstatus("deactive")
                       
                    }
                })
            }
            )
            .catch(err => console.log(err))

            console.log(status)
    }
    useEffect(() => {
        if (status && uid !== null) {
            axios.put(`http://localhost:4055/api/admin/user/status_update/${uid}`, { status })
                .then(result => {
                    if (result.data.affectedRows === 1) {
                        // Handle successful update
                        userList()
                    } else {
                        // Handle unsuccessful update
                    }
                })
                .catch(err => {
                    // Handle errors
                });
        }
    }, [status, uid]);


    const handelUpdateUser = (uid) => {
        setuserUid(uid)
        setupdateModalShow(true)
    }
    // const navigate = useNavigate()
    // const handelSubmit = (e) => {
    //     e.preventDefault()
    //     const formData = new FormData();
    //     formData.append('uid', values.uid);  //form data name and value
    //     formData.append("name", values.name);//form data name and value
    //     formData.append('email', values.email)
    //     formData.append('password', values.password)
    //     formData.append('mobile', values.mobile)
    //     formData.append('aadhar', values.aadhar)
    //     formData.append('dob', values.dob)
    //     formData.append('doj', values.doj)
    //     formData.append('qualification', values.qualification)
    //     formData.append('address', values.address)
    //     formData.append('state', values.state)
    //     formData.append('city', values.city)
    //     formData.append('pin', values.pin)
    //     formData.append('photo', values.photo)
    //     formData.append('status', values.status)

    //     // console.log(values)
    //     axios.post('http://localhost:4055/api/admin/user/user_register', formData)
    //         .then(result => {
    //             // res.json(result)
    //             console.log(result)
    //             if (result.data.affectedRows == 1) {
    //                 navigate('/user')
    //             }

    //         })
    //         .catch(err => {
    //             // res.json(err0)
    //             console.log(err)
    //         })
    // }

    const data2 = (event) => {
        setSearch(event.target.value)
    }
        const userList=()=>{
            axios.get('http://localhost:4055/api/admin/user/user_list')
            .then(result => setData(result.data))
            .catch(err => console.log(err))
        }
        userList()

    useEffect(() => {
        axios.get('http://localhost:4055/api/admin/role/viewrole')
            .then(result => {
                setroleData(result.data)
                // console.log(result.data)

            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    // console.log(roleid)

    const handelAssign = (uid, roleid) => {
        // console.log(uid,roleid)
        axios.post('http://localhost:4055/api/admin/assignrole', { uid, roleid })
            .then(result => {
                if (result.data.affectedRows == 1) {
                    alert("Assigned Role successfully")

                } else {
                    alert("Failed To Assign Role")
                }
            })
            .catch(err => {
                alert(err)
            })

    }
    return (
        <>

            {/* <Sidebar/> */}
            <div className='container' style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <div className="pt-4  mb-4 row">
                    <div className="col">
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" onChange={data2} type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col">
                        <Link to='/adduser'>
                            <button class="btn btn-success" type="submit">+ Add User</button>
                        </Link>
                    </div>
                </div>
                <h2 className='d-flex justify-content-center'>List of All Users</h2>
                <div className='table-scroll '>


                    <Table striped bordered hover className="table-responsive">
                        <thead className=''>
                            <tr className='bg-dark table-dark bg-blackbg-gradient'>
                                <th className=''>Sr No.</th>
                                <th className='thead-sticky'>uid</th>
                                <th className='thead-sticky'>Name</th>
                                <th className='thead-sticky'>Email</th>
                                <th>Mobile</th>
                                <th>Photo</th>
                                <th>Adhar Card</th>
                                <th>DOB</th>
                                <th>DOJ</th>
                                <th>Qualification</th>
                                <th>Address</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Pin</th> 
                                <th>Status</th>
                                <th>View Role</th>
                                <th>Assign Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.filter((item) => {
                                return search.toLowerCase() === '' ? item : item.uid.toString().toLowerCase().includes(search) || item.name.toLowerCase().includes(search) || item.aadhar.toString().toLowerCase().includes(search) || item.email.toLowerCase().includes(search) || item.mobile.toString().toLowerCase().includes(search) || item.status.toLowerCase().includes(search) || item.address.toLowerCase().includes(search)
                            }).map((user, index) => {
                                return (// <h3>{user}</h3>
                                    <tr key={index}>
                                        <td className=''>{index+1}</td>
                                        <td className='thead-sticky '>{user.uid}</td>
                                        <td className='thead-sticky'>{user.name}</td>
                                        <td className='thead-sticky'>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td><img src={user.photo} alt="" className='' style={{ height: "50px", width: "50px", borderRadius: "40%" }} /></td>
                                        <td>{user.aadhar}</td>
                                        <td>{user.dob}</td>
                                        <td>{user.doj}</td>
                                        <td>{user.qualification}</td>
                                        <td>{user.address}</td>
                                        <td>{user.state}</td>
                                        <td>{user.city}</td>
                                        <td>{user.pin}</td>
                                        <td>
                                            <div class="form-check form-switch">
                                                <input className={`form-check-input ${user.status === 'active' ? 'active-checkbox' : 'inactive-checkbox'}`} type="checkbox" onChange={() => switchClick(user.uid)} role="switch" id='flexSwitchCheckChecked' checked={user.status === 'active'}/>
                                                <label className="form-check-label" for="flexSwitchCheckChecked">{user.status}</label>
                                            </div>
                                        </td>
                                        <td><>
                                            <Button variant="primary" onClick={() => handelViewRole(user.uid)}>
                                                View Role
                                            </Button>

                                            <ViewAssignedRole
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                                data={assignedrole}
                                                name={name}
                                                uid={uidforrevokrole}
                                            />
                                        </></td>
                                        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal-${user.uid}`}>
                                            Assign Role
                                        </button>
                                            {/* <td><button type="button" onClick={() => handelUpdate(item.offerid)} class="btn btn-outline-success">Update</button>
                                        </td> */}
                                            <div class="modal fade" id={`exampleModal-${user.uid}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Assign Role</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div class="mb-3">
                                                                <label for="exampleFormControlInput1" class="form-label">user Id</label>
                                                                <input type="text" class="form-control" id="exampleFormControlInput1" disabled value={user.uid} />
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="exampleFormControlInput1" class="form-label">User Name</label>
                                                                <input type="text" class="form-control" id="exampleFormControlInput1" disabled value={user.name} />
                                                            </div>
                                                            <select class="form-select mb-3" aria-label="Default select example" onChange={e => setroleidData(e.target.value)}>
                                                                <option selected>Select Role Here</option>
                                                                {role.map((item,) => {
                                                                    return (
                                                                        <>
                                                                            <option value={item.roleid}>{item.rolename}</option>
                                                                        </>

                                                                    )
                                                                })}

                                                            </select>

                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                {/* {item.roleid} */}
                                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handelAssign(user.uid, roleid)}>Assign Role</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success " id="dropdown-basic">
                                                    &#8942;
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className='list-group'>
                                                    <>
                                                        <li className="dropdown-item" onClick={() => handelUpdateUser(user.uid)}>
                                                            Update
                                                        </li>

                                                        <UpdateUser
                                                            show={updatemodalShow}
                                                            onHide={() => setupdateModalShow(false)}
                                                            userUid={userUid}
                                                        />
                                                    </>
                                                    <Link to={`/viewuser/${user.uid}`} style={{listStyle:"none",textDecoration:"none"}}>
                                                    <li className="dropdown-item  " >
                                                        View
                                                    </li>
                                                    </Link>
                                                    

                                                    {/* <li><Link className="dropdown-item" to="/delete">Delete</Link></li> */}
                                                </Dropdown.Menu>
                                                {/* <!-- Modal --> */}
                                                <div className="modal fade" id='#exampleModal2' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                {/* <h1 className="modal-title fs-5" id="exampleModalLabel"></h1> */}
                                                                <h3 className='mt-2 text-center'>Update User Details </h3>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className=" container border rounded border-grey">
                                                                <div className='m-5 row'>
                                                                    <div className="mb-3 col">
                                                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">User ID</label>
                                                                        <input type="text" onChange={(e) => setvalues({ ...values, uid: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="Enter user id" />
                                                                    </div>
                                                                    <div className="mb-3 col">
                                                                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Name</label>
                                                                        <input type="text" onChange={(e) => setvalues({ ...values, name: e.target.value })} className="form-control" id="exampleFormControlInput1" placeholder="Enter user name" />
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
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </Dropdown>
                                        </td>
                                    </tr>
                                )
                            })

                            }
                        </tbody >
                    </Table >
                </div>
            </div >
        </>
    )
}

export default User;

