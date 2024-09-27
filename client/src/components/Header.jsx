import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  let list1
  let list2

  const user = useSelector((state)=>state?.employee?.currentUser?.success)
  console.log(user)
  

  if(user){
    list1 = ['Home','Employeelist','Create']
    list2 = ['Logout']
  }else{
    list1 = ['Home']
    list2 = ['Signup','Login']
  }



  return (
    <div className=''>
      <br />
      <div className='m-auto p-5 flex items-center justify-between bg-slate-400 h-20 w-11/12 rounded-xl '>
      <div className="left">Logo</div>
      <div className="middle">
        <ul className=' flex justify-center items-center gap-3'>
          {
            list1.map((item)=>(
              <Link to={`/${item.toLowerCase()}`}>
                <li key={item}
                className=' cursor-pointer border-slate-100 bg-slate-100 text-black border-2 rounded-lg p-2 m-2'
                >{item}</li>
              </Link>
            ))
          }
        </ul>
      </div>
      <div className="right">
        <ul className=' flex justify-center items-center gap-3'>
        {
            list2.map((item)=>(
              <Link to={`/${item.toLowerCase()}`}>
                <li key={item}
                className=' cursor-pointer border-slate-100 bg-slate-100 text-black border-2 rounded-lg p-2 m-2'
                >{item}</li>
              </Link>
            ))
        }
        </ul>
      </div>
      </div>
      <br />
    </div>
  )
}

export default Header


//state object 
//"employee":
// {
//   "currentUser": {
//     "data": {
//       "f_Pwd": null,
//       "f_sno": "312966",
//       "f_userName": "userthree",
//       "__v": 0,
//       "_id": "66f62c9889bdec8ce811d52b",
//       "message": "Signup Successful",
//       "status": 200,
//       "success": true
//     },
//     "error": null,
//     "loading": false
//   }
// }
//}

