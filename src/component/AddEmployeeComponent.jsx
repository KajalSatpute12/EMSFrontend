import React, { useState, useEffect } from 'react'
import {  roleList, addEmployee, getEmp, updateEmp, managerList } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const AddEmployeeComponent = () => {

  const style = {
    marginTop: "40px",
    textShadow: "2px 2px 4px #000000",
    color: "white"
  }

  const styleCreate = {
    alignItems: "center",
    border: "1px solid #ccc",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(0px)",
    marginLeft: "400px",
    marginRight: "460px",
    marginTop: "50px",
    width: "650px"
  }

  const nav = useNavigate();
  const {id} = useParams();
  const [roles, setRoles] = useState([]);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [emailId, setEmailId] = useState('');
  const [role, setRole] = useState('');
  const [managerId, setManagerId] = useState('');
  const [success, setSuccess] = useState('');
  const [manager, setManager] = useState([]);
  const [errors, setErrors] = useState({
    fname: '',
    lname: '',
    emailId: '',
    role: '',
    dept: ''
  })

  useEffect(()=>{

    if(id){
      getEmp(id).then((response) =>{

        setFname(response.data.first_name);
        setLname(response.data.last_name);
        setEmailId(response.data.email_id);
        setRole(response.data.role_id);
        setManagerId(response.data.manager_id);
      })
    }
    }, [id])

  useEffect(() => {
    roleList().then((roles) => {
      setRoles(roles.data)
    }).catch(error => {
      console.log(error);
    });

    managerList().then((response) => {
      setManager(response.data);
      console.log("Manager Data:", response.data);
    }).catch(error => {
      console.log(error);
    })

  }, []);

  const save = (event) => {

    event.preventDefault();

    if (validateForm()) {
      const emp = {
        first_name: fname,
        last_name: lname,
        email_id: emailId,
        role_id: role,
        manager_id: managerId
      }

      console.log('Entered Data: ', emp);

      addEmployee(emp).then((response) => {
        console.log(response.data);
        nav('/employees');
      })
    }
  }

  
  const update =(event) => {
    event.preventDefault();

    if(validateForm()){

      const emp = {
        id: id,
        first_name: fname,
        last_name: lname,
        email_id: emailId,
        role_id: role,
        manager_id: managerId
      }

      updateEmp(emp, id).then((response) => {
        console.log(response);
        setSuccess('Details updated successfully');
      })
    }
  }

  const clearForm = () => {
    setFname('');
    setLname('');
    setEmailId('');
    setRole('');
    setManagerId('');
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (fname.trim()) {
      errorsCopy.fname = '';
    } else {
      errorsCopy.fname = 'First name is required';
      valid = false;
    }

    if (lname.trim()) {
      errorsCopy.lname = ''
    } else {
      errorsCopy.lname = 'Last name is required'
    }

    if (emailId.trim()) {
      errorsCopy.emailId = ''
    } else {
      errorsCopy.emailId = 'Email Id is required'
    }

    if (role) {
      errorsCopy.role = '';
    } else {
      errorsCopy.role = 'Role is required';
    }

    if (managerId) {
      errorsCopy.managerId = '';
    } else {
      errorsCopy.managerId = 'Department is required';
    }

    setErrors(errorsCopy);
    return valid;

  }

  function pageTitle(){
    if(id){
      return <h2 style={style} className='text-center'>Update Employee</h2>
    } else {
      return <h2 style={style} className='text-center'>Add New Employee</h2>
    }
  }

  function buttonName(){
    if(id){
        return <button className='btn btn-success' style={{ marginTop: "30px", marginLeft: "50px" }} onClick={update}>Update</button>
    } else {
        return <button className='btn btn-success' style={{ marginTop: "30px", marginLeft: "50px" }} onClick={save}>Save</button>
    }
}

  return (
    <div>
      {
        pageTitle()
      }
      <div className='col-md-6' style={styleCreate}>
        {success && <div className="alert alert-success">{success}</div>}
        <form>
          <div className='form-group'>
            <label className='form-label'>First Name</label>
            <input type='text'
              className={`form-control ${errors.fname ? 'is-invalid' : ''}`}
              value={fname}
              onChange={(event) => setFname(event.target.value)}
              placeholder='Enter First Name' />
            {errors.fname && <span className='invalid-feedback'>{errors.fname}</span>}
          </div>
          <div className='form-group'>
            <label className='form-label'>Last Name</label>
            <input type='text'
              className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
              value={lname}
              onChange={(event) => setLname(event.target.value)}
              placeholder='Enter Last Name' />
            {errors.lname && <span className='invalid-feedback'>{errors.lname}</span>}
          </div>
          <div className='form-group'>
            <label className='form-label'>EmailId</label>
            <input type='text'
              className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
              value={emailId}
              onChange={(event) => setEmailId(event.target.value)}
              placeholder='Enter EmailId' />
            {errors.emailId && <span className='invalid-feedback'>{errors.emailId}</span>}
          </div>

          <div className='form-group'>
            <label className='form-label'>Role</label>
            <select className={`form-control ${errors.role ? 'is-invalid' : ''}`} value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="">Select the role</option>
              {roles.map(option => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </select>
            {errors.role && <span className='invalid-feedback'>{errors.role}</span>}
          </div>
          <div className='form-group'>
            <label className='form-label'>Manager</label>
            <select className={`form-control ${errors.managerId ? 'is-invalid' : ''}`} value={managerId} onChange={(event) => setManagerId(event.target.value)}>
              <option value="">Select the Manager</option>
              {
                manager.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
            </select>
            {errors.managerId && <span className='invalid-feedback'>{errors.managerId}</span>}
          </div>
          {
            buttonName()
          }
          <button className='btn btn-danger' style={{ marginTop: "30px", marginLeft: "240px" }} onClick={clearForm}>Cancel</button>
        </form>
      </div>
    </div>

  )
}

export default AddEmployeeComponent