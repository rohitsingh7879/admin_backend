import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function Role() {
    const [data, setData] = useState([])
    const [roleid, setroleId] = useState('')
    const [rolename, setroleName] = useState('')
    const handelSave = () => {
        axios.post('http://localhost:4055/api/admin/role/addrole', { roleid, rolename })
            .then(result => {
                if (result.status == 200) {
                    alert("Role Added Successfully")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        axios.get('http://localhost:4055/api/admin/role/viewrole')
            .then(result => {
                setData(result.data)
                // console.log(result.data)

            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div class="card mx-5 mt-5" style={{ width: '30rem' ,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <h3 className='text-center mt-2'>Add Role</h3>
                <div class="card-body justify-content-center">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Role ID</label>
                        <input type="email" class="form-control" onChange={(e) => setroleId(e.target.value)} id="exampleFormControlInput1" placeholder="Enter Role Id" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Role Name</label>
                        <input type="email" class="form-control" onChange={(e) => setroleName(e.target.value)} id="exampleFormControlInput1" placeholder="Enter Role Name" />
                    </div>
                    <button type="button" onClick={handelSave} class="btn col-12 btn-outline-success">Save</button>
                </div>
            </div>
            {/* <div class="card mx-5 mt-5" style={{ width: '20rem' }}>
                <h3 className='text-center mt-2'>Assign Role</h3>
                <div class="card-body justify-content-center">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Role ID</label>
                        <input type="email" class="form-control" onChange={(e) => setroleId(e.target.value)} id="exampleFormControlInput1" placeholder="Enter user Id" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Role Name</label>
                        <input type="email" class="form-control" onChange={(e) => setroleName(e.target.value)} id="exampleFormControlInput1" placeholder="Enter Role Id" />
                    </div>
                    <button type="button" onClick={handelSave} class="btn col-12 btn-outline-success">Save</button>
                </div>
            </div> */}
            <div className='mx-5 mt-5 border rounded' style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <h3 className='mt-2 text-center'>All RoleList</h3>
                <table class="table table-hover border m-3 " style={{ width: '30rem' }}>
                    <thead >
                        <tr className=' table-dark bg-blackbg-gradient'>

                            <th scope="col">sr no.</th>
                            <th scope="col">Role Id</th>
                            <th scope="col">Role Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                return (<><tr key={index}>

                                    <th >{index + 1}</th>
                                    <td>{item.roleid}</td>
                                    <td>{item.rolename}</td>

                                </tr>
                                </>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
