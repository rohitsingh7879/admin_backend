import React from 'react'
import Sidebar from './Sidebar';
import Nav from './Nav'

import { Outlet } from 'react-router-dom'
export default function Home() {
  return (
    <div>
       <Nav />
            <div className='d-flex'>
                <div>
                    <Sidebar> </Sidebar>
                </div>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
    </div>
  )
}
