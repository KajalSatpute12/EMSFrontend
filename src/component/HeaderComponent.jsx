import React from 'react'

export const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className='navbar navbar-dark bg-dark'>
          <a className='navbar-brand' href='/'>Employee Management System</a>
          <ul className='nav navbar-inverse'>
              <li><a className='navbar-brand' href='/employees'>Employee Details</a></li>
              <li><a className='navbar-brand' href='/roles'>Roles</a></li>
              <li><a className='navbar-brand' href='/deptartments'>Departments</a></li>
              {/* <li><a className='navbar-brand' href='/login'>Login</a></li> */}
          </ul>
        </nav>
      </header>
      <br />
    </div>
  )
}