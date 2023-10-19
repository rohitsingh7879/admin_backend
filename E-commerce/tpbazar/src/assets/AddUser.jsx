import { useState, } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddUser() {
    // const [status, setStatus] = useState('active'); // Initial value is "active"
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



    const handleStatusChange = (event) => {
        const selectedValue = event.target.files[0];
        setvalues({ ...values, photo: selectedValue });
    };


    const navigate = useNavigate()
    const handelSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('uid', values.uid);  //form data name and value
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
        formData.append('status', values.status)
        // console.log(values)
        axios.post('http://localhost:4055/api/admin/user/user_register', formData)
            .then(result => {
                // res.json(result)
                console.log(result)
                if (result.data.affectedRows == 1) {
                    alert("User Added Successfully")
                    navigate('/user')
                    
                }

            })
            .catch(err => {
                // res.json(err0)
                console.log(err)
            })
    }

    return (
        <div className='container'>

            <div className=" container border rounded border-grey">
                <h3 className='mt-2 text-center'>Register User </h3>
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
                    {/* <div className="row">

                        <div className="mb-3 col">
                            <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Status</label>
                            <select className="form-select" aria-label="Default select example" onChange={handleStatusChange} value={values.status}>
                                <option selected>Select your status here</option>
                                <option value="active" >Active</option>
                                <option value="inactive" >InActive</option>
                            </select>
                        </div>

                    </div> */}

                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="button" onClick={handelSubmit}>Button</button>
                        {/* <button className="btn btn-primary" type="button">Button</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

