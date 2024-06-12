import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/ems/';

export const empList = () => axios.get(REST_API_BASE_URL.concat('getEmployeeDetails'));
export const roleList = () => axios.get(REST_API_BASE_URL.concat('getRoleDetails'));
export const deptList = () => axios.get(REST_API_BASE_URL.concat('getDepartmentDetails'));