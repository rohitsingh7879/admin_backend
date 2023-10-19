import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
// import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Category() {
    const [data, setData] = useState([])
    const [catid, setcatId] = useState('')
    const [catname, setcatName] = useState('')
    const handelSave = () => {
        axios.post('http://localhost:4055/api/admin/category/addcategory', { catid, catname })
            .then(result => {
                if (result.status == 200) {
                    alert("Category Added Successfully")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        axios.get('http://localhost:4055/api/admin/category/viewcategory')
            .then(result => {
                setData(result.data)
                // console.log(result.data)
               
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <>
        <div className="container d-flex mx-auto">
            <div class="card mx-5 mt-5" style={{ width: '30rem' ,boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <h3 className='text-center mt-2'>Add Categories</h3>
                <div class="card-body justify-content-center">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Category ID</label>
                        <input type="email" class="form-control" onChange={(e) => setcatId(e.target.value)} id="exampleFormControlInput1" placeholder="Enter Catgory Id" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Category Name</label>
                        <input type="email" class="form-control" onChange={(e) => setcatName(e.target.value)} id="exampleFormControlInput1" placeholder="Enter Catgory Name" />
                    </div>
                    <button type="button" onClick={handelSave} class="btn col-12 btn-outline-success">Save</button>
                </div>
            </div>

            <div className='mx-5 mt-5 border card' style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <h3 className='mt-2 text-center'>All Category List</h3>
                <table class="table table-hover border m-3 " style={{ width: '30rem' }}>
                    <thead >
                        <tr className=' table-dark bg-blackbg-gradient'>
                            
                            <th scope="col">sr no.</th>
                            <th scope="col">Category Id</th>
                            <th scope="col">Category Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                return (<><tr key={index}>

                                    <th >{index+1}</th>
                                    <td>{item.pCategoryId}</td>
                                    <td>{item.categoryname}</td>
                                    
                                </tr>
                                </>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
            </div>
        </>
    )
}

export default Category