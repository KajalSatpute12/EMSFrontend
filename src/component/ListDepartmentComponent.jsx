import React, { useEffect, useState } from 'react'
import { deptList } from '../services/EmployeeService'

function ListDepartmentComponent(){

    const style = {
        marginTop: "20px",
        textShadow: "2px 2px 4px #000000",
        color: "white"
    }

    const[dept, setDept] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    useEffect( () =>{
        deptList().then((response) =>{
            setDept(response.data)
        }).catch(
            error => {console.error(error)}
        )
    }, [])

    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;
    const currentDept = dept.slice(indexOfFirstData, indexOfLastData);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='container'>
            <h2 className='text-center' style={style}>List of Roles</h2>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Department Id</th>
                            <th>Department Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentDept.map( dep =>
                                <tr key={dep.id}>
                                    <td>{dep.id}</td>
                                    <td>{dep.name}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
        </div>
    )

}

export default ListDepartmentComponent;