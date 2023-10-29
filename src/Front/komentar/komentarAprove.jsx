import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import NavbarAdmin from '../navbarAdmin';

import api from '../../api';

import Swal from 'sweetalert2';

const KomentarAprove = () => {

  const [user, setUser] = useState({});

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {

        const fetchData = async () => {

          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          await api.get('/api/user')
          .then((response) => {

              setUser(response.data);
              if (response.data.role === 'user') {
                navigate('/dashboard');
              };
          })
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

  const [name, setName] = useState('');
  const [tglkomen, setTglKomen] = useState('');
  const [statuskomen, setStatusKomen] = useState('1');
  const [komentar, setKomentar] = useState('');

  const [errors, setErrors] = useState([]);

  const { id } = useParams();

  const fetchDetailKomentar = async () => {
        
    await api.get(`/api/komentars/${id}`)
        .then(response => {

          setName(response.data.data.name);
          setTglKomen(response.data.data.tglkomen);
          setStatusKomen(response.data.data.statuskomen);
          setKomentar(response.data.data.komentar);
        })
  };

  useEffect(() => {
      
    fetchDetailKomentar();

  }, []);

  const handleOptionChange = (e) => {
    setStatusKomen(e.target.value);
  };

  const aproveKomentar = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append('statuskomen', statuskomen);
    formData.append('_method', 'PUT')

    await api.post(`/api/komentars/${id}`, formData)
        .then(() => {
            
            navigate('/admin/komentar');
            Swal.fire(
              'Success!',
              'Komentar Berhasil Aprove!',
              'success'
          )

        })
        .catch(error => {
            
            setErrors(error.response.data);
        })
  };


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
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-chat-square-dots w-4 h-4 mr-2" viewBox="0 0 16 16">
                          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                          <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                        Komentar
                      </span>
                      </li>
                      <li className="lg:block hidden">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                          <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Aprove Komentar</span>
                        </div>
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
            <div className="bg-white rounded-md">
              <div className="mx-2 w-full p-2 justify-center items-center">
                <article className="p-6 bg-neutral-100 my-2 mr-4 text-base rounded-lg dark:bg-gray-900 border-sm border-red-500">
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                          <div className="inline-flex items-center mr-2 justify-center w-10 h-10 overflow-hidden bg-blue-500 rounded-full dark:bg-gray-600">
                            <span className="font-medium text-white dark:text-gray-300">{name[0]}</span>
                          </div>
                          {name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tglkomen}</p>
                    </div>
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">{komentar}</p>
                </article>

                <form onSubmit={aproveKomentar} className="mt-6">

                  <div className="mb-6">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium">
                      Status Komentar
                    </label>
                    <div className="flex fle-col space-x-6">
                      <label className="flex items-center">
                        <input type="radio" checked={parseInt(statuskomen) === 1} onChange={handleOptionChange} className="form-radio text-rose-700 h-4 w-4" name="options" value="1"/>
                        <span className="ml-2 py-3 text-sm focus:outline-none leading-none px-3 font-medium text-rose-700 bg-rose-100 rounded-md">
                          Ditolak
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" checked={parseInt(statuskomen) === 2} onChange={handleOptionChange} className="form-radio text-yellow-700 h-4 w-4" name="options" value="2"/>
                        <span className="ml-2 py-3 text-sm focus:outline-none leading-none px-3 font-medium text-yellow-700 bg-yellow-100 rounded-md">
                          Menunggu
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" checked={parseInt(statuskomen) === 3} onChange={handleOptionChange} className="form-radio text-emerald-700 h-4 w-4" name="options" value="3"/>
                        <span className="ml-2 py-3 text-sm focus:outline-none leading-none px-3 font-medium text-emerald-700 bg-emerald-100 rounded-md">
                          Disetujui
                        </span>
                      </label>
                      {
                        errors.statuskomen && (
                          <div className="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                              <span className="font-medium">{errors.statuskomen[0]}</span>
                          </div>
                        )
                      }
                    </div>
                  </div>

                  <Link to="/admin/komentar">
                    <button className="px-4 py-2 text-sm bg-neutral-500 hover:bg-neutral-700 text-white rounded-md">
                      Back
                    </button>
                  </Link>
                  <button className="ml-2 px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
                    Store
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>

      </div>

    </>
  );
}

export default KomentarAprove;
