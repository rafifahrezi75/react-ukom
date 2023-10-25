import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.png";

const NavbarUser = () => {

  const [ isOpen, setisOpen ] = useState(false);

  return (
    
    <div className="w-full mx-auto">
      <div className="bg-sky-700 border-gray-200 dark:bg-gray-900 lg:shadow">
        <div className="flex flex-col lg:flex-row">
          <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 lg:border-b-0">
              <div className="flex flex-row space-x-2">
                <img src={Logo} className="w-7 h-7 mt-0.5" alt="" />
                <Link to="/dashboard">
                  <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">INKEL</span>
                </Link>
              </div>
              <div>
                  <button onClick={() => setisOpen(!isOpen)} className="focus:outline-none text-dark-500 block lg:hidden">
                      <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path className={!isOpen ? 'block' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                          <path className={isOpen ? 'block' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                  </button>
              </div>
          </div>

          <div className={`${isOpen ? 'block' : 'hidden'} items-center lg:flex flex-col lg:flex-row justify-between w-full py-4 lg:px-8 lg:py-0`}>
              <div className="flex flex-col lg:flex-row">
                  
              </div>  
              <div className="flex flex-col lg:flex-row">
                  <Link to="/dashboard">
                    <div className="text-white block px-4 py-3 lg:py-5 lg:hover:bg-transparent hover:bg-sky-600">Dashboard</div>
                  </Link>
                  <Link to="/artikel">
                    <div className="text-white block px-4 py-3 lg:py-5 lg:hover:bg-transparent hover:bg-sky-600">Artikel</div>
                  </Link>
                  <Link to="/about">
                    <div className="text-white px-4 py-3 lg:py-5 lg:hover:bg-transparent hover:bg-sky-600">Tentang</div>
                  </Link>
              </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default NavbarUser;
