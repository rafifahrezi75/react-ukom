import { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

import Logo from "../../assets/logo.png";

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/pagination';

import Footer from '../../components/footer';

const AllArtikel = () => {

  const token = localStorage.getItem("token");
  const roles = localStorage.getItem("roles");
  const captcha = localStorage.getItem("_grecaptcha");

  const [search, setSearch] = useState('');
  const [filterKategori, setFilterKategori] = useState('');

  const [kategoris, setKategoris] = useState([]);

  const fetchDataKategoris = async () => {

    await api.get('/api/kategoris')
        .then(response => {
            setKategoris(response.data.data.data);
        })

  }

  useEffect(() => {

      fetchDataKategoris();

  }, []);

  const refresh = () => window.location.reload(true);

  const [artikels, setArtikels] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDataArtikels = async (page) => {

    const response = await api.get(`/api/indexartikel?page=${page}`);
    const meta = response.data.data;

    setArtikels(response.data.data.data);
    setTotalPages(meta.last_page);
    
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {

      fetchDataArtikels(currentPage);

  }, [currentPage]);

  const getRandomColorClass = () => {
    const colorClasses = ['text-red-600', 'text-blue-600', 'text-green-600', 'text-yellow-600', 'text-cyan-600', 'text-amber-600', 'text-sky-600', 'text-emerald-600', 'text-lime-600'];
    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
  };

  const navigate = useNavigate();

  const logoutHandler = async () => {

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    await api.post('/api/logout')
    .then(() => {

      localStorage.removeItem("token");
      localStorage.removeItem("roles");
      localStorage.removeItem("_grecaptcha");

        navigate('/dashboard');
        Swal.fire(
            'Success!',
            'Logout Berhasil !',
            'success'
        )
    });
  };

  const [ isOpen, setisOpen ] = useState(false);

  return (
    <>

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
                    {
                      token ? (
                        <Link to="/historykomentar">
                          <div className="text-white px-4 py-3 lg:py-5 lg:hover:bg-transparent hover:bg-sky-600">Komentar</div>
                        </Link>
                        ) : (
                        null
                      )
                    }
                    {
                      token ? (
                        <Link to="/like">
                          <div className="text-white px-4 py-3 lg:py-5 lg:hover:bg-transparent hover:bg-sky-600">Like</div>
                        </Link>
                        ) : (
                        null
                      )
                    }
                    {
                      token ? (
                        <button onClick={logoutHandler} className="bg-sky-600 rounded-md text-white my-3 px-2 py-0.5 lg:hover:scale-105 duration-300">
                            Logout
                        </button>
                        ) : (
                        null
                      )
                    }
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex item-center justify-center mt-10 lg:mx-14 mx-4 space-x-1">

        <form className="w-full">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="htt   ww.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
            onChange={(e) => setSearch(e.target.value)}
            type="search" id="search-artikelall" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Artikel..." required />
          </div>
        </form>

        <button onClick={refresh} className="px-4 border border-gray-300 bg-slate-50 hover:bg-slate-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-black bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </button>

        <select onChange={(e) => setFilterKategori(parseInt(e.target.value))} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option>Pilih Kategori</option>
          {
            kategoris.map((kategoris, index) => (
              <option key={index} value={kategoris.id}>{kategoris.kategori}</option>
            ))
          }
        </select>

      </div>

      <div className="container my-10 mx-auto md:px-6">
        <section className="mb-24 text-center">
          <h2 className="mb-6 pb-4 text-center text-3xl font-semibold text-stone-800">
            Semua Artikel
          </h2>

          <div className="grid md:mx-0 mx-4 md:grid-cols-3 grid-cols-1 gap-x-12 gap-y-6 -mb-12">
          {
            artikels.filter(
              search.toLowerCase() === ''
              ? 
              (item) => 
                filterKategori !== '' ? item.idkategori === filterKategori : item
              :
              (item) => {
                return search.toLowerCase() === '' ? item : item.judul.toLowerCase().includes(search)
              }
            ).map((artikels, index) => (

              <div key={index} className="md:hover:scale-[1.01] transition duration-300 ease-in-out">
                <div className="relative block rounded-lg bg-white h-full shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <div className="flex">
                    <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                      <img src={artikels.image} alt="" className="w-full" />
                      <div>
                        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className={`text-sm font-semibold ${getRandomColorClass()} dark:text-primary-400`}>{artikels.kategori}</p>
                    <h5 className="mb-3 text-lg font-bold text-stone-800 line-clamp-2">{artikels.judul}</h5>
                    <p className="mb-4 text-indigo-500 dark:text-white-300">
                      <small>Published <u>{artikels.tgl}</u> by
                      <span> {artikels.penulis}</span></small>
                    </p>
                    <p className="mb-4 pb-2 lg:line-clamp-3 line-clamp-2 leading-8 text-gray-600 dark:text-gray-200">
                      {artikels.para1}
                    </p>
                    <Link to={`/artikel/detail/${artikels.id}`}>
                      <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                        Read more
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
          </div>

          {/* <div className="grid gap-6 lg:grid-cols-3 xl:gap-x-12 lg:mx-0 mx-4">
            <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
              <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex">
                  <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/027.webp" alt="" className="w-full" />
                    <div>
                      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                  <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                  <p className="mb-4 text-indigo-500 dark:text-white-300">
                    <small>Published <u>13.01.2022</u> by
                      <div>Anna Maria Doe</div></small>
                  </p>
                  <p className="mb-4 pb-2">
                    Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                    placerat vulputate. Ut vulputate est non quam dignissim
                    elementum. Donec a ullamcorper diam.
                  </p>
                  <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                    more</div>
                </div>
              </div>
            </div>
            <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
              <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex">
                  <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/029.webp" alt="" className="w-full" />
                    <div>
                      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                  <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                  <p className="mb-4 text-indigo-500 dark:text-white-300">
                    <small>Published <u>13.01.2022</u> by
                      <div>Anna Maria Doe</div></small>
                  </p>
                  <p className="mb-4 pb-2">
                    Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                    placerat vulputate. Ut vulputate est non quam dignissim
                    elementum. Donec a ullamcorper diam.
                  </p>
                  <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                    more</div>
                </div>
              </div>
            </div>
            <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
              <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex">
                  <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/029.webp" alt="" className="w-full" />
                    <div>
                      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                  <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                  <p className="mb-4 text-indigo-500 dark:text-white-300">
                    <small>Published <u>13.01.2022</u> by
                      <div>Anna Maria Doe</div></small>
                  </p>
                  <p className="mb-4 pb-2">
                    Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                    placerat vulputate. Ut vulputate est non quam dignissim
                    elementum. Donec a ullamcorper diam.
                  </p>
                  <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                    more</div>
                </div>
              </div>
            </div>
            <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
              <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex">
                  <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/029.webp" alt="" className="w-full" />
                    <div>
                      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                  <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                  <p className="mb-4 text-indigo-500 dark:text-white-300">
                    <small>Published <u>13.01.2022</u> by
                      <div>Anna Maria Doe</div></small>
                  </p>
                  <p className="mb-4 pb-2">
                    Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                    placerat vulputate. Ut vulputate est non quam dignissim
                    elementum. Donec a ullamcorper diam.
                  </p>
                  <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                    more</div>
                </div>
              </div>
            </div>
            <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
              <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex">
                  <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/029.webp" alt="" className="w-full" />
                    <div>
                      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                  <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                  <p className="mb-4 text-indigo-500 dark:text-white-300">
                    <small>Published <u>13.01.2022</u> by
                      <div>Anna Maria Doe</div></small>
                  </p>
                  <p className="mb-4 pb-2">
                    Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                    placerat vulputate. Ut vulputate est non quam dignissim
                    elementum. Donec a ullamcorper diam.
                  </p>
                  <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                    more</div>
                </div>
              </div>
            </div>
            <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
              <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex">
                  <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/029.webp" alt="" className="w-full" />
                    <div>
                      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                  <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                  <p className="mb-4 text-indigo-500 dark:text-white-300">
                    <small>Published <u>13.01.2022</u> by
                      <div>Anna Maria Doe</div></small>
                  </p>
                  <p className="mb-4 pb-2">
                    Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                    placerat vulputate. Ut vulputate est non quam dignissim
                    elementum. Donec a ullamcorper diam.
                  </p>
                  <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                    more</div>
                </div>
              </div>
            </div>
            <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
              <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex">
                  <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/029.webp" alt="" className="w-full" />
                    <div>
                      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                  <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                  <p className="mb-4 text-indigo-500 dark:text-white-300">
                    <small>Published <u>13.01.2022</u> by
                      <div>Anna Maria Doe</div></small>
                  </p>
                  <p className="mb-4 pb-2">
                    Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                    placerat vulputate. Ut vulputate est non quam dignissim
                    elementum. Donec a ullamcorper diam.
                  </p>
                  <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                    more</div>
                </div>
              </div>
            </div>
            <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
              <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex">
                  <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/029.webp" alt="" className="w-full" />
                    <div>
                      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                  <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                  <p className="mb-4 text-indigo-500 dark:text-white-300">
                    <small>Published <u>13.01.2022</u> by
                      <div>Anna Maria Doe</div></small>
                  </p>
                  <p className="mb-4 pb-2">
                    Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                    placerat vulputate. Ut vulputate est non quam dignissim
                    elementum. Donec a ullamcorper diam.
                  </p>
                  <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                    more</div>
                </div>
              </div>
            </div>
            <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
              <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex">
                  <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/029.webp" alt="" className="w-full" />
                    <div>
                      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                  <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                  <p className="mb-4 text-indigo-500 dark:text-white-300">
                    <small>Published <u>13.01.2022</u> by
                      <div>Anna Maria Doe</div></small>
                  </p>
                  <p className="mb-4 pb-2">
                    Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                    placerat vulputate. Ut vulputate est non quam dignissim
                    elementum. Donec a ullamcorper diam.
                  </p>
                  <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                    more</div>
                </div>
              </div>
            </div>
          </div> */}
        </section>

        {
          artikels.length === 0
          ?
            null
          :
            <div className="mb-6 flex items-center justify-center">
              <Pagination totalPages={totalPages} handleClick={handlePageClick} />
            </div>
          
        }
      </div>

      <Footer />

    </>
  );
}

export default AllArtikel;
