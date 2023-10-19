import React from 'react'
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers, } from 'react-icons/fa';
import { FaUsersLine } from 'react-icons/fa6';
import { BiSolidCategory,BiSolidCategoryAlt} from 'react-icons/bi';
import {AiTwotoneShop} from 'react-icons/ai'
import {MdLocalOffer} from 'react-icons/md'
import {SiGoogletagmanager} from 'react-icons/si'
function Sidebar({ children }) {
    return (
        <>
            <div style={{ display: "flex" }}>
                <div>
                    <Row >
                        <Col>
                            <div className='bg-dark' style={{ height: '150vh', width: '200px' }}>
                                <ul>
                                    <li className='text-white text-decoration-none list-unstyled'><Link to="/"style={{ color: 'white', textDecoration: 'none' }}> <h4>Dashboard</h4></Link></li>   
                                    <li className='mt-5'><Link to="/user" style={{ color: 'white', textDecoration: 'none' }}><h5>< FaUsers className='mx-1'/>Users</h5></Link></li>          
                                    <li className='mt-5'><Link to="/role" style={{ color: 'white', textDecoration: 'none' }}><h5><SiGoogletagmanager className='mx-1'/>Roles</h5></Link></li>          
                                    <li className='mt-5'><Link to="/category" style={{ color: 'white', textDecoration: 'none' }}><h5><BiSolidCategory className='mx-1'/>Category</h5></Link></li>    
                                    <li className='mt-5'><Link to="/subcategory" style={{ color: 'white', textDecoration: 'none' }}><h5><BiSolidCategoryAlt className='mx-1'/>Sub Category</h5></Link></li>
                                    <li className='mt-5'><Link to="/retailers" style={{ color: 'white', textDecoration: 'none' }}><h5><AiTwotoneShop  className='mx-1'/>Retailers</h5></Link></li>
                                    <li className='mt-5'><Link to="/customers" style={{ color: 'white', textDecoration: 'none' }}><h5><FaUsersLine  className='mx-1'/>Customers</h5></Link></li>
                                    <li className='mt-5'><Link to="/offer" style={{ color: 'white', textDecoration: 'none' }}><h5><MdLocalOffer className='mx-1'/>Offers</h5></Link></li>
                                </ul>
                            </div>
                        </Col> 
                    </Row>
                </div>
                <div>
                    {/* {children} */}
                </div>
            </div>

        </>
    )
}

export default Sidebar