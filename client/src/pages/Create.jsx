import React, { useState } from 'react';

function Create() {
  const [formData, setFormData] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: '', // Keep as string
  });
  const [image, setImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState(''); // State to hold response message

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'f_Designation') {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else if (e.target.type === 'checkbox') {
      const courseName = e.target.name;

      // Set f_Course to the name of the checked course, or empty string if unchecked
      setFormData((prevData) => ({
        ...prevData,
        f_Course: e.target.checked ? courseName : '',
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
    e.preventDefault(); // Prevent default form submission

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Append the image if it exists
    if (image) {
      data.append('f_Image', image);
    }

    // Send data to the endpoint
    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log(image)
    try {
      const response = await fetch('/api/employee/create', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      console.log(result) // Assuming the response is in JSON format
      setResponseMessage(result.message || 'Form submitted successfully!'); // Adjust based on your API response

      setTimeout(() => {
        setResponseMessage('');
      }, 2000);
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

          <div className="right flex items-start justify-start flex-col gap-2">
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
              />
              <label htmlFor="gender_male">Male</label>
              <input
                type="radio"
                onChange={handleRadioChange}
                id="gender_female"
                name="gender"
                value="F"
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
                checked={formData.f_Course === 'Bsc'} // Check if the course is selected
              />
              <label htmlFor="f_Course_Bsc">Bsc</label>
              <input
                type="checkbox"
                onChange={handleChange}
                id="f_Course_MCA"
                name="MCA"
                checked={formData.f_Course === 'MCA'} // Check if the course is selected
              />
              <label htmlFor="f_Course_MCA">MCA</label>
              <input
                type="checkbox"
                onChange={handleChange}
                id="f_Course_BCA"
                name="BCA"
                checked={formData.f_Course === 'BCA'} // Check if the course is selected
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
          </div>
        </div>
        <button type="submit" className='bg-green-400 w-96 h-10 rounded-lg p-2 mt-10 ml-[350px] mb-10'>Create</button>
      </form>

      
    </div>
  );
}

export default Create;
