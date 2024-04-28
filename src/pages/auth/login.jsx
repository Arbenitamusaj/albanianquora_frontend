import NavBar from '../../components/NavBar';
import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext'; 
import { showToast } from '../../components/Notify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5274/auth/login', {
        email,
        password
      });

      console.log('Login Successful:', response.data);
      login(response.data.token); 
      router.push('/home');
      showToast('User loged in successfully!','success');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      showToast('Your credentials are incorrect!','error');

    }
  };

  return (
    <div className='w-full h-screen bg-gray-200'>
      <div className="flex flex-col items-center text-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white text-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className='text-left'>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='text-left'>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full text-black border-gray-900 bg-white hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 border hover:text-white">Sign in</button>
              <p className="text-sm font-light">
                Don’t have an account yet? <Link href="/auth/register" className="font-medium text-gray-600 hover:underline">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}