import React, { useEffect, useState } from 'react'
import { addDept, getDept, updateDept } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

function AddDepartmentComponent() {

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
    const [dept, setDept] = useState('');
    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState({
        dept: ''
    });

    useEffect(() => {
        if (id) {
            getDept(id).then((response) => {
                setDept(response.data.name);
            }).catch(error => {
                console.log(error);
            })
        }

    }, [id])

    const save = (event) => {
        event.preventDefault();

        const department = { name: dept };

        if (validForm()) {
            addDept(department).then((response) => {
                console.log(response);
                nav('/deptartments')
            }).catch( error => {
                console.log(error);
            })
        }
    }

    const update = (event) => {
        event.preventDefault();

        if(id){
            const dep = {department_id: id, name: dept};
            updateDept(dep, id).then((response) => {
                console.log(response.data);
                setSuccess('Details updated successfully');
            }).catch( error => {
                console.log(error);
            })
        }
    }

    function validForm() {

        let valid = true;

        const errorCopy = { ...errors };

        if (dept.trim()) {
            errorCopy.dept = ''
        } else {
            errorCopy.dept = 'Department is required'
            valid = false;
        }

        setErrors(errorCopy);
        return valid;

    }

    const clearForm = () => {
        setDept('');
    }

    function pageTitle() {

        if (id) {
            return <h2 className='text-center' style={style}>Update Department</h2>
        } else {
            return <h2 className='text-center' style={style}>Add Department</h2>
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
                        <label className='form-label'>Department Name</label>
                        <input type='text'
                            className={`form-control ${errors.dept ? 'is-invalid' : ''}`}
                            placeholder='Enter the department name'
                            value={dept}
                            onChange={(event) => setDept(event.target.value)}
                        />
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

export default AddDepartmentComponent
