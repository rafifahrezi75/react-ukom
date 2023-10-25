import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../api';
import Pagination from '../../components/pagination';

import NavbarUser from '../navbarUser';
import Footer from '../../components/footer';

const AllArtikel = () => {

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

  return (
    <>
    
      <NavbarUser />

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
            type="text" id="search-artikels" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Artikel..." required />
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
                  <h5 className="mb-3 text-lg font-bold text-stone-800">{artikels.judul}</h5>
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
