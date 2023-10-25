import NavbarAdmin from "../navbarAdmin";
import Pagination from '../../components/pagination';

import { useState, useEffect } from 'react';

import api from '../../api';

const Akun = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const refresh = () => window.location.reload(true);

  const [users, setUsers] = useState([]);
    
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDataUsers = async (page) => {

      const response = await api.get(`/api/users?page=${page}`);
      const meta = response.data.data;

      setUsers(response.data.data.data);
      setTotalPages(meta.last_page);

  };

  const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
  };

  useEffect(() => {

    fetchDataUsers(currentPage);

  }, [currentPage]);

  return (
    <>

      <div className="flex">
        {isSidebarOpen && <NavbarAdmin />}

        <div className={`flex-1 w-full ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
          <nav toggleSidebar={toggleSidebar} className="flex justify-between px-5 py-3 h-[48px] text-gray-700 bg-white dark:bg-[#1E293B]">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex">
                <button className="lg:mr-8 mr-2" onClick={toggleSidebar}>
                  <svg
                    className="w-6 h-6 text-blue-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </button>
                <div className={`mt-1 duration-500 lg:ml-0 ml-2 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
                  <ul className="inline-flex items-center space-x-1 md:space-x-3">
                      <li className="inline-flex items-center">
                      <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-people-fill w-4 h-4 mr-2" viewBox="0 0 16 16">
                          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        </svg>
                          Akun
                      </span>
                      </li>
                  </ul>
                </div>
              </div>
              <div className="font-medium text-md flex flex-row">
                  <div className="lg:block hidden mt-0.5">
                      John Doe
                      <span className="border-r-4 border-sky-700 ml-2"></span>
                  </div>
                  <div className="ml-2">
                      <button className="bg-sky-600 rounded-md text-white px-2 py-0.5 hover:scale-105 duration-300">
                          Logout
                      </button>
                  </div>
              </div>
            </div>
          </nav>

          <div className="mt-4 mx-8">
            <div className="flex justify-start pb-2">
              <button onClick={refresh} className="px-2 py-2 bg-yellow-500 hover:bg-yellow-700 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-white bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="border rounded-md shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-100 dark:bg-gray-700 text-left text-xs font-medium text-stone-800 uppercase">
                        <tr>
                          <th scope="col" className="px-6 py-3">Akun</th>
                          <th scope="col" className="px-6 py-3">Email</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y bg-white text-left divide-gray-200 dark:divide-gray-700">
                          {
                              users.length > 0
                              ? users.map((users, index) => (
                                  <tr key={index}>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm leading-none text-gray-600 font-medium dark:text-gray-200">
                                          {users.name}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm leading-none text-gray-600">
                                          {users.email}
                                        </div>
                                      </td>
                                  </tr>
                                  ))
                                  :   
                                  <tr>
                                      <td colSpan="3" className="pt-2 text-center">
                                          <div className="min-h-[15rem] flex flex-col bg-white rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                                              <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                                                  <svg className="max-w-[5rem]" viewBox="0 0 375 428" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M254.509 253.872L226.509 226.872" className="stroke-gray-400 dark:stroke-white" stroke="currentColor" strokeWidth={7} strokeLinecap="round" />
                                                  <path d="M237.219 54.3721C254.387 76.4666 264.609 104.226 264.609 134.372C264.609 206.445 206.182 264.872 134.109 264.872C62.0355 264.872 3.60864 206.445 3.60864 134.372C3.60864 62.2989 62.0355 3.87207 134.109 3.87207C160.463 3.87207 184.993 11.6844 205.509 25.1196" className="stroke-gray-400 dark:stroke-white" stroke="currentColor" strokeWidth={7} strokeLinecap="round" />
                                                  <rect x="270.524" y="221.872" width="137.404" height="73.2425" rx="36.6212" transform="rotate(40.8596 270.524 221.872)" className="fill-gray-400 dark:fill-white" fill="currentColor" />
                                                  <ellipse cx="133.109" cy="404.372" rx="121.5" ry="23.5" className="fill-gray-400 dark:fill-white" fill="currentColor" />
                                                  <path d="M111.608 188.872C120.959 177.043 141.18 171.616 156.608 188.872" className="stroke-gray-400 dark:stroke-white" stroke="currentColor" strokeWidth={7} strokeLinecap="round" />
                                                  <ellipse cx="96.6084" cy="116.872" rx={9} ry={12} className="fill-gray-400 dark:fill-white" fill="currentColor" />
                                                  <ellipse cx="172.608" cy="117.872" rx={9} ry={12} className="fill-gray-400 dark:fill-white" fill="currentColor" />
                                                  <path d="M194.339 147.588C189.547 148.866 189.114 142.999 189.728 138.038C189.918 136.501 191.738 135.958 192.749 137.131C196.12 141.047 199.165 146.301 194.339 147.588Z" className="fill-gray-400 dark:fill-white" fill="currentColor" />
                                                  </svg>
                                                  <p className="mt-5 text-sm text-gray-500 dark:text-gray-500">
                                                      Data Akun Belum Tersedia!
                                                  </p>
                                              </div>
                                          </div>
                                      </td>
                                  </tr>
                          }
                      </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:mt-2 mt-3 mb-4 flex items-center justify-center">
              <Pagination totalPages={totalPages} handleClick={handlePageClick} />
            </div>
          </div>

        </div>

      </div>

    </>
  );
}

export default Akun;