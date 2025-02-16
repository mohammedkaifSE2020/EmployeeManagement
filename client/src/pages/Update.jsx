import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

//clg(data) -> Before Parsing
// {
//   "f_Course": [
//     "[\"MCA\", \"BCA\",\"Bsc\"]"
//   ],
//   "f_Designation": "Manager",
//   "f_Email": "kaifmohammed008@gmail.com",
//   "f_Id": "DealsDray6343",
//   "f_Image": "https://res.cloudinary.com/do7cexa1k/image/upload/v1728658477/c5mzh9l3pwkrzeinmxka.png",
//   "f_Mobile": 92849274534,
//   "f_Name": "kaif",
//   "f_gender": "M",
//   "updatedAt": "2024-10-11T14:54:38.156Z",
//   "__v": 0,
//   "_id": "67093a9c688d9dd47e8448b8"
// }

// console.log(formData) -> After parsing data
// {
//   "f_Course": [
//     "MCA",
//     "BCA",
//     "Bsc"
//   ],
//   "f_Designation": "Manager",
//   "f_Email": "kaifmohammed008@gmail.com",
//   "f_Mobile": 92849274534,
//   "f_Name": "kaif",
//   "f_gender": "M"
// }



function Update() {

  //fetch data from params 
  const location = useLocation();
  const data = location.state.data;
  const id = data._id;

  console.log(data)

  //parse f_Course string into an array
  //const parsedArray = JSON.parse(data.f_Course[0]);

  //setData in hook with initial values
  const [formData, setFormData] = useState({
    f_Name: data.f_Name,
    f_Email: data.f_Email,
    f_Mobile: data.f_Mobile,
    f_Designation: data.f_Designation,
    f_gender: data.f_gender,
    f_Course: data.f_Course || [], // Ensure it's initialized as an array
  });
  console.log(formData)
  
  const [image, setImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  // Handle input change
  // const handleChange = (e) => {
  //   const { id, value } = e.target;

  //   if (id === 'f_Designation') {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [id]: value,
  //     }));
  //   } else if (e.target.type === 'checkbox') {
  //     const courseName = e.target.name;

  //     // Add or remove course from the f_Course array
  //     setFormData((prevData) => {
  //       let updatedCourses = [...prevData.f_Course];

  //       // Add course if checked, remove if unchecked
  //       if (e.target.checked) {
  //         updatedCourses.push(courseName);
  //       } else {
  //         updatedCourses = updatedCourses.filter((course) => course !== courseName);
  //       }
  //       console.log(updatedCourses)
  //       return {
  //         ...prevData,
  //         f_Course: updatedCourses,
  //       };
  //     });
  //   } else {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [id]: value,
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { id, value, name } = e.target;
  
    if (id === 'f_Designation') {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else if (e.target.type === 'checkbox') {
      // Create a new array with the updated selections
      const updatedCourses = [];
  
      // Check the state of each checkbox and add to the array if checked
      if (document.getElementById('f_Course_Bsc').checked) {
        updatedCourses.push('Bsc');
      }
      if (document.getElementById('f_Course_MCA').checked) {
        updatedCourses.push('MCA');
      }
      if (document.getElementById('f_Course_BCA').checked) {
        updatedCourses.push('BCA');
      }
      
      // Update the formData with the new f_Course array
      setFormData((prevData) => ({
        ...prevData,
        f_Course: updatedCourses,
      }));

      
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };
  



  // Handle radio button change
  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      f_gender: e.target.value,
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, Array.isArray(formData[key]) ? JSON.stringify(formData[key]) : formData[key]); // Stringify arrays
    }

    if (image) {
      data.append('f_Image', image);
    }

    try {
      const response = await fetch(`/api/employee/update/${id}`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      setResponseMessage(result.message || 'Form updated successfully!');
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className='mt-10 mb-10'>
      {responseMessage && <div className="mt-5 text-center">{responseMessage}</div>}
      <form encType="multipart/form-data" className='' onSubmit={handleSubmit}>
        <div className='flex items-center justify-evenly bg-slate-400 pb-10 w-11/12 rounded-lg m-auto'>
          <div className="left flex items-start justify-start flex-col gap-2">
            <label className=' text-lg font-medium'>Name</label>
            <input
              type="text"
              onChange={handleChange}
              id="f_Name"
              value={formData.f_Name}
              className='border-gray-500 rounded-lg p-2 w-64'
            />

            <label className=' text-lg font-medium mt-5'>Email</label>
            <input
              type="email"
              onChange={handleChange}
              id="f_Email"
              value={formData.f_Email}
              className='border-gray-500 rounded-lg p-2 w-64'
            />

            <label className=' text-lg font-medium mt-5'>Mobile No</label>
            <input
              type="tel"
              onChange={handleChange}
              id="f_Mobile"
              value={formData.f_Mobile}
              className='border-gray-500 rounded-lg p-2 w-64'
            />
          </div>

          <div className="right flex items-start justify-start flex-col gap-2 mt-10">
            <label className=' text-lg font-medium mt-5'>Designation</label>
            <div>
              <select
                id="f_Designation"
                onChange={handleChange}
                value={formData.f_Designation}
                className='px-12 rounded-lg py-2 cursor-pointer'
              >
                <option value="">Select Designation</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <label className=' text-lg font-medium mt-5'>Gender</label>
            <div className='flex items-center justify-center gap-3'>
              <input
                type="radio"
                onChange={handleRadioChange}
                id="gender_male"
                name="gender"
                value="M"
                checked={formData.f_gender === 'M'}
              />
              <label htmlFor="gender_male">Male</label>
              <input
                type="radio"
                onChange={handleRadioChange}
                id="gender_female"
                name="gender"
                value="F"
                checked={formData.f_gender === 'F'}
              />
              <label htmlFor="gender_female">Female</label>
            </div>

            <label className=' text-lg font-medium mt-5'>Course</label>
            <div className='flex items-center justify-center gap-3'>
              <input
                type="checkbox"
                onChange={handleChange}
                id="f_Course_Bsc"
                name="Bsc"
                checked={formData.f_Course.includes('Bsc')} // Check if the course is selected
              />
              <label htmlFor="f_Course_Bsc">Bsc</label>
              <input
                type="checkbox"
                onChange={handleChange}
                id="f_Course_MCA"
                name="MCA"
                checked={formData.f_Course.includes('MCA')} // Check if the course is selected
              />
              <label htmlFor="f_Course_MCA">MCA</label>
              <input
                type="checkbox"
                onChange={handleChange}
                id="f_Course_BCA"
                name="BCA"
                checked={formData.f_Course.includes('BCA')} // Check if the course is selected
              />
              <label htmlFor="f_Course_BCA">BCA</label>
            </div>

            <label className=' text-lg font-medium mt-5'>Upload Image</label>
            <input
              type="file"
              id="f_Image"
              onChange={handleImageChange}
              className=''
            />
            <p className=' text-white'>Attention: Only .jpg and .png image formats</p>
            <p className=' text-white'>are accepted for upload. </p>
          </div>
        </div>
        <button type="submit" className='bg-green-400 w-96 h-10 rounded-lg p-2 mt-10 ml-[350px] mb-10'>Update</button>
      </form>
    </div>
  );
}

export default Update;
