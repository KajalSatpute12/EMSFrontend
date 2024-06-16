import React, { useEffect, useState } from 'react';
import { deleteEmp, empList } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const style = {
        marginTop: "40px",
        textShadow: "2px 2px 4px #000000",
        color: "white"
    }

    const empStyle = {
        color: 'red',
        fontSize: '30px',
        textShadow: "2px 2px 4px #000000",
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '40px'
    }

    let flg = false;
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchEmp, setSearchEmp] = useState('');
    const [msg, setMsg] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        empList().then((response) => {
            setEmployees(response.data);
        }).catch(
            error => { console.error(error); }
        )
    }, [])


    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const filteredEmp = employees.filter(emp => {
        const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
        return fullName.includes(searchEmp.toLowerCase());
    })
    const currentEmployees = filteredEmp.slice(indexOfFirstData, indexOfLastData);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleSearch = (event) => {
        setSearchEmp(event.target.value);
        setCurrentPage(1);
    }

    function addEmployee() {
        nav('/add-employee');
    }

    function updateEmployeeDetails(id){
        nav(`/edit-employee/${id}`)
    }

    function deleteEmpDetails(id){
        deleteEmp(id).then((response) => {
            console.log(response.data);
            setMsg('Employee details deleted successfully')
            flg = true;
            empList().then((response) =>{
                setEmployees(response.data);
            }).catch(error => {
                console.log(error);
            })
        }).catch(error => {
            console.log(error);
            flg = false;
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center' style={style}>List of employees</h2>
            <div className='row' style={{ marginTop: '40px' }}>
                <div className='col-md-6'>
                    <button className='btn btn-primary mb-2' onClick={addEmployee}>Add Employee</button>
                </div>
                <div className='col-md-6 d-flex justify-content-end'>
                    <input type='text'
                        value={searchEmp}
                        onChange={handleSearch}
                        placeholder='Search by employee name...'
                        className='form-control'
                        style={{ marginBottom: '10px' }}
                    />
                </div>
            </div>
            {msg && <div className='alert alert-success'>{msg}</div>}
            {filteredEmp.length === 0 && <p style={empStyle}>Employee does not exist.</p>}
            {filteredEmp.length > 0 && (
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>Employee EmailId</th>
                            <th>Role Id</th>
                            <th>Manager Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentEmployees.map(emp =>
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.first_name} {emp.last_name}</td>
                                    <td>{emp.email_id}</td>
                                    <td>{emp.role_id}</td>
                                    <td>{emp.manager_id}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={ () => updateEmployeeDetails(emp.id)}>Update</button>
                                        <button className='btn btn-danger' style={{ marginLeft: '20px' }} onClick={ () => deleteEmpDetails(emp.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table> 
            )}
            <nav>
                <ul className='pagination'>
                    {[...Array(Math.ceil(filteredEmp.length / itemsPerPage)).keys()].map(number => (
                        <li key={number + 1} className='page-item'>
                            <button onClick={() => paginate(number + 1)} className='page-link'>
                                {number + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default ListEmployeeComponent;
