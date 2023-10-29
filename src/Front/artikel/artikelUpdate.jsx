import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import api from '../../api';
import Swal from 'sweetalert2';
import NavbarAdmin from '../navbarAdmin';

const ArtikelUpdate = () => {

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
  const [upkategori, setUpKategori] = useState('');
  const [idkategori, setIdKategori] = useState('');
  const [tgl, setTgl] = useState('');
  const [penulis, setPenulis] = useState('');
  const [status, setStatus] = useState('1');
  const [para1, setPara1] = useState('');
  const [para2, setPara2] = useState('');
  const [para3, setPara3] = useState('');
  const [para4, setPara4] = useState('');

  const [errors, setErrors] = useState([]);

  const { id } = useParams();

  
  const fetchDetailArtikel= async () => {
        
    await api.get(`/api/artikels/${id}`)
        .then(response => {

            setJudul(response.data.data.judul);
            setIdKategori(response.data.data.idkategori);
            setUpKategori(response.data.data.kategori);
            setTgl(response.data.data.tgl);
            setPenulis(response.data.data.penulis);
            setStatus(response.data.data.status);
            setPara1(response.data.data.para1);
            setPara2(response.data.data.para2);
            setPara3(response.data.data.para3);
            setPara4(response.data.data.para4);

        })
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };


  useEffect(() => {
      
    fetchDetailArtikel();

  }, []);

  const updateArtikel = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append('image', image);
    formData.append('judul', judul);
    formData.append('idkategori', idkategori);
    formData.append('tgl', tgl);
    formData.append('penulis', penulis);
    formData.append('status', status);
    formData.append('para1', para1);
    formData.append('para2', para2);
    formData.append('para3', para3);
    formData.append('para4', para4);
    formData.append('_method', 'PUT')

    await api.post(`/api/artikels/${id}`, formData)
        .then(() => {
            
            navigate('/admin/artikel');
            Swal.fire(
              'Success!',
              'Data Artikel Berhasil Diupdate!',
              'success'
          )

        })
        .catch(error => {
            
            setErrors(error.response.data);
        })
  };


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
                      <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Update Artikel</span>
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
        
        <div className="mt-4 mx-8">
          <form onSubmit={updateArtikel} className="p-4 bg-white rounded-md shadow dark:border-gray-700 dark:shadow-gray-900">
            <div className="space-y-6">
              <div className="mb-4">
                  <label htmlFor="image" className="block mb-2 text-sm font-medium">
                    Image
                  </label>
                  <input type="file" onChange={handleFileChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2 file:bg-transparent file:border-0 file:bg-gray-100" />
                  {
                    errors.image && (
                      <div className="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                          <span className="font-medium">{errors.image[0]}</span>
                      </div>
                    )
                  }
                </div>
                <div className="mb-4">
                  <label htmlFor="judul" className="block mb-2 text-sm font-medium">
                    Judul
                  </label>
                  <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
                  {
                    errors.judul && (
                      <div class="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                          <span class="font-medium">{errors.judul[0]}</span>
                      </div>
                    )
                  }
                </div>
                <div className="mb-4">
                  <label htmlFor="kategori" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori</label>
                  <select onChange={(e) => setIdKategori(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={idkategori}>{upkategori}</option>
                    {
                      kategoris.map((kategoris, index) => (
                        <option key={index} value={kategoris.id}>{kategoris.kategori}</option>
                      ))
                    }
                  </select>
                  {
                      errors.idkategori && (
                        <div className="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{errors.idkategori[0]}</span>
                        </div>
                      )
                    }
                </div>
                <div className="mb-4">
                  <label htmlFor="tgl" className="block mb-2 text-sm font-medium">
                    Tanggal
                  </label>
                  <input disabled type="date" value={tgl} onChange={(e) => setTgl(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
                  {
                    errors.tgl && (
                      <div class="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                          <span class="font-medium">{errors.tgl[0]}</span>
                      </div>
                    )
                  }
                </div>
                <div className="mb-4">
                  <label htmlFor="penulis" className="block mb-2 text-sm font-medium">
                    Penulis
                  </label>
                  <input type="text" value={penulis} onChange={(e) => setPenulis(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
                  {
                    errors.penulis && (
                      <div class="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                          <span class="font-medium">{errors.penulis[0]}</span>
                      </div>
                    )
                  }
                </div>
                <div className="mb-4">
                  <label htmlFor="status" className="block mb-2 text-sm font-medium">
                    Status
                  </label>
                  <div className="flex fle-col space-x-6">
                  <label className="flex items-center">
                    <input type="radio" checked={parseInt(status) === 1} onChange={handleOptionChange} className="form-radio text-indigo-700 h-4 w-4" name="options" value="1"/>
                    <span className="ml-2 py-3 px-3 text-sm focus:outline-none leading-none font-medium text-indigo-700 bg-indigo-100 rounded-md">Utama</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" checked={parseInt(status) === 2} onChange={handleOptionChange} className="form-radio text-emerald-700 h-4 w-4" name="options" value="2"/>
                    <span className="ml-2 py-3 px-3 text-sm focus:outline-none leading-none font-medium text-emerald-700 bg-emerald-100 rounded-md">Rekom</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" checked={parseInt(status) === 3} onChange={handleOptionChange} className="form-radio text-rose-700 h-4 w-4" name="options" value="3"/>
                    <span className="ml-2 py-3 px-3 text-sm focus:outline-none leading-none font-medium text-rose-700 bg-rose-100 rounded-md">Terbaru</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" checked={parseInt(status) === 4} onChange={handleOptionChange} className="form-radio text-sky-700 h-4 w-4" name="options" value="4"/>
                    <span className="ml-2 py-3 px-3 text-sm focus:outline-none leading-none font-medium text-sky-700 bg-sky-100 rounded-md">Normal</span>
                  </label>
                </div>
                  {
                    errors.status && (
                      <div class="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                          <span class="font-medium">{errors.status[0]}</span>
                      </div>
                    )
                  }
                </div>
                <div className="mb-4">
                  <label htmlFor="para1" className="block mb-2 text-sm font-medium">
                  Paragraf 1
                  </label>
                  <textarea value={para1} onChange={(e) => setPara1(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" rows="10"></textarea>
                  {
                    errors.para1 && (
                      <div class="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                          <span class="font-medium">{errors.para1[0]}</span>
                      </div>
                    )
                  }
                </div>
                <div className="mb-4">
                  <label htmlFor="para2" className="block mb-2 text-sm font-medium">
                  Paragraf 2
                  </label>
                  <textarea value={para2} onChange={(e) => setPara2(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" rows="10"></textarea>
                  {
                    errors.para2 && (
                      <div class="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                          <span class="font-medium">{errors.para2[0]}</span>
                      </div>
                    )
                  }
                </div>
                <div className="mb-4">
                  <label htmlFor="para3" className="block mb-2 text-sm font-medium">
                  Paragraf 3
                  </label>
                  <textarea value={para3} onChange={(e) => setPara3(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" rows="10"></textarea>
                  {
                    errors.para3 && (
                      <div class="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                          <span class="font-medium">{errors.para3[0]}</span>
                      </div>
                    )
                  }
                </div>
                <div className="mb-4">
                  <label htmlFor="para4" className="block mb-2 text-sm font-medium">
                  Paragraf 4
                  </label>
                  <textarea value={para4} onChange={(e) => setPara4(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" rows="10"></textarea>
                  {
                    errors.para4 && (
                      <div class="p-4 mb-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                          <span class="font-medium">{errors.para4[0]}</span>
                      </div>
                    )
                  }
                </div>
              <div className="my-4 space-x-2">
                <Link to="/admin/artikel">
                  <button className="px-4 py-2 text-sm bg-neutral-500 hover:bg-neutral-700 text-white rounded-md">
                    Back
                  </button>
                </Link>
                <button className="px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
                  Store
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>

      </div>

    </>
  );
}

export default ArtikelUpdate;
