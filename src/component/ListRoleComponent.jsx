import React, { useEffect, useState } from 'react'
import { roleList } from '../services/EmployeeService';

function ListRoleComponent() {

    const style = {
        marginTop: "20px",
        textShadow: "2px 2px 4px #000000",
        color: "white"
    }

    const[roles, setRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    useEffect( () =>{
        roleList().then((response) =>{
            setRoles(response.data)
        }).catch(
            error => {console.error(error)}
        )
    }, [])

    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentRoles = roles.slice(indexOfFirstData, indexOfLastData);

    const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <div className='container'>
        <h2 className='text-center' style={style}>List of Roles</h2>
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

      
    </div>
  )
}

export default ListRoleComponent
