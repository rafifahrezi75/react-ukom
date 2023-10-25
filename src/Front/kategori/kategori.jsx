import { useState, useEffect } from 'react';

import api from '../../api';
import Pagination from '../../components/pagination';

import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import NavbarAdmin from '../navbarAdmin';

const Kategori = () => {

    const refresh = () => window.location.reload(true);

    const [kategoris, setKategoris] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchDataKategoris = async (page) => {

        const response = await api.get(`/api/kategoris?page=${page}`);
        const meta = response.data.data;

        setKategoris(response.data.data.data);
        setTotalPages(meta.last_page);

    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {

        fetchDataKategoris(currentPage);

    }, [currentPage]);

    const deleteKategori = async (id) => {
        
        await api.delete(`/api/kategoris/${id}`)
            .then(() => {
                
                fetchDataKategoris();
                Swal.fire(
                    'Success!',
                    'Data Kategori Berhasil Dihapus!',
                    'success'
                )
            })
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
                        <Link to="/admin/kategoris/create" className="px-2 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-white bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </Link>
                        <button onClick={refresh} className="px-2 py-2 bg-yellow-500 hover:bg-yellow-700 rounded-md ml-2">
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
                                        <th scope="col" className="px-6 py-3">Kategori</th>
                                        <th scope="col" className="px-6 py-3">Edit</th>
                                        <th scope="col" className="px-6 py-3">Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y bg-white text-left divide-gray-200 dark:divide-gray-700">
                                    {
                                        kategoris.length > 0
                                        ? kategoris.map((kategoris, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                                    {kategoris.kategori}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link to={`/admin/kategoris/edit/${kategoris.id}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button onClick={() => deleteKategori(kategoris.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
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
                                                                Data Kategori Belum Tersedia!
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
                </div>

                <div className="md:mt-2 mt-3 flex items-center justify-center">
                    <Pagination totalPages={totalPages} handleClick={handlePageClick} />
                </div>

            </div>

        </div>
        
    </>
    );
}

export default Kategori;
