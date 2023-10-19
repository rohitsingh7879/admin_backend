import React from 'react';
import { Button, Form, Table } from 'react-bootstrap';
// import Sidebar from './Sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';


function AddSubcategory() {

    const [values, setValues] = useState({
        pCategoryId: '',
        subCategoryid: '',
        subCategoryname: '',
        photo: null
    })
    const [data, setData] = useState([])
    const [subdata, setsubData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4055/api/admin/category/viewcategory')
            .then(res => {
                // console.log(res)
                if (res.status === 200) {
                    setData(res.data);
                    // console.log(res.data.result)

                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4055/api/admin/subcategory/getsubcategory')
            .then(res => {
                // console.log(res)
                if (res.status === 200) {
                    setsubData(res.data);
                    console.log(res.data)
                    // console.log(res.data.result)

                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = async (e) => {
        try {
            // console.log(values)
            e.preventDefault()
            const formData = new FormData();
            formData.append('pCategoryId', values.pCategoryId);  //form data name and value
            formData.append("subCategoryid", values.subCategoryid);//form data name and value
            formData.append('subCategoryname', values.subCategoryname)
            formData.append('photo', values.photo)

            await axios.post("http://localhost:4055/api/admin/subcategory/addsubcategory", formData)
                .then(result => {
                    // alert()
                    if (result.data.affectedRows == 1) {
                        alert("subcategory added Successfully")
                    } else {

                        alert(" Failed to Add subcategory ");
                    }
                })
                .catch(err => {
                    console.log(err);

                })
        } catch (error) {
            console.error("Error posting data:", error);
        }
      
                       
    };
    return (
        <>
            <div className='d-flex container justify-content-center' >
                <div className='border rounded mt-4' style={{ border: '2px solid',boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", margin: '10px', padding: '5px', textAlign: 'center', width: '500px' }} >
                    <h4 style={{ marginTop: '10px' }}>Add Sub Category</h4>

                    <select class="form-select mb-3" aria-label="Default select example" onChange={e => setValues({ ...values, pCategoryId: e.target.value })}>
                        <option selected>Add Category First</option>
                        {data.map((item,) => {
                            return (
                                <>
                                    <option value={item.pCategoryId}>{item.categoryname}</option>
                                </>

                            )
                        })}

                    </select>
                    <div class="mb-3" >
                        <label for="formGroupExampleInput" class="form-label">SubCategory ID :</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Category ID" onChange={e => setValues({ ...values, subCategoryid: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label for="formGroupExampleInput2" class="form-label">SubCategory Name :</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Enter Category Name" onChange={e => setValues({ ...values, subCategoryname: e.target.value })} />
                    </div>
                    <div className="mb-3 col ">
                        <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Photo</label>
                        <input type="file" onChange={(e) => setValues({ ...values, photo: e.target.files[0] })} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <Button className='btn col-12' onClick={handleSubmit}>SAVE</Button>
                </div>
                <div className="m-4 p-2 rounded" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}
                       > <h3 className='text-center my-2'>SubCategory List</h3>
                    <Table striped bordered hover className="table-responsive border rounded">
                        <thead>
                            <tr>
                                <th>Sno.#</th>
                                <th>Category ID</th>
                                <th>subCategoryid</th>
                                <th>subCategoryname</th>
                                <th>photo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subdata.map((employee, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{employee.pCategoryId}</td>
                                        <td>{employee.subcategoryid}</td>
                                        <td>{employee.subcategoryname}</td>
                                        <td>
                                            <img
                                                style={{ height: '50px', width: '50px' }}
                                                src={employee.photo}
                                                alt={employee.name}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target={`#exampleModal-${employee.subCategoryid}`}
                                            >
                                                Update
                                            </button>

                                            <div
                                                className="modal fade"
                                                id={`exampleModal-${employee.subCategoryid}`}
                                                tabIndex="-1"
                                                aria-labelledby="exampleModalLabel"
                                                aria-hidden="true"
                                            >
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                                                Update SubCategory Details
                                                            </h1>
                                                            <button
                                                                type="button"
                                                                className="btn-close"
                                                                data-bs-dismiss="modal"
                                                                aria-label="Close"
                                                            ></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    SubCategory ID
                                                                </label>
                                                                {/* {employee.subCategoryid} */}
                                                                <input type="text" class="form-control" id="exampleFormControlInput1" disabled value={employee.subCategoryid} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="exampleFormControlInput2"
                                                                    className="form-label"
                                                                >
                                                                    SubCategory Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) =>
                                                                        setValues({
                                                                            ...values,
                                                                            subCategoryname: e.target.value,
                                                                        })
                                                                    }
                                                                    id="exampleFormControlInput2"
                                                                />
                                                            </div>
                                                            <div className="mb-3 col ">
                                                                <label htmlFor="exampleFormControlInput1" className="form-label d-flex">Photo</label>
                                                                <input type="file" onChange={(e) => setValues({ ...values, photo: e.target.files[0] })} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                                            </div>
                                                        </div>

                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                className="btn btn-secondary"
                                                                data-bs-dismiss="modal"
                                                            >
                                                                Close
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-primary"
                                                                data-bs-dismiss="modal"
                                                                onClick={() =>
                                                                    ''  // handleUpdate(employee.pCategoryid)
                                                                }
                                                            >
                                                                Save changes
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>

            </div>
        </>
    )
}

export default AddSubcategory;