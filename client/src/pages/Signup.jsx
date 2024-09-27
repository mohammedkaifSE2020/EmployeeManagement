import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {login} from "../store/employeeSlice.js"

function Signup() {

  const [formData,setFormData] = useState({});
  const [message,setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChnage = (e)=>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  }

  const handleSignup = async(e)=>{
      e.preventDefault();

      const res = await fetch('/api/auth/signup',{
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData),
      })
      const data = await res.json();
      console.log(data);
      setMessage(data.message);

      dispatch(login(data));

      data.success ? navigate('/home') : console.log("Navigation failed"); 
      
      console.log(message)
  }

  return (
    <div className='flex items-center justify-center gap-5 rounded-lg w-10/12 m-auto mb-10'>
  {/* <!-- Left Section --> */}
  <div className="left flex items-center justify-center rounded-lg w-6/12 bg-slate-700 pt-40 pb-40 mb-5 text-white-200">
    <div className="ml-20 text-4xl font-bold leading-relaxed text-white">
      <h1 className=' text-emerald-600'>Solution for</h1>
      <h1>Creative</h1>
      <h1>Collaboration</h1>
      <h1 className='text-base font-thin w-11/12'>
        Elevate your team management with our sophisticated platform. Seamlessly streamline CRUD operations on employee data to enhance collaboration and drive productivity.
      </h1>
    </div>
  </div>

  {/* <!-- Right Section --> */}
  <div className="right flex items-center justify-center rounded-lg flex-col w-6/12">
  <div>
    {message}
  </div>
    <div className="form-heading text-3xl font-bold leading-normal">
      <h1>Step Into Seamless Team Management</h1>
      <h1>Create Your Account!</h1>
    </div>
    <form className='flex rounded-lg flex-col gap-5 mt-5 w-10/12 mb-5 mr-20'>
      <p>Username</p>
      <input type="text" id="f_userName" onChange={handleChnage} value={formData.f_userName} className='border-gray-500 rounded-lg p-2' />
      <p>Password</p>
      <input type="password" id="f_Pwd" onChange={handleChnage} value={formData.f_Pwd} className='border-gray-500 rounded-lg p-2'/>
      <button type="submit" onClick={handleSignup} className=' bg-green-400 w-full h-10 rounded-lg p-2 mt-5'>Sign-Up</button>
    </form>
    <h1 className='mb-10 mr-20'>Already have an account?
      <Link to={'/login'}>
      <span className=' text-green-900'>Login</span>
      </Link>
    </h1>
  </div>
</div>

  )
}

export default Signup

//response from api
// {
      //   "data": {
      //     "f_Pwd": null,
      //     "f_sno": "208763",
      //     "f_userName": "userone",
      //     "__v": 0,
      //     "_id": "66f62a9e89bdec8ce811d527"
      //   },
      //   "message": "Signup Successful",
      //   "status": 200,
      //   "success": true
      // }
