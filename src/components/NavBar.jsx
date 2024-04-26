import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';
import { MdLogin } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import AskButton from '../components/AskButton'; 
import AddCategory from './AddCategory';

export default function NavBar({ toggleQuestionForm, onSearch }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
                        <Link href="/auth/login" className="flex items-center mx-4 hover:text-[#0d9488] hover:border-b hover:border-[#0d9488]">
                            <MdLogin className="mr-2" />Login
                        </Link>
                        <Link href="/auth/register" className="flex items-center mx-4 hover:text-[#0d9488] hover:border-b hover:border-[#0d9488]">
                            <FaRegUser className="mr-2" />Register
                        </Link>
                        <AddCategory/>
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