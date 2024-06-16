import React, { useEffect, useState } from 'react'
import { addRole, deptList, getRole, updateRole } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

function AddRoleComponent() {

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
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [salary, setSalary] = useState('');
    const [dept, setDept] = useState('');
    const [success, setSuccess] = useState('');
    const [depts, setDepts] = useState([]);
    const [errors, setErrors] = useState({
        title: '',
        salary: '',
        dept: ''
    });
    useEffect(() => {
        if (id) {
            getRole(id).then((response) => {
                setTitle(response.data.title);
                setSalary(response.data.salary);
                setDept(response.data.department_id);
            })
        }
    }, [id])

    const save = (event) => {
        event.preventDefault();

        if (validForm()) {
            const role = { title, salary, department_id: dept };
            console.log('Entered Data: ', role);
            addRole(role).then((response) => {
                console.log(response.data);
                nav('/roles');
            })
        }
    }

    const update = (event) => {
        event.preventDefault();

        if (validForm()) {
            const role = { id, title, salary, department_id: dept };
            console.log('Entered data for update: ', role);
            updateRole(role, id).then((response) => {
                console.log(response);
                setSuccess('Details updated successfully');
            }).catch(error => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
        deptList().then((response) => {
            setDepts(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const clearForm = () => {
        setTitle('');
        setSalary('');
        setDept('');
    }

    function validForm() {
        let valid = true;

        const errorCopy = { ...errors };

        if (title.trim()) {
            errorCopy.title = '';
        } else {
            errorCopy.title = 'Title is required';
            valid = false;
        }

        if (salary.trim()) {
            errorCopy.salary = '';
        } else {
            errorCopy.salary = 'Salary is required';
        }

        if (dept.trim()) {
            errorCopy.dept = ''
        } else {
            errorCopy.dept = 'Department is required'
        }

        setErrors(errorCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 style={style} className='text-center'>Update Role</h2>
        } else {
            <h2 style={style} className='text-center'>Add Role</h2>
        }
    }

    function buttonName() {
        if (id) {
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
                        <label className='form-label'>Role</label>
                        <input type='text'
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            placeholder='Enter the role title'
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        {errors.title && <span className='invalid-feedback'>{errors.title}</span>}
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Salary</label>
                        <input type='number'
                            className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                            placeholder='Enter the salary for the role'
                            value={salary}
                            onChange={(event) => setSalary(event.target.value)}
                        />
                        {errors.salary && <span className='invalid-feedback'>{errors.salary}</span>}
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Department</label>
                        <select className={`form-control ${errors.dept ? 'is-invalid' : ''}`} value={dept} onChange={(event) => setDept(event.target.value)}>
                            <option value="">Select the Department</option>
                            {
                                depts.map(dep => (
                                    <option key={dep.id} value={dep.id}>
                                        {dep.name}
                                    </option>
                                ))
                            }
                        </select>
                        {errors.dept && <span className='invalid-feedback'>{errors.dept}</span>}
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

export default AddRoleComponent
