import { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

import Logo from "../../assets/logo.png";

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import Footer from '../../components/footer';

const HistoryKomentar = () => {

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchData = async () => {

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await api.get('/api/user')
    .then((response) => {

        setUser(response.data);
    })
  };

  const logoutHandler = async () => {

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    await api.post('/api/logout')
    .then(() => {

        localStorage.removeItem("token");
        localStorage.removeItem("roles");

        navigate('/dashboard');
        Swal.fire(
            'Success!',
            'Logout Berhasil !',
            'success'
        )
    });
  };

  const [ isOpen, setisOpen ] = useState(false);

  const [komentars, setKomentars] = useState([]);

  const fetchDataKomentars = async () => {

    await api.get('/api/indexkomentar')
        .then(response => {
          setKomentars(response.data.data);
        })

    }

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
      fetchDataKomentars();
      };
  
    }, []);

    const getRandomColorClass = () => {
      const colorClasses = ['bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500',
      'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-indigo-500',' bg-violet-500',
      'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500'];
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

      <div className="mt-10 mb-40 lg:mx-14 mx-4">
        <h2 className="mb-6 pb-4 text-center text-3xl font-semibold text-stone-800">
          History Komentar
        </h2>
        {
          komentars.filter(
            komentars => komentars.iduser === user.id && komentars.statuskomen === 3
          ).map((komentars, index) => (
          <Link to={`/artikel/detail/${komentars.idartikel}`}>
            <article key={index} className="p-6 m-4 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-stone-800 dark:text-white font-semibold">
                      <span className={`relative inline-flex items-center mr-2 justify-center w-10 h-10 overflow-hidden ${getRandomColorClass()} rounded-full dark:bg-gray-600`}>
                        <span className="font-medium text-white dark:text-gray-300">{komentars.name[0]}</span>
                      </span>
                      {komentars.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{komentars.tglkomen}</p>
                </div>
              </footer>
              <p className="text-gray-600 dark:text-gray-400">
                {komentars.komentar}
              </p>
            </article>
          </Link>
          ))
        }
        
      </div>

      <Footer />

    </>
  );
}

export default HistoryKomentar;
