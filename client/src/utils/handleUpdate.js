import { useState } from "react";

const useEmployeeDelete = (initialListOfEmployee)=>{
    const [listOfEmployees,setListOfEmployees] = useState([])
    const [filteredEmployees,setFilteredEmployees] = useState([])

    const deleteEmployee = async(id)=>{
        try {
           const res = await fetch(`/api/employee/delete/${id}`,{
            method : 'DELETE'
           }) 
           const data = await res.json();
           const updatedEmployeeList = initialListOfEmployee.filter((employee)=>employee._id != id )
           setListOfEmployees(updatedEmployeeList)
           setFilteredEmployees(updatedEmployeeList)
        } catch (error) {
            console.log("Something went wrong while deleting",error)
        }
    }
    return {    
            listOfEmployees,
            filteredEmployees,
            deleteEmployee,
            setListOfEmployees,
            setFilteredEmployees
        }
}

export default useEmployeeDelete;