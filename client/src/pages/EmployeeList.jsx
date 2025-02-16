import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useEmployeeDelete from '../utils/handleUpdate';

function EmployeeList() {
   // For filtered employees
  const [searchQuery, setSearchQuery] = useState(''); // For search input
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' }); // For sorting
  const { listOfEmployees, filteredEmployees, deleteEmployee,setListOfEmployees,setFilteredEmployees } = useEmployeeDelete([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);  // For pagination
  const employeesPerPage = 5;  // Number of employees to display per page

  useEffect(() => {
    async function getData() {
      const response = await fetch('/api/employee/get', {
        method: 'GET',
      });
      const data = await response.json();
      setListOfEmployees(data.data);
      setFilteredEmployees(data.data); // Initialize filtered list with all employees
    }
    getData();
  }, [listOfEmployees,filteredEmployees]);

  
  const handleDelete = (id)=>{
    deleteEmployee(id);
  }

  const handleUpdate = (employee) => {
    navigate(`/update/${employee._id}`, { state: { data : employee  } });
  };

  // Sorting logic
  const sortEmployees = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {

      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }

      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }

      return 0;
    });

    setFilteredEmployees(sortedEmployees);
  };

  // Logic for displaying employees per page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Logic to calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter employees based on search query
    const filtered = listOfEmployees.filter((employee) =>
      employee.f_Name.toLowerCase().includes(query) ||
      employee.f_Email.toLowerCase().includes(query) ||
      employee.f_Designation.toLowerCase().includes(query) // You can add more fields as needed
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div>
      <div className='flex items-center justify-end mr-14'>
        <div className="w-full max-w-md mr-2">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="search"
              placeholder="Search by Name, Email, or Designation..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 text-gray-700 focus:outline-none"
            />
            <button className="bg-slate-400 text-white px-4 py-2 hover:bg-blue-600">
              Search
            </button>
          </div>
        </div>
        <h1 className='bg-slate-400 rounded-lg p-2'>Count <span>{filteredEmployees.length}</span></h1>
      </div>

      <div>
        {filteredEmployees.length > 0 ? (
          <>
            <table className='table-auto w-11/12 mx-auto mt-10 border-collapse'>
              <thead>
                <tr className='bg-slate-800 text-white'>
                  <th className='p-2 border cursor-pointer' onClick={() => sortEmployees('f_Id')}>
                    Id {sortConfig.key === 'f_Id' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className='p-2 border'>Image</th>
                  <th className='p-2 border cursor-pointer' onClick={() => sortEmployees('f_Name')}>
                    Name {sortConfig.key === 'f_Name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className='p-2 border cursor-pointer' onClick={() => sortEmployees('f_Email')}>
                    Email {sortConfig.key === 'f_Email' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className='p-2 border'>Mobile</th>
                  <th className='p-2 border'>Designation</th>
                  <th className='p-2 border'>Gender</th>
                  <th className='p-2 border'>Course</th>
                  <th className='p-2 border cursor-pointer' onClick={() => sortEmployees('createdAt')}>
                    Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className='p-2 border'>Update</th>
                  <th className='p-2 border'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
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
                    <td className='p-2 border'>{employee.f_Course.join(' ')}</td>
                    <td className='p-2 border'>{new Date(employee.createdAt).toLocaleDateString()}</td>
                    <td className='p-2 border'>
                      <button
                        className='rounded-lg p-2 bg-green-500 text-white'
                        onClick={() => handleUpdate(employee)}
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

            {/* Pagination Controls */}
            <div className='flex justify-center items-center mt-6'>
              <button
                className={`px-4 py-2 mx-2 ${currentPage === 1 ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className='px-4 py-2'>
                Page {currentPage} of {totalPages}
              </span>

              <button
                className={`px-4 py-2 mx-2 ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center w-full h-14 mt-10 text-xl mb-20 p-10 bg-green-500 rounded-lg'>
            No Employees Found
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
