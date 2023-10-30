import { useState, useEffect } from 'react';

import api from '../../api';

import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import Logo from "../../assets/logo.png";
import Footer from '../../components/footer';

const Like = () => {

  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [likes, setDataLikes] = useState([]);

  const fetchDataLikes = async () => {

    await api.get('/api/indexlike')
        .then(response => {
          setDataLikes(response.data.data);
        })

  };

  const fetchData = async () => {

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await api.get('/api/user')
    .then((response) => {

        setUser(response.data);
    })
  };

  useEffect(() => {

    if(!token) {
      navigate('/loginuser');
      Swal.fire(
        'Warning!',
        'Anda Harus Login Terlebih dahulu!',
        'warning'
      );
      } else
      {
      fetchData();
      fetchDataLikes();
      };

  }, []);

  const logoutHandler = async () => {

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    await api.post('/api/logout')
    .then(() => {

        localStorage.removeItem("token");

        navigate('/dashboard');
        Swal.fire(
            'Success!',
            'Logout Berhasil !',
            'success'
        )
    });
  };

  const [ isOpen, setisOpen ] = useState(false);

  const getRandomColorClass = () => {
    const colorClasses = ['text-red-600', 'text-blue-600', 'text-green-600', 'text-yellow-600', 'text-cyan-600', 'text-amber-600', 'text-sky-600', 'text-emerald-600', 'text-lime-600'];
    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
  };

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

    <div className="container my-10 mx-auto md:px-6">
      <section className="mb-40 text-center">
        <h2 className="mb-6 pb-4 text-center text-3xl font-semibold text-stone-800">
          Liked Artikel
        </h2>

        <div className="grid md:mx-0 mx-4 md:grid-cols-3 grid-cols-1 gap-x-12 gap-y-6 -mb-12">
        {
            likes.filter(
              likes => likes.iduser === user.id
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
                    <Link to={`/artikel/detail/${artikels.idartikel}`}>
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

    <Footer />
    
    </>
  );
}

export default Like;
