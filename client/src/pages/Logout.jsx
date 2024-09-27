import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {login} from "../store/employeeSlice.js"

function Logout() {
    const dispatch = useDispatch();
    useEffect(()=>{
        const handleLogout = () =>{
            const data = {
                data: null,
                  message: "Logout",
                  status: 400,
                  success: false
            }
            dispatch(login(data));
        }
        handleLogout();
    },[]);
  return (
    <div className=''>
      <h1 className='pt-2 bg-slate-400 rounded-xl w-11/12 h-14 text-white text-center text-2xl mt-10 m-auto ' >Thankyou</h1>
      <br />
    </div>
  )
}

export default Logout
