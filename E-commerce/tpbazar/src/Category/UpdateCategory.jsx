import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';

function Update() {
    return (
        <>
            <Sidebar>

                <div style={{ border: '2px solid',boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", margin: '10px', padding: '5px', textAlign: 'center', width: '500px' }} >
                    <h4 style={{ marginTop: '10px' }}>Update Category</h4>
                    <hr/>
                    <div class="mb-3" >
                        <label for="formGroupExampleInput" class="form-label">Category ID :</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Category ID" />
                    </div>
                    <div class="mb-3">
                        <label for="formGroupExampleInput2" class="form-label">Category Name :</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Enter Category Name" />
                    </div>

                    <Link><Button className='btn-success'>SAVE</Button></Link>
                </div>

            </Sidebar>
        </>
    )
}

export default Update;