import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

export default function Profile() {
    const [ firstName, setFirstName] = useState('');
    const [ lastName, setLastName] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            const authToken = localStorage.getItem('auth-token');
            if (!authToken) {
                console.error('No auth token found');
                return;
            }

            try {
                const url = `http://localhost:5274/api/User`; 
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                const { firstName, lastName, email } = response.data;
                setFirstName(firstName);
                setLastName(lastName);
                setEmail(email);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
}, []);

const handleSubmit = async (event) => {
    event.preventDefault();
  
    const authToken = localStorage.getItem('auth-token');
    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password  
    };

    try {
        const response = await axios.put(`http://localhost:5274/api/User`, userData, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        console.log('Response:', response);
        alert('Profile updated successfully');
    } catch (error) {
        console.error('Error updating info:', error);
    }
};

    return (
        <>
            <div className='bg-gray-100 h-screen relative'>
                {/* <NavBar/> */}
                <div className="pt-10 px-3 md:px-10 lg:px-20">
                    <div className="w-full flex flex-row justify-center p-1">
                        <div className='w-3/5 min-w-40 flex justify-center flex-col gap-5'>
                            <div className="rounded-xl border p-5 shadow-md bg-white">
                                <form className="flex flex-col gap-4 justify-center">
                                <p className='px-4'>Firstname</p>
                                    <TextField
                                        type="text"
                                        placeholder={firstName}
                                        className="border border-gray-300 px-4 pb-2 rounded-md"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <p className='px-4'>Lastname:</p>
                                    <TextField
                                        type="text"
                                        placeholder={lastName}
                                        className="border border-gray-300 px-4 pb-2 rounded-md"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    <p className='px-4'>Email:</p>
                                    <TextField
                                        type="email"
                                        placeholder={email}
                                        className="border border-gray-300 px-4 pb-2 rounded-md"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <p className='px-4'>Password:</p>
                                    <TextField
                                        type="password"
                                        placeholder="password"
                                        className="border border-gray-300 px-4 pb-2 rounded-md"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        className="bg-teal-600 text-white px-4 py-2 rounded-md"
                                        onAbort={handleSubmit}
                                    >
                                        Ndrysho
                                    </Button>   
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}