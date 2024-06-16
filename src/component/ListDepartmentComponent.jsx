import React, { useEffect, useState } from 'react'
import { deleteDept, deptList } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

function ListDepartmentComponent() {

    const style = {
        marginTop: "40px",
        textShadow: "2px 2px 4px #000000",
        color: "white"
    }

    const deptStyle = {
        color: 'red',
        fontSize: '30px',
        textShadow: "2px 2px 4px #000000",
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '40px'
    }

    const nav = useNavigate();
    const [dept, setDept] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        deptList().then((response) => {
            setDept(response.data)
        }).catch(
            error => { console.error(error) }
        )
    }, [])

    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const filteredDept = dept.filter(dep => dep.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const currentDept = filteredDept.slice(indexOfFirstData, indexOfLastData);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    }

    const navigate = () => {
        nav('/add-department');
    }

    function updateDeptDetails(id){
        nav(`/edit-department/${id}`);
    }

    function deleteD(id){
        deleteDept(id).then((response) => {
            setMsg(response.data);
            deptList().then((response) => {
                setDept(response.data)
            }).catch(
                error => { console.error(error) }
            )
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center' style={style}>List of Departments</h2>
            <div className='row' style={{ marginTop: '40px' }}>
                <div className='col-md-6'>
                    <button className='btn btn-primary' onClick={navigate}>Add Department</button>
                </div>
                <div className='col-md-6'>
                    <input type='text' value={searchQuery}
                        onChange={handleSearchInputChange}
                        placeholder='Search by department name...'
                        className='form-control'
                        style={{ marginBottom: '10px' }}
                    />
                </div>
            </div>
            {msg && <div className='alert alert-success'>{msg}</div>}
            {filteredDept.length === 0 && <p style={deptStyle}>Department does not exist.</p>}
            {filteredDept.length > 0 && (
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Department Id</th>
                            <th>Department Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentDept.map(dep =>
                                <tr key={dep.id}>
                                    <td>{dep.id}</td>
                                    <td>{dep.name}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={ () => updateDeptDetails(dep.id)}>Update</button>
                                        <button className='btn btn-danger' style={{ marginLeft: '20px' }} onClick={ () => { deleteD(dep.id)}}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            )}
            <nav>
                <ul className='pagination'>
                    {[...Array(Math.ceil(filteredDept.length / itemsPerPage)).keys()].map(number => (
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

export default ListDepartmentComponent;