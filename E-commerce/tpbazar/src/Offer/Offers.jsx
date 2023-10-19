import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './offer.css';

function Offers() {
    const [offers, setOffers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(4);

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

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/admin/offer/viewoffer';

        axios.get(apiUrl)
            .then((response) => {
                setOffers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleStatusToggle = (offerId) => {
        // Simulated status toggle for demonstration purposes
        const updatedOffers = offers.map((offer) => {
            if (offer.offerid === offerId) {
                return {
                    ...offer,
                    status: offer.status === 'Active' ? 'Inactive' : 'Active',
                };
            }
            return offer;
        });

        setOffers(updatedOffers);
    };

    const filteredOffers = offers.filter((offer) =>
        offer.offername.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredOffers.length / perPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, filteredOffers.length);
    const offersToDisplay = filteredOffers.slice(startIndex, endIndex);

    return (
        <div className='border rounded m-3' style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            
            <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="m-3"
            >
                <Tab eventKey="home" title="View">
                    <table class="table table-hover border m-3 " style={{ width: '70vw' }}>
                        <thead >
                            <tr className=' table-dark bg-blackbg-gradient'>

                                <th scope="col">sr no.</th>
                                <th scope="col">Offer Id</th>
                                <th scope="col">Offer Name</th>
                                <th scope="col">Discoint In %</th>
                                <th scope="col">Flat Discount</th>
                                <th scope="col">Upto Discount</th>
                                <th scope="col">Valid From</th>
                                <th scope="col">Valid To</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {/* <!-- Button trigger modal --> */}


                        {/* <!-- Modal --> */}

                        <tbody>
                            {
                                data.map((item, index) => {
                                    return (<tr key={index}>

                                        <th >{index + 1}</th>
                                        <td>{item.offerid}</td>
                                        <td>{item.offername}</td>
                                        <td>{item.percentagediscount}</td>
                                        <td>{item.flatdiscount}</td>
                                        <td>{item.uptodiscount}</td>
                                        <td>{item.validfrom}</td>
                                        <td>{item.validto}</td>
                                        <td>{item.status}</td>
                                        <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal-${item.offerid}`}>
                                            Update
                                        </button>
                                            {/* <td><button type="button" onClick={() => handelUpdate(item.offerid)} class="btn btn-outline-success">Update</button>
                                        </td> */}
                                            <div class="modal fade" id={`exampleModal-${item.offerid}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Update Offer</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div class="mb-3">
                                                                <label for="exampleFormControlInput1" class="form-label">Offer Id</label>
                                                                <input type="text" class="form-control" id="exampleFormControlInput1" disabled value={item.offerid} />
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="exampleFormControlInput1" class="form-label">Offer Name</label>
                                                                <input type="text" class="form-control" id="exampleFormControlInput1" disabled value={item.offername} />
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
                                                        </div>
                                                        <div class="form-check form-switch">
                                                            <label class="form-check-label" for="flexSwitchCheckDefault">Status<p className=''>*{st}</p></label>
                                                            <input class="form-check-input" onClick={switchClick} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                                        </div>

                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handelUpdate(item.offerid)}>Save changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    )
                                })
                            }

                        </tbody>
                    </table>
                    {/* <button
                      className={`toggle-button ${offer.status === "Active" ? 'active' : 'inactive'}`}
                      onClick={() => handleStatusToggle(offer.offerid)}
                    >
                      {offer.status}
                    </button> */}

                    <nav aria-label='Page navigation'>
                        <ul className='pagination'>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li
                                    key={index + 1}
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''
                                        }`}
                                >
                                    <button
                                        className='page-link'
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Tab>
                <Tab eventKey="profile" title="ADD">
                    {/* <Link to='/addOffer' className='btn btn-success'>
            Add Offers
          </Link> */}

                    <div className='d-flex'>
                        <div class="card mx-4 mb-3" style={{ width: '1000px' }}>
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
                </Tab>
                {/* <Tab eventKey="contact" title="Contact" disabled>
                    Tab content for Contact
                </Tab> */}
            </Tabs>
        </div>
    );
}

export default Offers;