import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import api from '../../api';

import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const ReplyKomentar = ({ namas, idkomens, idartikels }) => {

  const [komentars, setKomentars] = useState([]);

  const fetchDataKomentars = async () => {

    await api.get('/api/indexkomentar')
        .then(response => {
          setKomentars(response.data.data);
        })

    }

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {

    const getTodayDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const today = getTodayDate();
    setTglKomen(today);

    fetchDataKomentars();

  }, []);

  const getRandomColorClass = () => {
    const colorClasses = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-amber-500', 'bg-sky-500', 'bg-emerald-500', 'bg-lime-500'];
    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
  };

  const [idartikel, setIdArtikel] = useState(idartikels);
  const [idkomen, setIdKomen] = useState(idkomens);
  const [aksi, setAksi] = useState(1);
  const [nama, setNama] = useState('');
  const [tglkomen, setTglKomen] = useState('');
  const [statuskomen, setStatusKomen] = useState(2);
  const [komentar, setKomentar] = useState('');

  const [errors, setErrors] = useState([]);

  const storeKomentar = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append('idartikel', idartikel);
    formData.append('idkomen', idkomen);
    formData.append('aksi', aksi);
    formData.append('nama', nama);
    formData.append('tglkomen', tglkomen);
    formData.append('statuskomen', statuskomen);
    formData.append('komentar', komentar);

    await api.post('/api/komentars', formData)
        .then(() => {
            
            navigate(`/artikel/detail/${id}`);
            Swal.fire(
              'Success!',
              'Komentar Berhasil Dikirim!',
              'success'
          )
          
          setTimeout(() => {
            window.location.reload(true);
          }, 1000);

        })
        .catch(error => {
            
            setErrors(error.response.data);
        })
  };

  const [activeClass, setActiveClass] = useState("hidden");

  const toggleClass = () => {
    setActiveClass(activeClass === "hidden" ? "block" : "hidden");
  };

  const [activeClassBtn, setActiveClassBtn] = useState("mb-5");

  const toggleClassBtn = () => {
    setActiveClassBtn(activeClassBtn === "mb-5" ? "mb-0" : "mb-5");
  };

  const [isSvgUp, setIsSvgUp] = useState(false);

  const toggleSvgClass = () => {
    setIsSvgUp(!isSvgUp);
  };

  return (
    <>
      
      {
        komentars.filter(
          komentars => komentars.idartikel === idartikels && komentars.statuskomen === 3 
          && komentars.aksi === 1 && komentars.idkomen === idkomens
        ).map((komentars, index) => (
          <article key={index} className="p-6 m-4 ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-stone-800 dark:text-white font-semibold">
                    <span className={`relative inline-flex items-center mr-2 justify-center w-10 h-10 overflow-hidden ${getRandomColorClass()} rounded-full dark:bg-gray-600`}>
                      <span className="font-medium text-white dark:text-gray-300">{komentars.nama[0]}</span>
                    </span>
                    {komentars.nama}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{komentars.tglkomen}</p>
              </div>
            </footer>
            <p className="text-gray-600 dark:text-gray-400">
              {komentars.komentar}
            </p>
          </article>
        ))
      }

      <button onClick={() => { toggleClass(); toggleSvgClass(); toggleClassBtn(); }} className={` ${activeClassBtn} hover:scale-105 duration-300 cursor-pointer ml-12 inline-block rounded-md bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}>
        <div className="flex gap-x-2">
          Reply Komen <span dangerouslySetInnerHTML={{ __html: isSvgUp ? "▲" : "▼" }} />
        </div>
      </button>

      <div className={`bg-white mb-5 mr-5 ml-12 lg:ml-12 rounded-lg ${activeClass}`}>
        <div className="mx-5 mt-6 flex justify-between items-center mb-6">
          <h2 className="mt-4 text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Replied to {namas}</h2>
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
            <input type="text" disabled onChange={(e) => setIdKomen(e.target.value)} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="ID Komen" />
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
            <input type="text" disabled value={1} onChange={(e) => setAksi(e.target.value)} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Aksi" />
          </div>
          {
            errors.aksi && (
              <div className="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{errors.aksi[0]}</span>
              </div>
            )
          }
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="nama" className="sr-only">Nama</label>
            <input type="text" onChange={(e) => setNama(e.target.value)} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Nama anda" />
          </div>
          {
            errors.nama && (
              <div className="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{errors.nama[0]}</span>
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
            <textarea id="komentar"  onChange={(e) => setKomentar(e.target.value)} rows={6} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Tulis sebuah komentar..." />
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

    </>
  );
}

export default ReplyKomentar;
