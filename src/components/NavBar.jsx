import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';
import { MdLogin } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import AskButton from '../components/AskButton'; 


export default function NavBar({ toggleQuestionForm, onSearch }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className={`w-full sticky ${scrolled ? "bg-white" : "bg-white"} px-6 h-20 text-black flex items-center justify-between fixed top-0 left-0 z-50 transition-colors duration-300 ease-in-out`}>
                <div className='flex items-center justify-between w-full lg:hidden'>
                    <BiSearch className='text-2xl cursor-pointer' onClick={() => setIsSearchOpen(!isSearchOpen)} />
                    <div className='text-lg font-bold text-[#0d9488]'>AlbanianQuora</div>
                    <GiHamburgerMenu className='text-3xl' onClick={() => setIsOpen(!isOpen)} />
                </div>
                <div className='hidden lg:flex justify-between items-center w-full'>
                    <div className='text-lg font-bold text-[#0d9488]'>AlbanianQuora</div>
                    <SearchBar placeholder="Search..."  onSearch={onSearch} />
                    <div className='flex items-center'>
                        <Link href="/home" className="flex items-center mx-4 hover:text-[#0d9488] hover:border-b hover:border-[#0d9488]">
                            <AiOutlineHome className="mr-2" />Home
                        </Link>
                        <AskButton toggleQuestionForm={toggleQuestionForm} setIsOpen={setIsOpen} />    

                        {authToken ? (
                            // Render authenticated links when authToken exists
                            <>
                                <div className="flex justify-between h-16">
                                    <div className="p-3 rounded-lg flex">
                                    <div>
                                        <div className="relative inline-block text-left z-50">
                                        <div>
                                            <button
                                            type="button"
                                            className="flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"
                                            >
                                            <FaRegUser />
                                            <h1 className="md:block hidden mx-2 font-bold">{}</h1>
                                            <svg
                                                className="md:block hidden h-4 w-4 mr-3"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                />
                                            </svg>
                                            </button>
                                        </div>
                                        <div
                                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                        >
                                            <div className="py-1">
                                            <a href="" className="block px-4 py-2 text-xs text-gray-400">
                                                Manage Account
                                            </a>
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Profile{' '}
                                            </Link>

                                            <Link
                                                href="/profilequestions"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Questions{' '}
                                            </Link>

                                            <a
                                                href="/home"
                                                onClick={logout()}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Log Out
                                            </a>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login" className="flex items-center mx-4 hover:text-[#0d9488] hover:border-b hover:border-[#0d9488]">
                                    <MdLogin className="mr-2" />Login
                                </Link>
                                <Link href="/auth/register" className="flex items-center mx-4 hover:text-[#0d9488] hover:border-b hover:border-[#0d9488]">
                                    <FaRegUser className="mr-2" />Register
                                </Link>
                            </>
                        )}
                       
                    </div>
                </div>

                {isOpen && (
                    <div className='absolute top-20 left-0 w-full bg-white flex flex-col items-center py-2'>
                        <Link href="/home" className="flex items-center justify-center py-2 w-full px-6 text-center hover:text-[#0d9488] hover:border-b hover:border-[#0d9488]">
                            <AiOutlineHome className="mr-1" />Home
                        </Link>
                         <AskButton toggleQuestionForm={toggleQuestionForm} /*isAuthenticated={isAuthenticated}*/setIsOpen={setIsOpen} />
                        <Link href="/auth/login" className="flex items-center justify-center py-2 w-full px-6 text-center hover:text-[#0d9488] hover:border-b hover:border-[#0d9488]">
                            <MdLogin className="mr-1" />Login
                        </Link>
                        <Link href="/auth/register" className="flex items-center justify-center py-2 w-full px-6 text-center hover:text-[#0d9488] hover:border-b hover:border-[#0d9488]">
                            <FaRegUser className="mr-1" />Register
                        </Link>
                        
                    </div>
                )}

                {isSearchOpen && (
                    <div className='absolute top-20 left-0 w-full bg-white flex items-center justify-center p-4'>
                        <SearchBar placeholder="Search..." onSearch={console.log} />
                    </div>
                )}
            </div>
        </>
    );
}