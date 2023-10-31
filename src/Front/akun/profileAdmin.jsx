import NavbarAdmin from '../navbarAdmin';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../../api';

import Swal from 'sweetalert2';

const ProfileAdmin = () => {

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const roles = localStorage.getItem("roles");

    useEffect(() => {

      const fetchData = async () => {

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await api.get('/api/user')
        .then((response) => {

            setUser(response.data);
        })
      };

      if(roles) {
        navigate('/dashboard');
      };

        if(!token) {
        navigate('/');
        } else
        {
        fetchData();
        };

    }, []);
    
    const logoutHanlder = async () => {

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        await api.post('/api/logout')
        .then(() => {
    
            localStorage.removeItem("token");
    
            navigate('/');
            Swal.fire(
                'Success!',
                'Logout Berhasil !',
                'success'
            )
        });
    };

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>

      <div className="flex">
        {isSidebarOpen && <NavbarAdmin />}
        <div className={`flex-1 w-full ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
          <nav toggleSidebar={toggleSidebar} className="bg-white flex justify-between px-5 py-3 h-[48px] text-gray-700 dark:bg-[#1E293B]">
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
                <div className={`mt-1 duration-500 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
                  <ul className="inline-flex items-center space-x-1 md:space-x-3">
                      <li className="inline-flex items-center">
                      <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-person-fill h-4 w-4 mr-2" viewBox="0 0 16 16">
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg>
                          Profil
                        </span>
                      </li>
                  </ul>
                </div>
              </div>
              <div className="font-medium text-md flex flex-row">
                <div className="lg:block hidden mt-0.5">
                  {user.name}
                  <span className="border-r-4 border-sky-700 ml-2"></span>
                </div>
                <div className="ml-2">
                  <button onClick={logoutHanlder} className="bg-sky-600 rounded-md text-white px-2 py-0.5 hover:scale-105 duration-300">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
            <div className="mt-4 mx-8">
              <div class="flex items-center justify-center bg-white rounded-md">
                <div className="mx-auto w-full p-8 justify-center items-center">
                  <div className="utama">
                      <h2 className="font-semibold text-2xl my-4 text-stone-800">
                          Profil Saya
                      </h2>
                      <hr />
                      <div className="flex">
                        <div className="w-auto">
                          <span className="inline-flex mx-auto my-8 items-center justify-center w-48 h-48 overflow-hidden bg-sky-500 rounded-full dark:bg-gray-600">
                            <span className="font-medium text-8xl text-white dark:text-gray-300">
                              {user?.name?.[0] || ''}
                            </span>
                          </span>
                        </div>
                        <div className="ml-32 flex">
                          <div>
                            <p className="font-semibold text-sm mt-12 text-gray-600">Name :</p>
                            <h1 className="font-bold text-3xl text-gray-800 mt-2">{user.name}</h1>
                            <p className="font-semibold text-sm mt-8 text-gray-600">Email :</p>
                            <p className="font-bold text-3xl text-gray-800 mt-2">{user.email}</p>
                          </div>
                          <div className="ml-12">
                            <p className="font-semibold text-sm mt-12 text-gray-600">Role :</p>
                            <h1 className="font-bold text-3xl text-gray-800 mt-2 uppercase">{user.role}</h1>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

    </>
  );
}

export default ProfileAdmin;
