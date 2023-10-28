import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Swal from 'sweetalert2';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        <p className="text-sm mt-4">If You Already A User, Easily Log In </p>
        <form onSubmit={loginHandler} className="flex flex-col gap-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-4 px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Email" />
          {
            errors.email && (
              <div className="px-4 py-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{errors.email[0]}</span>
              </div>
            )
          }
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Password" />
          {
            errors.password && (
              <div className="px-4 py-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">{errors.password[0]}</span>
              </div>
            )
          }
          <button className="bg-sky-600 rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
          
        </form>

        <hr className="my-8 border-gray-500" />
        <div className="mt-3 text-xs flex justify-between items-center">
          <p>Don't have an account?</p>
          <Link to="/register">
            <button className="py-2 px-5 text-white bg-sky-600 border rounded-xl hover:scale-105 duration-300">Register</button>
          </Link>
        </div>
      </div>
    </div>
  </section>

  );
}

export default Login;
