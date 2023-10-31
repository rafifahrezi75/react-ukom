import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Swal from 'sweetalert2';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

      if(localStorage.getItem('token')) {

          navigate('/admin/dashboard');
      }
  }, []);

    const loginHandler = async (e) => {
      e.preventDefault();
      
      const formData = new FormData();

      formData.append('email', email);
      formData.append('password', password);
      
      await api.post('api/login', formData)
      .then((response) => {

          localStorage.setItem('token', response.data.token);
          
          navigate('/admin/dashboard');
          Swal.fire(
            'Success!',
            'Login Berhasil !',
            'success'
        )

      })
      .catch(error => {
          
          setErrors(error.response.data);
      })

  };
  return (
  <section className="bg-[#E2E2E2] min-h-screen flex items-center justify-center">
    <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-7 items-center">
      <div className="md:block hidden w-1/2 ">
        <img className="object-cover w-full h-full rounded-2xl" src="https://source.unsplash.com/user/erondu/500x800" alt="img" />
      </div> 
      <div className="md:w-1/2 px-16">
        <h2 className="font-bold text-2xl mt-4">
          Login
        </h2>
        <p className="text-sm mt-4">If You Already A Admin, Easily Log In </p>
        <form onSubmit={loginHandler} className="flex flex-col gap-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-4 px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Email" />
          {
            errors.email && (
              <div className="px-4 py-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{errors.email[0]}</span>
              </div>
            )
          }
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Password" />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 border-l-[0.2px] border-gray-300">
              {showPassword ? (
                <svg onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-eye w-5 h-5 text-gray-500" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              ) : (
                <svg onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-eye-slash w-5 h-5 text-gray-500" viewBox="0 0 16 16">
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                </svg>
              )}
            </div>
          </div>
          {
            errors.password && (
              <div className="px-4 py-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{errors.password[0]}</span>
              </div>
            )
          }
          {
            errors.message  && (
              <div className="px-4 py-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{errors.message}</span>
              </div>
            )
          }
          <button className="bg-sky-600 rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
          
        </form>

        <hr className="my-8 border-gray-500" />
        <div className="mt-3 text-xs flex justify-between items-center">
          <p>Only admin can login in this page!</p>
        </div>
      </div>
    </div>
  </section>

  );
}

export default Login;
