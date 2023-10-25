import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Control from '../assets/control.png';
import Logo from '../assets/logo.png';

const Navbar = () => {

  const[open, setOpen] = useState(true);
  
  return (

    // <div className="max-w-[1366px] mx-auto">
    //   <div className="bg-white border-gray-200 dark:bg-gray-900 lg:shadow">
    //     <div className="flex flex-col lg:flex-row">
    //       <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 lg:border-b-0">
    //           <div className="">
    //             <Link to="/admin/dashboard">
    //               <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-700 dark:text-white">Seputar Dunia</span>
    //             </Link>
    //           </div>
    //           <div>
    //               <button onClick={() => setisOpen(!isOpen)} className="focus:outline-none text-dark-500 block lg:hidden">
    //                   <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    //                       <path className={!isOpen ? 'block' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    //                       <path className={isOpen ? 'block' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //                   </svg>
    //               </button>
    //           </div>
    //       </div>

    //       <div className={`${isOpen ? 'block' : 'hidden'} items-center lg:flex flex-col lg:flex-row justify-between w-full py-4 lg:px-8 lg:py-0`}>
    //           <div className="flex flex-col lg:flex-row">
                  
    //           </div>  
    //           <div className="flex flex-col lg:flex-row">
    //               <Link to="/admin/dashboard">
    //                 <div className="block px-4 py-3 lg:py-5 text-gray-900 lg:hover:bg-transparent hover:bg-gray-100">Dashboard</div>
    //               </Link>
    //               <Link to="/admin/kategoris">
    //                 <div className="block px-4 py-3 lg:py-5 text-gray-900 lg:hover:bg-transparent hover:bg-gray-100">Kategori</div>
    //               </Link>
    //               <Link to="/admin/beritas">
    //                 <div className="block px-4 py-3 lg:py-5 text-gray-900 lg:hover:bg-transparent hover:bg-gray-100">Berita</div>
    //               </Link>
    //               <Link to="/admin/about">
    //                 <div className="block px-4 py-3 lg:py-5 text-gray-900 lg:hover:bg-transparent hover:bg-gray-100">Tentang</div>
    //               </Link>
    //               <Link to="/">
    //                 <div className="block lg:pt-3 lg:pl-0 pl-2 lg:py-5 text-gray-900 lg:hover:bg-transparent hover:bg-gray-100">
    //                   <button className="py-2 px-5 text-white bg-red-600 border rounded-xl hover:scale-105 duration-300">
    //                     Logout
    //                   </button>
    //                 </div>
    //               </Link>
    //           </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className={`${open ? "w-62" : "w-20"} p-5 pt-8 duration-500 h-auto bg-sky-700 relative`}>
      <img onClick={()=>setOpen(!open)} src={Control} alt="" className={`absolute cursor-pointer -right-3 top-9 w-7 ${!open && "rotate-180"}`} />
      <div className="flex gap-x-4 items-center">
      <img src={Logo} alt="" className={`cursor-pointer duration-500 ${
          open && "rotate-[360deg]"
        }`} />
      <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>Inkel</h1>
      </div>
      <ul className="pt-6">
          <Link to="/admin/dashboard">
            <li className={`flex hover:ml-2 duration-500 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-microsoft" viewBox="0 0 16 16">
                <path d="M7.462 0H0v7.19h7.462V0zM16 0H8.538v7.19H16V0zM7.462 8.211H0V16h7.462V8.211zm8.538 0H8.538V16H16V8.211z" />
              </svg>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Dashboard
              </span>
            </li>
          </Link>
          <Link to="/admin/kategoris">
            <li className={`flex hover:ml-2 duration-500 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-menu-button" viewBox="0 0 16 16">
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h8A1.5 1.5 0 0 1 11 1.5v2A1.5 1.5 0 0 1 9.5 5h-8A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-8z" />
                <path d="m7.823 2.823-.396-.396A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
              </svg>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Kategori
              </span>
            </li>
          </Link>
          <Link to="/admin/artikel">
            <li className={`flex hover:ml-2 duration-500 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-newspaper" viewBox="0 0 16 16">
                <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
                <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
              </svg>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Artikel
              </span>
            </li>
          </Link>
          <Link to="/admin/rekomartikel">
            <li className={`flex hover:ml-2 duration-500 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-bookmark-check" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
              </svg>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Rekom
              </span>
            </li>
          </Link>
          <Link to="/admin/terbaruartikel">
            <li className={`flex hover:ml-2 duration-500 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-award" viewBox="0 0 16 16">
                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
              </svg>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Terbaru
              </span>
            </li>
          </Link>
          <Link to="/admin/komentar">
            <li className={`flex hover:ml-2 duration-500 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-chat-square-dots" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Komentar
              </span>
            </li>
          </Link>
          <Link to="/admin/akun">
            <li className={`flex hover:ml-2 duration-500 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              </svg>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Akun
              </span>
            </li>
          </Link>
          <Link to="/admin/profil">
            <li className={`flex hover:ml-2 duration-500 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Profil
              </span>
            </li>
          </Link>
      </ul>
    </div>

  );
}

export default Navbar;
