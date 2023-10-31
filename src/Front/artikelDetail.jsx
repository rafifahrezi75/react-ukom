import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import api from '../api';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Logo from "../assets/logo.png";

import Swal from 'sweetalert2';
import ReplyKomentar from "./komentar/replyKomentar";

const ArtikelDetail = () => {

  const token = localStorage.getItem("token");
  const [user, setUser] = useState({})
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [idartikel, setIdArtikel] = useState(id);

  useEffect(() => {

    fetchDetailArtikel();
    fetchDataKomentars();
    fetchDataLikes();

    const getTodayDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const today = getTodayDate();
    setTglKomen(today);

    if (token) {
      const fetchData = async () => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await api.get('/api/user').then((response) => {
          setUser(response.data);
          setIdUser(response.data.id);
        });
      };
  
      fetchData();
    };

  }, []);

  useEffect(() => {
    // Lakukan permintaan ke server untuk memeriksa apakah pengguna sudah menyukai artikel ini.
    if(token) {
      const formData = new FormData();
      formData.append('idartikel', idartikel);
      formData.append('iduser', user.id);

      api.post('/api/checklike', formData)
        .then((response) => {
          const { liked } = response.data;
          setLiked(liked);  
        })
        .catch((error) => {
          console.error('Error checking like status:', error);
        });
      }
  }, [idartikel, user.id]);

  const [showReply, setShowReply] = useState(null);

  const handleShowReply = (idartikel) => {
    setShowReply(idartikel);
  };

  const [image, setImage] = useState('');
  const [judul, setJudul] = useState('');
  const [iduser, setIdUser] = useState(null);
  const [kategori, setKategori] = useState('');
  const [tgl, setTgl] = useState('');
  const [penulis, setPenulis] = useState('');
  const [para1, setPara1] = useState('');
  const [para2, setPara2] = useState('');
  const [para3, setPara3] = useState('');
  const [para4, setPara4] = useState('');

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

  const [komentars, setKomentars] = useState([]);

  const fetchDataKomentars = async () => {

    await api.get('/api/indexkomentar')
        .then(response => {
          setKomentars(response.data.data);
        })

    };

  const [likes, setDataLikes] = useState([]);

  const fetchDataLikes = async () => {

    await api.get('/api/indexlike')
        .then(response => {
          setDataLikes(response.data.data);
        })

  };

  const filteredLikesID = likes.filter(likes => likes.idartikel === parseInt(id));
  const totalLikesCount = filteredLikesID.length;

  const filteredKomentarsID = komentars.filter(komentars => komentars.idartikel === parseInt(id) && komentars.statuskomen === 3);
  const totalKomentarsCount = filteredKomentarsID.length;

  const getRandomColorClass = () => {
    const colorClasses = ['bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500',
    'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-indigo-500',' bg-violet-500',
    'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500'];
    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
  };

  const navigate = useNavigate();

  const newRandomNumber = Math.floor(10000 + Math.random() * 90000);

  const [idkomen, setIdKomen] = useState(newRandomNumber);
  const [aksi, setAksi] = useState(0);
  const [tglkomen, setTglKomen] = useState('');
  const [statuskomen, setStatusKomen] = useState(2);
  const [komentar, setKomentar] = useState('');

  const [errors, setErrors] = useState([]);

  const storeKomentar = async (e) => {
    
    e.preventDefault();
    
    if (token) {
      const formData = new FormData();
  
      formData.append('idartikel', idartikel);
      formData.append('idkomen', idkomen);
      formData.append('aksi', aksi);
      formData.append('iduser', iduser);
      formData.append('tglkomen', tglkomen);
      formData.append('statuskomen', statuskomen);
      formData.append('komentar', komentar);
  
      try {
        await api.post('/api/komentars', formData);
        navigate(`/artikel/detail/${id}`);
        Swal.fire(
          'Success!',
          'Komentar Berhasil Dikirim!',
          'success'
        );

        setKomentar('');
        fetchDataKomentars();
      } catch (error) {
        setErrors(error.response.data);
      }
    } else {
      setTimeout(() => {
        navigate('/loginuser');
        Swal.fire(
          'Warning!',
          'Anda Harus Login Terlebih dahulu!',
          'warning'
        );
      }, 1000)
    }
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

  const fetchKomen = () => {
    fetchDataKomentars();
  };

  const handleLike = () => {

      if(token) {
        const formData = new FormData();
  
        formData.append('idartikel', idartikel);
        formData.append('iduser', user.id);

        api.post('/api/like', formData)
          .then(() => {
            setLiked(true);
            Swal.fire(
              'Success!',
              'Like Berhasil !',
              'success'
            )
            fetchDataLikes();
          })
          .catch((error) => {
            console.error('Error liking article:', error);
          });
      } else {
        setTimeout(() => {
          navigate('/loginuser');
          Swal.fire(
            'Warning!',
            'Anda Harus Login Terlebih dahulu!',
            'warning'
          );
        }, 1000)
      }
  };

  const handleUnlike = () => {

    if(token) {
      const formData = new FormData();
  
      formData.append('idartikel', idartikel);
      formData.append('iduser', user.id);

       // Buat permintaan ke server untuk unlike artikel ini
      api.post('/api/unlike', formData)
        .then(() => {
          setLiked(false);
          Swal.fire(
            'Success!',
            'Unlike Berhasil !',
            'success'
          )
          fetchDataLikes();
        })
        .catch((error) => {
          console.error('Error unliking article:', error);
        });
    } else {
      setTimeout(() => {
        navigate('/loginuser');
        Swal.fire(
          'Warning!',
          'Anda Harus Login Terlebih dahulu!',
          'warning'
        );
      }, 1000)
    }
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
    
    <div className="m-4 p-4 bg-white rounded-md shadow dark:border-gray-700 dark:shadow-gray-900">
      <div className="border-l-4 border-emerald-500 bg-neutral-50 rounded-r-lg">
        <h1 className="font-bold text-xl p-3 md:text-start text-center text-stone-800">{judul}</h1>
      </div>
      <hr className="mt-4 mb-1" />
      <div className="items-start">
        <img className="md:mb-3 scale-95 object-cover w-full rounded-lg h-96 md:h-auto md:w-96 md:rounded-md" src={image} alt={judul} />
      </div>
      <div className="mx-1 text-lg font-semibold mb-0.5 text-gray-800">
        <span className="inline-block h-3.5 border-l-2 border-sky-600 mr-2"></span>
        {kategori}
      </div>
      <div className="leading-normal">
        <p className="mx-1 mb-3 break-all font-normal text-gray-700 dark:text-gray-400 text-justify">
          {para1}
        </p>
        <p className="mx-1 mb-3 break-all font-normal text-gray-700 dark:text-gray-400 text-justify">
          {para2}
        </p>
        <p className="mx-1 mb-3 break-all font-normal text-gray-700 dark:text-gray-400 text-justify">
          {para3}
        </p>
        <p className="mx-1 mb-3 break-all font-normal text-gray-700 dark:text-gray-400 text-justify">
          {para4}
        </p>
      </div>

      <div className="flex flex-row items-center text-center justify-between bg-neutral-100 rounded-t-md">
        <div className="flex m-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-2 text-[rgb(51,51,51)] dark:text-white bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
          </svg>
          <p className="font-medium text-[rgb(51,51,51)] dark:text-white">by : {penulis}</p>
        </div>
        <div className="flex m-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-2 text-[rgb(51,51,51)] bi bi-calendar3" viewBox="0 0 16 16">
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
          <p className="font-medium text-[rgb(51,51,51)] dark:text-white">
            {tgl}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center text-center justify-between bg-neutral-100 rounded-b-md">
        <div onClick={fetchKomen} className="flex m-4 cursor-pointer">
          <svg className="w-5 h-5 mr-2 text-[rgb(51,51,51)] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
          </svg>
          <p className="text-[rgb(51,51,51)] dark:text-white">
            {totalKomentarsCount} Comments
          </p>
        </div>
        <div className="flex m-4">
          {liked ? (
            <button onClick={handleUnlike}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-heart-fill w-5 h-5 mr-2 text-[rgb(51,51,51)] dark:text-white" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
              </svg>
            </button>
          ) : (
            <button onClick={handleLike}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-heart w-5 h-5 mr-2 text-[rgb(51,51,51)] dark:text-white" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </button>
          )
          }
          <p className="text-[rgb(51,51,51)] dark:text-white">
            {totalLikesCount} Likes
          </p>
        </div>
      </div>
    </div>


    <div className="bg-white mx-5 rounded-lg">
      <div className="mx-5 mt-6 flex justify-between items-center mb-6">
        <h2 className="mt-4 text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Komentar Anda</h2>
      </div>


      <form onSubmit={storeKomentar} className="m-4 mb-6">
        <div hidden className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="idartikel" className="sr-only">ID Artikel</label>
          <input type="text" disabled onChange={(e) => setIdArtikel(e.target.value)} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" value={id} />
        </div>
        {
          errors.idartikel && (
            <div className="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{errors.idartikel[0]}</span>
            </div>
          )
        }
        <div hidden className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="idkomen" className="sr-only">ID Komen</label>
          <input type="text" value={newRandomNumber} onChange={(e) => setIdKomen(e.target.value)} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="ID Komen" />
        </div>
        {
          errors.idkomen && (
            <div className="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{errors.idkomen[0]}</span>
            </div>
          )
        }
        <div hidden className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="aksi" className="sr-only">Aksi</label>
          <input type="text" disabled value={0} onChange={(e) => setAksi(e.target.value)} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Aksi" />
        </div>
        {
          errors.aksi && (
            <div className="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{errors.aksi[0]}</span>
            </div>
          )
        }
        <div hidden className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="iduser" className="sr-only">ID User</label>
          <input type="text" value={user.id} onChange={(e) => setIdUser(e.target.value)} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Nama anda" />
        </div>
        {
          errors.iduser && (
            <div className="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{errors.iduser[0]}</span>
            </div>
          )
        }
        <div hidden className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="tglkomen" className="sr-only">Tanggal</label>
          <input type="date" disabled value={tglkomen} onChange={(e) => setTglKomen(e.target.value)} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Tanggal" />
        </div>
        {
          errors.tglkomen && (
            <div className="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{errors.tglkomen[0]}</span>
            </div>
          )
        }
        <div hidden className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="statuskomen" className="sr-only">Status Komen</label>
          <input type="text" disabled onChange={(e) => setStatusKomen(e.target.value)} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="StatusKomen" Value={2} />
        </div>
        {
          errors.statuskomen && (
            <div className="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{errors.statuskomen[0]}</span>
            </div>
          )
        }
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="komentar" className="sr-only">Komentar Anda</label>
          <textarea id="komentar" value={komentar} onChange={(e) => setKomentar(e.target.value)} rows={6} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Tulis sebuah komentar..." />
        </div>
        {
          errors.komentar && (
            <div className="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{errors.komentar[0]}</span>
            </div>
          )
        }
        <button type="submit" className="bg-blue-500 mb-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-700">
          Post komentar
        </button>
      </form>
    </div>

    { komentars.filter(
        komentars => komentars.idartikel === parseInt(id) && komentars.statuskomen === 3 && komentars.aksi === 0
      ).length > 0 && (
        <div className="mx-5 mt-6 flex justify-between items-center mb-6">
          <h2 className="mt-4 text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Semua Komentar</h2>
        </div>
      )
    }

    {
      komentars.filter(
        komentars => komentars.idartikel === parseInt(id) && komentars.statuskomen === 3 && komentars.aksi === 0
      ).map((komentars, index) => (
        <>

        <article className="p-6 m-4 text-base bg-white rounded-lg dark:bg-gray-900">
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
          <div className="flex items-center mt-4 space-x-4">
            <button onClick={() => handleShowReply(komentars.idkomen)} type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
              <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
              </svg>                
              Show Reply
            </button>
          </div>
        </article>
        {showReply === komentars.idkomen && (
          <>
            <ReplyKomentar token={token} userid={user.id} namas={komentars.name} idkomens={komentars.idkomen} idartikels={komentars.idartikel} />
          </>
        )}
        </>
      ))
    }

      {/* <article className="p-6 mr-4 mb-3 ml-12 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                <div class="relative inline-flex items-center mr-2 justify-center w-10 h-10 overflow-hidden bg-blue-500 rounded-full dark:bg-gray-600">
                  <span class="font-medium text-white dark:text-gray-300">J</span>
                </div>
                Jese Leos</p>
            <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate dateTime="2022-02-12" title="February 12th, 2022">Feb. 12, 2022</time></p>
          </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">Much appreciated! Glad you liked it ☺️</p>
      </article> */}
    
    </>
  );
}

export default ArtikelDetail;
