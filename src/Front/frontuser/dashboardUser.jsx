import { useState, useEffect } from 'react';

import api from '../../api';
import NavbarUser from '../navbarUser';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';

const DashboardUser = () => {

  const [artikels, setArtikels] = useState([]);

  const fetchDataArtikels = async () => {

    await api.get('/api/artikels')
    .then(response => {
        
      setArtikels(response.data.data.data);
    })

  };

  useEffect(() => {

    fetchDataArtikels();

  }, []);

  const getRandomColorClass = () => {
    const colorClasses = ['text-red-600', 'text-blue-600', 'text-green-600', 'text-yellow-600', 'text-cyan-600', 'text-amber-600', 'text-sky-600', 'text-emerald-600', 'text-lime-600'];
    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
  };

  return (
    <>

    <NavbarUser />

    <div className="container md:mt-10 mt-8 mx-auto md:px-6">
      <section className="mb-24">
        <h2 className="mb-6 pb-4 text-center text-3xl font-semibold">
          Artikel utama
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:mx-0 mx-4">
          {
            artikels.filter(
              artikels => artikels.status === 1,
            ).map((artikels, index) => (
              <Link to={`/artikel/detail/${artikels.id}`}>
              <div key={index} className="md:hover:scale-[1.01] transition duration-300 ease-in-out relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                <img src={artikels.image} className="w-full align-middle" />
                  <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.4)] bg-fixed">
                    <div className="flex h-full items-end justify-start">
                      <div className="m-6 text-white">
                        <h5 className="mb-3 text-lg font-bold truncate w-56">{artikels.judul}</h5>
                        <p>
                          <small>Published <u>{artikels.tgl}</u> by {artikels.penulis}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]" />
              </div>
              </Link>
            ))
          }
        </div>
      </section>
    </div>


    <div className="container my-10 mx-auto md:px-6">
      <section className="mb-24 text-center">
        <h2 className="mb-6 pb-4 text-center text-3xl font-semibold">
          Rekomendasi untuk anda
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 xl:gap-x-12 lg:mx-0 mx-4">
        {
            artikels.filter(
              artikels => artikels.status === 2,
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
      </section>
    </div>

    <div className="container mx-auto md:px-6">
      <section className="mb-32 md:mx-0 mx-4 text-center md:text-left">
        <h2 className="mb-6 pb-4 text-center text-3xl font-semibold">
          Artikel Terbaru
        </h2>
      {
        artikels.filter(
          artikels => artikels.status === 3,
        ).map((artikels, index) => (
          <div key={index} className="mb-12 md:pb-0 pb-4 md:hover:scale-[1.01] transition duration-300 ease-in-out bg-white rounded-md grid items-center gap-x-6 md:grid-cols-2 xl:gap-x-12">
            <div className={`mb-6 ${index % 2 === 0 ? 'lg:order-2' : ''} md:mb-0`}>
              <div className="relative m-4 overflow-hidden bg-cover rounded-lg bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                <img src={artikels.image} className="w-full" alt={artikels.judul} />
                  <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                  </div>
              </div>
            </div>
            <div className={`${index % 2 === 0 ? 'lg:order-1 ml-4' : ''} md:px-0 px-4`}>
              <h3 className="mb-3 text-2xl font-bold text-stone-800 md:truncate text-clip md:w-56 w-full lg:w-96 md:text-start text-center">{artikels.judul}</h3>
              <div className={`mb-3 ${getRandomColorClass()} flex items-center justify-center text-sm font-medium text-primary dark:text-primary-400 md:justify-start`}>
                {artikels.kategori}
              </div>
              <p className="lg:mb-6 mb-4 text-neutral-500 dark:text-neutral-300">
                <small>Published {artikels.tgl} by {artikels.penulis}</small>
              </p>
              <p className="lg:mb-4 mb-2 line-clamp-2 leading-8 text-gray-600 dark:text-gray-200">
                {artikels.para1}
              </p>
              <Link to={`/artikel/detail/${artikels.id}`}>
                <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-md bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                  Read more
                </div>
              </Link>
            </div>
          </div>
      ))
      }
      </section>
    </div>
    
    <Footer />

    </>
  );
}

export default DashboardUser;
