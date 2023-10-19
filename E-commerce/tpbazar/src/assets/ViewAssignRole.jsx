import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './User.css'
function ViewAssignedRole(props) {
    const data = props.data
    const uidforrevokrole=props.uid
    const [roleid,setroleid]=useState()
   
    const revokerole=(rolename)=>{
       
        axios.get(`http://localhost:4055/api/admin/role/getrolebyname/${rolename}`)
        .then(result=>{
            console.log(result.data[0].roleid)
            setroleid(result.data[0].roleid)
        })
        .catch(err=>{
            alert("Error in getting Roleid")
        })
    }
    const navigate = useNavigate()
    useEffect(() => {
        if (uidforrevokrole && roleid !== null) {
            
            // Create an object with keys for uidforrevokrole and roleid
            const data = { uidforrevokrole: uidforrevokrole, roleid: roleid };
    
            axios.delete(`http://localhost:4055/api/admin/role/revokerole`, { data })
                .then(result => {
                    console.log(result);
                    if (result.data.affectedRows === 1) {
                        alert("Role Deleted Successfully")
                        props.onHide()
                        // navigate('/users')
                    } else {
                        // alert("Role Deletion failed");
                       
                    }
                })
                .catch(err => { 
                    // Handle errors
                });
        }
    }, [uidforrevokrole, roleid]);
    
    
  
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            //   centered
            className='modal-backdrop'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Assigned Role for {props.name} {uidforrevokrole}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr No.</th>
                            <th scope="col">Roles</th>
                            <th scope="col">Revoke Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                return (<><tr key={index}>

                                    <th >{index + 1}</th>
                                    <td>{item.rolename}</td>
                                    <td><button type="button" class="btn btn-primary" onClick={()=>revokerole(item.rolename)}>
                                            Revoke Role
                                        </button></td>

                                </tr>
                                </>
                                )
                            })
                        }


                    </tbody>
                </table>

            </Modal.Body>
            <Modal.Footer>
                <Button  onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default ViewAssignedRole;
