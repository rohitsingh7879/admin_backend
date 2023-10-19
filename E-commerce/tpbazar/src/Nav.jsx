import React from 'react'
import { Navbar, Container,} from 'react-bootstrap';
export default function Nav() {
  return (
    <div>
       <Navbar className="bg-dark">
                <Container>
                   <img height="50px" width="50px" src="./logo.jpg" alt="" />
                    <h2 style={{ color: 'white' }}>Admin Mangement System</h2>
                </Container>
            </Navbar>

    </div>
  )
}
