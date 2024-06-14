import React, { useEffect, useState } from 'react'
import { roleList } from '../services/EmployeeService';

function ListRoleComponent() {

    const style = {
        marginTop: "20px",
        textShadow: "2px 2px 4px #000000",
        color: "white"
    }

    const roleStyle = {
        color: 'red',
        fontSize: '30px',
        textShadow: "2px 2px 4px #000000",
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '40px'
    }

    const [roles, setRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchRoles, setSearchRoles] = useState('');

    useEffect(() => {
        roleList().then((response) => {
            setRoles(response.data)
        }).catch(
            error => { console.error(error) }
        )
    }, [])

    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const filteredRoles = roles.filter(role => role.title.toLowerCase().includes(searchRoles.toLowerCase()));
    const currentRoles = filteredRoles.slice(indexOfFirstData, indexOfLastData);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const hangleInputChange = (event) => {

        setSearchRoles(event.target.value);
        setCurrentPage(1);

    }

    return (
        <div className='container'>
            <h2 className='text-center' style={style}>List of Roles</h2>
            <div className='row'>
                <div className='col-md-6 offset-md-6'>
                    <input type='text'
                        className='form-control'
                        onChange={hangleInputChange}
                        placeholder='Search by the role title...'
                        style={{ marginBottom: '10px' }}
                    />
                </div>
            </div>
            {filteredRoles.length === 0 && <p style={roleStyle}>Role does not exist.</p>}
            {filteredRoles.length > 0 && (
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Role Id</th>
                            <th>Role Title</th>
                            <th>Salary</th>
                            <th>Department Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentRoles.map(role =>
                                <tr key={role.id}>
                                    <td>{role.id}</td>
                                    <td>{role.title}</td>
                                    <td>{role.salary}</td>
                                    <td>{role.department_id}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            )}
            <nav>
                <ul className='pagination'>
                    {[...Array(Math.ceil(filteredRoles.length / itemsPerPage)).keys()].map(number => (
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

export default ListRoleComponent
