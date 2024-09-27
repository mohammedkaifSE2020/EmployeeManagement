import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function EmployeeList() {

  const [listOfEmployees,setListOfEmployees] = useState([]);
  const navigate = useNavigate();
  const [length,setLength] = useState(0);
  
  useEffect(()=>{
   async function getData(){
    const response = await fetch('/api/employee/get',{
      method : 'GET',
    })
    const data = await response.json();
    setListOfEmployees(data.data);
   }
   getData();
  },[])

  const handleDelete = async(id)=>{
      try {
        const response = await fetch(`/api/employee/delete/${id}`,{
          method : 'DELETE',
        })
  
        const data = await response.json();
        console.log(data);
  
        const updatedEmployeeList = listOfEmployees.filter((employee)=>employee._id !== id);
  
        setListOfEmployees(updatedEmployeeList);
      } catch (error) {
        console.log("Something went wrong while deleting",error);
      }
  }

  const handleUpdate = (id)=>{
    navigate(`/update/${id}`,{state : {id : id}});
  }
  return (
    <div>
      <div>
        {listOfEmployees.length > 0 ? (
          <table className='table-auto w-11/12 mx-auto mt-10 border-collapse'>
            <thead>
              <tr className='bg-slate-800 text-white'>
                <th className='p-2 border'>Id</th>
                <th className='p-2 border'>Image</th>
                <th className='p-2 border'>Name</th>
                <th className='p-2 border'>Email</th>
                <th className='p-2 border'>Mobile</th>
                <th className='p-2 border'>Designation</th>
                <th className='p-2 border'>Gender</th>
                <th className='p-2 border'>Course</th>
                <th className='p-2 border'>Date</th>
                <th className='p-2 border'>Update</th>
                <th className='p-2 border'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {listOfEmployees.map((employee) => (
                <tr key={employee._id} className='text-center bg-gray-100 odd:bg-gray-200'>
                  <td className='p-2 border'>{employee.f_Id}</td>
                  <td className='p-2 border'>
                    <img src={employee.f_Image} alt="Employee" className='h-10 w-10 rounded-full mx-auto' />
                  </td>
                  <td className='p-2 border'>{employee.f_Name}</td>
                  <td className='p-2 border'>{employee.f_Email}</td>
                  <td className='p-2 border'>{employee.f_Mobile}</td>
                  <td className='p-2 border'>{employee.f_Designation}</td>
                  <td className='p-2 border'>{employee.f_gender}</td>
                  <td className='p-2 border'>{employee.f_Course}</td>
                  <td className='p-2 border'>{new Date(employee.createdAt).toLocaleDateString()}</td>
                  <td className='p-2 border'>
                    <button
                      className='rounded-lg p-2 bg-green-500 text-white'
                      onClick={() => handleUpdate(employee._id)}
                    >
                      Update
                    </button>
                  </td>
                  <td className='p-2 border'>
                    <button
                      className='rounded-lg p-2 bg-red-500 text-white'
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='flex items-center justify-center w-full h-14 mt-10 text-xl mb-20 p-10 bg-green-500 rounded-lg'>
            No Employees Found
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeList
