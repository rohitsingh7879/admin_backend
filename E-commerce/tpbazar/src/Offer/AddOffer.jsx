import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Pagination from 'react-bootstrap/Pagination';

export default function AddOffer() {
    const [st, setSt] = useState('Status Is InActive')
    const [cl, setCl] = useState('')
    const [data, setData] = useState([])
    const [values, setValues] = useState({
        offerid: '',
        offername: '',
        percentagediscount: '',
        flatdiscount: '',
        uptodiscount: "",
        validfrom: '',
        validto: '',
        termsandcondition: '',
        status: 'InActive'

    })



    //   console.log(values.status)
    const switchClick = () => {
        if (values.status == 'InActive') {
            setValues({ ...values, status: "Active" })
            setSt("Status Is Now Active")
            setCl('success')
        } else {
            setValues({ ...values, status: "InActive" })
            setSt("Status Is InActive")
        }
    }


    const handelSave = () => {
        axios.post('http://localhost:4055/api/admin/offer/createoffer', values)
            .then(result => {
                // console.log(result);
                if (result.data.affectedRows == 1) {
                    alert(`Data Added Successfully`)
                    reload()
                }
                else {
                    alert(`${result}`)
                }
            })
            .catch(err => {
                console.error(`Error:${err}`)
            })
    }
    const reload = () => {
        // useEffect(() => {

        axios.get('http://localhost:4055/api/admin/offer/viewoffer')
            .then(result => {
                setData(result.data)
            })
            .catch(err => {
                alert(err)
            })
        // }, [])

    }
    reload()
    const handelUpdate = (id) => {
        // console.log(id)
        axios.put('http://localhost:4055/api/admin/offer/updateoffer/' + id, values)
            .then(result => {
                // console.log(result)
                if (result.data.affectedRows == 1) {
                    alert(`Updated Sucessfully`);
                    reload()
                }
                else {
                    alert(`${result}`);
                }
            })
            .catch((err) => {
                alert(err)
            })

    }
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }
    return (
    

            <div className='d-flex'>
                <div class="card" style={{ width: '30rem' }}>
                    <h3 className='text-center mt-2'>Add Offer</h3>
                    <div class="card-body justify-content-center">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Offer ID</label>
                            <input type="text" class="form-control" onChange={(e) => setValues({ ...values, offerid: e.target.value })} id="exampleFormControlInput1" placeholder="Enter Offer Id" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Offer Name</label>
                            <input type="text" class="form-control" onChange={(e) => setValues({ ...values, offername: e.target.value })} id="exampleFormControlInput1" placeholder="Enter Offer Name" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Percentage Discount</label>
                            <input type="text" class="form-control" onChange={(e) => setValues({ ...values, percentagediscount: e.target.value })} id="exampleFormControlInput1" placeholder="Enter Discount In %" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Flat Discount</label>
                            <input type="text" class="form-control" onChange={(e) => setValues({ ...values, flatdiscount: e.target.value })} id="exampleFormControlInput1" placeholder="Enter Flat Discount e.g 500$" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Upto Discount</label>
                            <input type="text" class="form-control" onChange={(e) => setValues({ ...values, uptodiscount: e.target.value })} id="exampleFormControlInput1" placeholder="Enter Upto Discount " />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Valid From</label>
                            <input type="date" class="form-control" onChange={(e) => setValues({ ...values, validfrom: e.target.value })} id="exampleFormControlInput1" placeholder="Enter Valid from" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Valid To</label>
                            <input type="date" class="form-control" onChange={(e) => setValues({ ...values, validto: e.target.value })} id="exampleFormControlInput1" placeholder="Enter valid to" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Terms & Conditions</label>
                            <input type="text" class="form-control" onChange={(e) => setValues({ ...values, termsandcondition: e.target.value })} id="exampleFormControlInput1" placeholder="Enter Terms & Conditions" />
                        </div>
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="flexSwitchCheckDefault">Status<p className=''>*{st}</p></label>
                            <input class="form-check-input" onClick={switchClick} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        </div>
                        <button type="button" onClick={handelSave} class="btn col-12 btn-outline-success">Save</button>
                    </div>
                </div>
                </div>


      
            )
}
