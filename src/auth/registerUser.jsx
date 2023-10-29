import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../api';
import Swal from 'sweetalert2';

const RegisterUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const registerHandler = async (e) => {
      e.preventDefault();
      
      const formData = new FormData();

      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      formData.append('password_confirmation', passwordConfirmation);

      await api.post('/api/register', formData)
      .then(() => {
          
          navigate('/loginuser');
          Swal.fire(
            'Success!',
            'Register Berhasil !',
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
        <div className="md:w-1/2 px-16">
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="gray" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
          </Link>
          <h2 className="font-bold text-2xl mt-4">
            Register
          </h2>
          <p className="text-sm mt-4">If You Already A User, Easily Log In </p>
          <form onSubmit={registerHandler} className="flex flex-col gap-4">
            <input type="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-4 px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Name" />
            {
              errors.name && (
                <div className="px-4 py-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{errors.name[0]}</span>
                </div>
              )
            }
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Email" />
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
            <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Password Confirmation" />
            <input disabled type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full mt-4 px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Name" />
            {
              errors.role && (
                <div className="px-4 py-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{errors.role[0]}</span>
                </div>
              )
            }
            <button className="bg-sky-600 rounded-xl text-white py-2 hover:scale-105 duration-300">Register</button>
          </form>
          <hr className="my-8 border-gray-500" />
          <div className="mt-3 text-xs flex justify-between items-center">
            <p>Already have an account?</p>
            <Link to="/">
              <button className="py-2 px-5 text-white bg-sky-600 border rounded-xl hover:scale-105 duration-300">Login</button>
            </Link>
          </div>
        </div>
        <div className="md:block hidden w-1/2 ">
          <img className="object-cover w-full h-full rounded-2xl" src="https://source.unsplash.com/user/erondu/500x800" alt="img" />
        </div> 
      </div>
    </section>

  );
}

export default RegisterUser;
