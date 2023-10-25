import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
  <section className="bg-[#E2E2E2] min-h-screen flex items-center justify-center">
    <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-7 items-center">
      <div className="md:block hidden w-1/2 ">
        <img className="object-cover w-full h-full rounded-2xl" src="https://source.unsplash.com/user/erondu/500x800" alt="img" />
      </div> 
      <div className="md:w-1/2 px-16">
        {/* <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="gray" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg> */}
        <h2 className="font-bold text-2xl mt-4">
          Login
        </h2>
        <p className="text-sm mt-4">If You Already A User, Easily Log In </p>
        <form action="" className="flex flex-col gap-4">
          <input type="email" className="w-full mt-4 px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Email" />
          <input type="password" className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Password" />
          
            <button className="bg-sky-600 rounded-xl text-white py-2 hover:scale-105 duration-300"><Link to="/admin/dashboard">Login</Link></button>
          
        </form>

        <div className='flex flex-col gap-4 mt-4'>
          <button className="bg-sky-600 rounded-xl text-white py-2 hover:scale-105 duration-300"><Link to="/admin/dashboard">Login</Link></button>
        </div>

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
