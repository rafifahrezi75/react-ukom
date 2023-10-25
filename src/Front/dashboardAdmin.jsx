import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useState } from 'react';

import api from '../api';
import NavbarAdmin from './navbarAdmin';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import { Bar, Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardAdmin = () => {

  const [kategoris, setCountKategoris] = useState();
  const [artikels, setArtikels] = useState([]);
  const [countartikels, setCountArtikels] = useState();
  const [komentars, setKomentars] = useState([]);
  const [countkomentars, setCountKomentars] = useState();
  
  const countKategoris = async () => {

    await api.get('/api/kategoris')
    .then(response => {
        
        setCountKategoris(response.data.data.data.length);
    })

  };

  const countArtikels = async () => {

    await api.get('/api/artikels')
    .then(response => {
        
      setArtikels(response.data.data.data);
      setCountArtikels(response.data.data.data.length);
    })

  };

  const countKomentars = async () => {

    await api.get('/api/komentars')
    .then(response => {
        
      setKomentars(response.data.data.data);
      setCountKomentars(response.data.data.data.length);
    })

  };

  useEffect(() => {

    countKategoris();
    countArtikels();
    countKomentars();

  }, []);

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const filteredArtikelUtama = artikels.filter(artikels => artikels.status === 1);
  const totalArtikelUtamaCount = filteredArtikelUtama.length;

  const filteredArtikelRekom = artikels.filter(artikels => artikels.status === 2);
  const totalArtikelRekomCount = filteredArtikelRekom.length;

  const filteredArtikelTerbaru = artikels.filter(artikels => artikels.status === 3);
  const totalArtikelTerbaruCount = filteredArtikelTerbaru.length;

  const filteredKomentarDitolak = komentars.filter(komentars => komentars.statuskomen === 1);
  const totalKomentarDitolakCount = filteredKomentarDitolak.length;

  const filteredKomentarMenunggu = komentars.filter(komentars => komentars.statuskomen === 2);
  const totalKomentarMenungguCount = filteredKomentarMenunggu.length;

  const filteredKomentarDisetujui = komentars.filter(komentars => komentars.statuskomen === 3);
  const totalKomentarDisetujuiCount = filteredKomentarDisetujui.length;

  const dataBar = {
    labels: ['Utama', 'Rekomendasi', 'Terbaru'],
    datasets: [
      {
        label: 'Stats',
        data: [(totalArtikelUtamaCount) ,(totalArtikelRekomCount), (totalArtikelTerbaruCount)],
        backgroundColor: 'rgba(14, 165, 233)',
      },
    ],
    scales: {
      x: {
        stepSize : 1,
        beginAtZero: true,
        offset: true,
      },
      y: {
        stepSize : 1,
        beginAtZero: true,
        offset: true,
      },
    },
  };

  const dataPie = {
    labels: ['Ditolak', 'Menunggu', 'Disetujui'],
    datasets: [
      {
        label: 'Stats',
        data: [(totalKomentarDitolakCount) ,(totalKomentarMenungguCount), (totalKomentarDisetujuiCount)],
        backgroundColor: [
          'rgba(253, 164, 175)',
          'rgba(253, 224, 71)',
          'rgba(110, 231, 183)',
        ],
        borderColor: [
          'rgba(251, 113, 133)',
          'rgba(250, 204, 21)',
          'rgba(52, 211, 153)',
        ],
        borderWidth : 1,
      },
    ],
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
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-microsoft h-4 w-4 mr-2 text-gray-500" viewBox="0 0 16 16">
                        <path d="M7.462 0H0v7.19h7.462V0zM16 0H8.538v7.19H16V0zM7.462 8.211H0V16h7.462V8.211zm8.538 0H8.538V16H16V8.211z" />
                      </svg>
                        Dashboard
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

        <div className="grid grid-cols-1 gap-7 px-4 mt-4 sm:grid-cols-4 sm:px-8">
          <Link to="/admin/kategoris">
            <div className="flex items-center p-4 bg-white hover:bg-gray-100 duration-500 border rounded-lg overflow-hidden shadow">
              <div className="p-4 rounded-lg bg-orange-100 text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-menu-button h-12 w-12" viewBox="0 0 16 16">
                  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h8A1.5 1.5 0 0 1 11 1.5v2A1.5 1.5 0 0 1 9.5 5h-8A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-8z" />
                  <path d="m7.823 2.823-.396-.396A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                </svg>
              </div>
              <div className="px-4">
                <h3 className="text-sm font-medium text-black-600 dark:text-black-400 tracking-wider">Total Kategori</h3>
                <p className="text-xl font-semibold text-black-700 dark:text-black-200">{kategoris}</p>
              </div>
            </div>
          </Link>
          <Link to="/admin/artikel">
            <div className="flex items-center p-4 bg-white hover:bg-gray-100 duration-500 border rounded-lg overflow-hidden shadow">
              <div className="p-4 rounded-lg bg-blue-100 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2">
                  </path>
                </svg>
              </div>
              <div className="px-4">
                <h3 className="text-sm font-medium text-black-600 dark:text-black-400 tracking-wider">Total Artikel</h3>
                <p className="text-xl font-semibold text-black-700 dark:text-black-200">{countartikels}</p>
              </div>
            </div>
          </Link>
          <Link to="/admin/komentar">
            <div className="flex items-center p-4 bg-white hover:bg-gray-100 duration-500 border rounded-lg overflow-hidden shadow">
              <div className="p-4 rounded-lg bg-emerald-100 text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z">
                  </path>
                </svg>
              </div>
              <div className="px-4">
                <h3 className="text-sm font-medium text-black-600 dark:text-black-400 tracking-wider">Total Komentar</h3>
                <p className="text-xl font-semibold text-black-700 dark:text-black-200">{countkomentars}</p>
              </div>
            </div>
          </Link>
          <div className="flex items-center p-4 bg-white hover:bg-gray-100 duration-500 border rounded-lg overflow-hidden shadow">
            <div className="p-4 rounded-lg bg-fuchsia-100 text-fuchsia-500">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-people-fill h-12 w-12" viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>

            </div>
            <div className="px-4">
              <h3 className="text-sm font-medium text-black-600 dark:text-black-400 tracking-wider">Total Akun</h3>
              <p className="text-xl font-semibold text-black-700 dark:text-black-200">34</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-7 md:mt-4 mt-7 mx-4 mb-4 md:mx-8">

          <div className="bg-white p-4 rounded-md shadow md:col-span-2">
            <h2 className="text-black-600 text-lg font-semibold pb-4">Stats</h2>
            <div className="bg-gradient-to-r from-sky-500 to-sky-800 h-[4px] w-[3rem]" />
            <Bar data={dataBar} />
          </div>

          <div className="bg-white p-4 rounded-md shadow min-h-[27rem]">
            <h2 className="text-black-600 text-lg font-semibold pb-4">Komentar</h2>
            <div className="bg-gradient-to-r from-sky-500 to-sky-800 h-[4px] w-[6rem] mb-2" />
              <Pie data={dataPie} />
          </div>

        </div>

      </div>
    </div>
    

    </>
  );
}

export default DashboardAdmin;
