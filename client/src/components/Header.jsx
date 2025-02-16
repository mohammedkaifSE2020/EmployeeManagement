import React from 'react';
import { useSelector } from 'react-redux';
import Menu from './Menu';

function Header() {
  const user = useSelector((state) => state.employee?.currentUser?.success);
  const list1 = user ? ['Home', 'Employeelist', 'Create'] : ['Home'];
  const list2 = user ? ['Logout'] : ['Signup', 'Login'];

  return (
    <header className='fixed top-0 left-0 w-11/12 ml-16 text-white z-50 mt-5'>
      <div className='m-auto p-5 flex items-center justify-between bg-slate-400 h-20 w-11/12 rounded-xl'>
        <div className="left">Logo</div>
        <nav className="middle">
          <Menu items={list1} />
        </nav>
        <div className="right">
          <Menu items={list2} />
        </div>
      </div>
    </header>
  );
}

export default Header;
