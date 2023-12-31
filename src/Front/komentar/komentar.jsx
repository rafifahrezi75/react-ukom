import { Link, useNavigate } from 'react-router-dom';
import NavbarAdmin from '../navbarAdmin';
import { useState, useEffect } from 'react';
import api from '../../api';
import Swal from 'sweetalert2';
import Pagination from '../../components/pagination';

const Komentar = () => {

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

  const refresh = () => window.location.reload(true);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [komentars, setKomentars] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDataKomentars = async (page) => {

      const response = await api.get(`/api/komentars?page=${page}`);
      const meta = response.data.data;

      setKomentars(response.data.data.data);
      setTotalPages(meta.last_page);
      setLoading(false);

  };
  
  const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
  };

  useEffect(() => {

    setTimeout(() => {
      fetchDataKomentars(currentPage);
    }, 1000);

  }, [currentPage]);

  const deleteKomentar = async (id) => {
        
    await api.delete(`/api/komentars/${id}`)
        .then(() => {
            
            fetchDataKomentars();
            setLoading(false);
            Swal.fire(
                'Success!',
                'Data Komentar Berhasil Dihapus!',
                'success'
            )
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
              <div className="flex justify-start pb-2">
                <button onClick={refresh} className="px-2 py-2 bg-yellow-500 hover:bg-yellow-700 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-white bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                  </svg>
                </button>
              </div>
              <div className="mb-2 flex flex-row justify-between">
                <select onChange={(e) => setFilterStatus(parseInt(e.target.value))} className="lg:w-sm w-[180px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>Pilih Status</option>
                  <option value={1}>Ditolak</option>
                  <option value={2}>Menunggu</option>
                  <option value={3}>Disetujui</option>
                </select>
                <form className="lg:w-sm w-[180px] mr-1">
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="search" id="search-nama" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari nama..." required />
                  </div>
                </form>
                
              </div>
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-md shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-left text-xs font-medium text-stone-800 uppercase">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Nama
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Aprove
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y bg-white text-left divide-gray-200 dark:divide-gray-700">
                        {loading ? (
                          <tr>
                            <td colSpan={8} className="text-center items-center h-[249px]">
                              <div role="status">
                                <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                              </div>
                            </td>
                          </tr>
                          ) : (
                            
                              komentars.length > 0
                              ? komentars
                              .filter(
                                search.toLowerCase() === ''
                                ? 
                                (item) => 
                                  filterStatus !== '' ? item.statuskomen === filterStatus : item
                                :
                                (item) => {
                                  return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
                                }
                              ).map((komentars, index) => (
                                      <tr key={index}>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm leading-none text-gray-600 font-medium dark:text-gray-200">
                                              {komentars.name}
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">  
                                            <Link  to={`/admin/komentar/aprove/${komentars.id}`} className="px-4 py-2">
                                              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="mx-2 w-6 h-6 bi bi-list text-indigo-400" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                              </svg>
                                            </Link>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                            {komentars.statuskomen === 1 ? (
                                              <div className="flex py-3 px-3 max-w-fit text-sm focus:outline-none leading-none font-medium text-rose-700 bg-rose-100 rounded-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-x-circle w-5 h-5 mr-3" viewBox="0 0 16 16">
                                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                                <span className="mt-[3px]">Ditolak</span>
                                              </div>
                                            ) : komentars.statuskomen === 2 ? (
                                              <div className="flex py-3 px-3 max-w-fit text-sm focus:outline-none leading-none font-medium text-yellow-700 bg-yellow-100 rounded-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-question-circle w-5 h-5 mr-3" viewBox="0 0 16 16">
                                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />  
                                                  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                                                </svg>
                                                <span className="mt-[3px]">Menunggu</span>
                                              </div>
                                            ) : komentars.statuskomen === 3 ? (
                                              <div className="flex py-3 px-3 max-w-fit text-sm focus:outline-none leading-none font-medium text-emerald-700 bg-emerald-100 rounded-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-check-circle w-5 h-5 mr-3" viewBox="0 0 16 16">
                                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                                </svg>
                                                <span className="mt-[3px]">Disetujui</span>
                                              </div>
                                            ) : null
                                            }
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                            <button  onClick={() => deleteKomentar(komentars.id)} className="px-4 py-2">
                                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                              </svg>
                                            </button>
                                          </td>
                                      </tr>
                                      ))
                                      :  
                                      <tr>  
                                        <td colSpan="8" className="pt-2 text-center">
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
                                                Data Komentar Belum Tersedia!
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                    </tr>
                            
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:mt-2 mt-3 mb-2 flex items-center justify-center">
              <Pagination totalPages={totalPages} handleClick={handlePageClick} />
            </div>


          </div>

      </div>

    </>
  );
}

export default Komentar;
