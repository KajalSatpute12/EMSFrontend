import React, { useEffect, useState } from 'react';
import { empList } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const style = {
        marginTop: "20px",
        textShadow: "2px 2px 4px #000000",
        color: "white"
    }

    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const navigator = useNavigate();

    useEffect(() => {
        empList().then((response) => {
            setEmployees(response.data);
        }).catch(
            error => { console.error(error); }
        )
    }, [])

    
    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentEmployees = employees.slice(indexOfFirstData, indexOfLastData);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    function addEmployee() {
        navigator('/add-employee');
    }

    return (
        <div className='container'>
            <h2 className='text-center' style={style}>List of employees</h2>
            <button className='btn btn-primary mb-2' onClick={addEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee EmailId</th>
                        <th>Role Id</th>
                        <th>Manager Id</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentEmployees.map(emp =>
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.first_name}</td>
                                <td>{emp.last_name}</td>
                                <td>{emp.email_id}</td>
                                <td>{emp.role_id}</td>
                                <td>{emp.manager_id}</td>
                                <td><button className='btn btn-primary'>Approve</button></td>
                                <td><button className='btn btn-danger'>Reject</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <nav>
                <ul className='pagination'>
                    {[...Array(Math.ceil(employees.length / itemsPerPage)).keys()].map(number => (
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
