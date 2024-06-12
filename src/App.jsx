import { useState } from 'react'
import ListEmployeeComponent from './component/ListEmployeeComponent'
import './App.css'
import { HeaderComponent } from './component/HeaderComponent'
import { FooterComponent } from './component/FooterComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeComponent from './component/HomeComponent'
import EmployeeComponent from './component/EmployeeComponent'
import LoginComponent from './component/LoginComponent'
import ListRoleComponent from './component/ListRoleComponent'
import ListDepartmentComponent from './component/ListDepartmentComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <div className='home'>
          <Routes>
            <Route path='/' element={<HomeComponent />}></Route>
            <Route path='/employees' element={<ListEmployeeComponent />}></Route>
            <Route path='/add-employee' element={<EmployeeComponent />}></Route>
            <Route path='/login' element = { <LoginComponent /> }></Route>
            <Route path='/roles' element = {<ListRoleComponent />}></Route>
            <Route path='/deptartments' element = {<ListDepartmentComponent />}></Route>
          </Routes>
          {/* <ListEmployeeComponent /> */}
        </div>
        <FooterComponent />
      </BrowserRouter>

    </>
  )
}

export default App
