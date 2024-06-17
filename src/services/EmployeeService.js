import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/ems/';

export const empList = () => axios.get(REST_API_BASE_URL.concat('getEmployeeDetails'));
export const getEmp = (id) => axios.get(REST_API_BASE_URL.concat('getEmployeeById?id=')+ id);
export const roleList = () => axios.get(REST_API_BASE_URL.concat('getRoleDetails'));
export const getRole = (id) => axios.get(REST_API_BASE_URL.concat('getRoleById?id=')+ id);

export const deptList = () => axios.get(REST_API_BASE_URL.concat('getDepartmentDetails'));
export const getDept = (id) => axios.get(REST_API_BASE_URL.concat('getDepartmentById?id=')+ id);
export const loginList = () => axios.get(REST_API_BASE_URL.concat('getLoginDetails'));
export const managerList = () => axios.get(REST_API_BASE_URL.concat('getManagerDetails'));

export const addEmployee = (employee) => axios.post(REST_API_BASE_URL.concat('saveEmployeeDetails'), employee);
export const  addRole = (role) => axios.post(REST_API_BASE_URL.concat('saveRoleDetails'), role);
export const addDept = (dept) => axios.post(REST_API_BASE_URL.concat('saveDepartmentDetails'), dept);

export const deleteEmp = (id) => axios.delete(REST_API_BASE_URL.concat('deleteEmployeeDetails?id=')+id);
export const deleteRole = (id) => axios.delete(REST_API_BASE_URL.concat('deleteRoleDetails?id=')+id);
export const deleteDept = (id) => axios.delete(REST_API_BASE_URL.concat('deleteDepartmentDetails?id=')+id);

export const updateEmp = (employee, id) => {
    const url = REST_API_BASE_URL.concat('updateEmployeeDetails?id=' + id);
    return axios.put(url, employee);
}

export const updateRole = (role, id) => {
    const url = REST_API_BASE_URL.concat('updateRoleDetails?id=' + id);
    return axios.put(url, role);
}

export const updateDept = (dept, id) => {
    const url = REST_API_BASE_URL.concat('updateDepartmentDetails?id='+ id);
    return axios.put(url, dept);
}