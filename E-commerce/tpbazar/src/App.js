import User from './assets/User';
import Dashboard from './Dashboard';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import Roles from './Roles';
import AddUser from './assets/AddUser';
import AddCategory from './Category/AddCategory';
import AddSubcategory from './Category/SubCategory';
import Update from './Category/UpdateCategory';
import Role from './Role/Role';
import Home from './Home'
import Offers from './Offer/Offers';
import AddOffer from './Offer/AddOffer';
import  ViewUser from './assets/ViewUser'
// import SubCategory from './Category/SubCategory';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} >
            < Route path='/' element={<Dashboard/>} />
            < Route path='/user' element={<User />} />
            < Route path='/adduser' element={<AddUser />} />
            < Route path='/role' element={<Role />} />
            < Route path='/category' element={<AddCategory />} />
            < Route path='/subcategory' element={<AddSubcategory />} />
            < Route path='/category/update' element={<Update />} />
            < Route path='/offer' element={<Offers />} />
            < Route path='/addoffer' element={<AddOffer />} />
            < Route path='/viewuser/:uid' element={<ViewUser />} />
          </Route>
          {/* < Route path='/category/subcategory' element={<SubCategory />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;