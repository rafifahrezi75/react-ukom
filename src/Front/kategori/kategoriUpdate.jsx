import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import api from '../../api';

import NavbarAdmin from '../navbarAdmin';

import Swal from 'sweetalert2';

const KategoriUpdate = () => {

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

  const [kategori, setKategori] = useState('');

  const [errors, setErrors] = useState([]);

  const { id } = useParams();

  const fetchDetailKategori = async () => {
        
    await api.get(`/api/kategoris/${id}`)
        .then(response => {

            setKategori(response.data.data.kategori);
        })
  };

  useEffect(() => {
      
    fetchDetailKategori();

  }, []);

  const updateKategori = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append('kategori', kategori);
    formData.append('_method', 'PUT')

    await api.post(`/api/kategoris/${id}`, formData)
        .then(() => {
            
            navigate('/admin/kategoris');
            Swal.fire(
              'Success!',
              'Data Artikel Berhasil Diupdate!',
              'success'
          )

        })
        .catch(error => {
            
            setErrors(error.response.data);
        })
  };

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };


  return (
    <>

    {/* <div className="flex">
      <Navbar />

      <div className="w-screen h-screen">
        <nav className="flex justify-between px-5 py-3 h-[48px] text-gray-700 bg-white dark:bg-[#1E293B]" aria-label="Breadcrumb">
          <div>
            <ul className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
              <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-menu-button w-4 h-4 mr-2" viewBox="0 0 16 16">
                      <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h8A1.5 1.5 0 0 1 11 1.5v2A1.5 1.5 0 0 1 9.5 5h-8A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-8z" />
                      <path d="m7.823 2.823-.396-.396A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                  </svg>
                  Kategori
              </span>
              </li>
              <li className="lg:block hidden">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Update Kategori</span>
                </div>
              </li>
            </ul>
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
        </nav>

        <div className="mt-4 mx-8">
          <form onSubmit={updateKategori} className="p-4 bg-white rounded-md shadow dark:border-gray-700 dark:shadow-gray-900">
            <div className="space-y-6">
              <div className="mb-4">
                <label htmlFor="kategori" className="block mb-2 text-sm font-medium">
                  Kategori
                </label>
                <input type="text" value={kategori} onChange={(e) => setKategori(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
                {
                  errors.kategori && (
                    <div class="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span class="font-medium">{errors.kategori[0]}</span>
                    </div>
                  )
                } 
              </div>
              <div className="my-4 space-x-2">
                <Link to="/admin/kategoris">
                  <button className="px-4 py-2 text-sm bg-neutral-500 hover:bg-neutral-700 text-white rounded-md">
                    Back
                  </button>
                </Link>
                <button className="px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
                  Store
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div> */}

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
              <div className={`mt-1 duration-500 lg:ml-0 ml-2 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
                  <ul className="inline-flex items-center space-x-1 md:space-x-3">
                      <li className="inline-flex items-center">
                      <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-menu-button w-4 h-4 mr-2" viewBox="0 0 16 16">
                              <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h8A1.5 1.5 0 0 1 11 1.5v2A1.5 1.5 0 0 1 9.5 5h-8A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-8z" />
                              <path d="m7.823 2.823-.396-.396A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                          </svg>
                          Kategori
                      </span>
                      </li>
                      <li className="lg:block hidden">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                          <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Update Kategori</span>
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
          <form onSubmit={updateKategori} className="p-4 bg-white rounded-md shadow dark:border-gray-700 dark:shadow-gray-900">
            <div className="space-y-6">
              <div className="mb-4">
                <label htmlFor="kategori" className="block mb-2 text-sm font-medium">
                  Kategori
                </label>
                <input type="text" value={kategori} onChange={(e) => setKategori(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
                {
                  errors.kategori && (
                    <div class="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span class="font-medium">{errors.kategori[0]}</span>
                    </div>
                  )
                } 
              </div>
              <div className="my-4 space-x-2">
                <Link to="/admin/kategoris">
                  <button className="px-4 py-2 text-sm bg-neutral-500 hover:bg-neutral-700 text-white rounded-md">
                    Back
                  </button>
                </Link>
                <button className="px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
                  Store
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>

    </div>

    </>
  );
}

export default KategoriUpdate;
