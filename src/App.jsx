import { useState } from 'react'
import ListEmployeeComponent from './component/ListEmployeeComponent'
import './App.css'
import { HeaderComponent } from './component/HeaderComponent'
import { FooterComponent } from './component/FooterComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeComponent from './component/HomeComponent'
import AddEmployeeComponent from './component/AddEmployeeComponent'
import LoginComponent from './component/LoginComponent'
import ListRoleComponent from './component/ListRoleComponent'
import ListDepartmentComponent from './component/ListDepartmentComponent'
import AddRoleComponent from './component/AddRoleComponent'
import AddDepartmentComponent from './component/AddDepartmentComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <div className='home'>
          <Routes>
            <Route path='/home' element={<HomeComponent />}></Route>
            <Route path='/' element={<LoginComponent />}></Route>
            <Route path='/employees' element={<ListEmployeeComponent />}></Route>
            <Route path='/add-employee' element={<AddEmployeeComponent />}></Route>
            <Route path='/edit-employee/:id' element={<AddEmployeeComponent />}></Route>
            <Route path='/login' element={<LoginComponent />}></Route>
            <Route path='/roles' element={<ListRoleComponent />}></Route>
            <Route path='/add-role' element={<AddRoleComponent />}></Route>
            <Route path='/edit-role/:id' element={<AddRoleComponent />}></Route>
            <Route path='/deptartments' element={<ListDepartmentComponent />}></Route>
            <Route path='/add-department' element={<AddDepartmentComponent />}></Route>
            <Route path='/edit-department/:id' element= { <AddDepartmentComponent /> }></Route>
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
