import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import api from '../../api';
import NavbarAdmin from "../navbarAdmin";

import Swal from "sweetalert2";

const ArtikelDetailAdmin = () => {

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

  const [image, setImage] = useState('');
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('');
  const [tgl, setTgl] = useState('');
  const [penulis, setPenulis] = useState('');
  const [para1, setPara1] = useState('');
  const [para2, setPara2] = useState('');
  const [para3, setPara3] = useState('');
  const [para4, setPara4] = useState('');

  const { id } = useParams();

  const fetchDetailArtikel= async () => {
        
    await api.get(`/api/artikels/${id}`)
        .then(response => {

            setJudul(response.data.data.judul);
            setImage(response.data.data.image);
            setKategori(response.data.data.kategori);
            setTgl(response.data.data.tgl);
            setPenulis(response.data.data.penulis);
            setPara1(response.data.data.para1);
            setPara2(response.data.data.para2);
            setPara3(response.data.data.para3);
            setPara4(response.data.data.para4);

        })
  };

  useEffect(() => {
      
    fetchDetailArtikel();

  }, []);

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
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-newspaper w-4 h-4 mr-2" viewBox="0 0 16 16">
                          <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
                          <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
                        </svg>
                        Artikel
                      </span>
                    </li>
                    <li className="lg:block hidden">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                        <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Detail Artikel</span>
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

          <div className="m-4 p-4 bg-white rounded-md shadow dark:border-gray-700 dark:shadow-gray-900">
            <div className="border-l-4 border-emerald-500 bg-neutral-50 rounded-r-lg">
              <h1 className="font-bold text-xl p-3 md:text-start text-center">{judul}</h1>
            </div>
            <hr className="mt-4 mb-3" />
            <div className="items-start">
              <img className="mb-3 object-cover w-full rounded-lg h-96 md:h-auto md:w-96 md:rounded-md" src={image} alt="" />
            </div>
            <div className="mx-1 text-lg font-semibold mb-0.5">
              <span className="inline-block h-3.5 border-l-2 border-sky-600 mr-2"></span>
              {kategori}
            </div>
            <div className="mx-1 break-all">
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
                {para1}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
                {para2}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify ">
                {para3}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
                {para4}
              </p>
              {/* <p className="mx-mb-3 fontal text-gray-700 dark:text-gray-400 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, incidunt earum suscipit dolor modi ratione error eligendi neque omnis recusandae, rem quas illo vitae aperiam nostrum animi cum et! Nostrum.
              </p> */}
            </div>

            <div className="flex md:flex-row mb-4 flex-col items-center text-center justify-between bg-neutral-100 rounded-md">
              <div className="flex m-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-2 text-[#333333] bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>
                <p className="font-medium text-[#333333] dark:text-white">by : {penulis}</p>
              </div>
              <div className="flex m-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-2 text-slate-800 bi bi-calendar3" viewBox="0 0 16 16">
                  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
                <p className="font-medium text-slate-800 dark:text-white">
                  {tgl}
                </p>
              </div>
            </div>

            <Link to="/admin/artikel">
              <button className="px-4 py-2 text-sm bg-neutral-500 hover:bg-neutral-700 text-white rounded-md">
                Back
              </button>
            </Link>
          </div>
        </div>

      </div>
      
    </>
  );
}

export default ArtikelDetailAdmin;
