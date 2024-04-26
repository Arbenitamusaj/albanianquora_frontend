import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import QuestionCard from '../components/QuestionCard';
import QuestionForm from '../components/QuestionForm';
import CategoryButton from '../components/CategoryButton';
import { Select, MenuItem, FormControl, InputLabel, TextField, Button } from '@mui/material';

export default function Profile() {
    const [showQuestion, setShowQuestion] = useState(false);
    const [questions, setQuestions] = useState([]); 

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5274/api/Question', {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                    }
                  });
                setQuestions(response.data);
                console.log("Questions with TimeAgo from backend:", response.data.map(q => q.timeAgo));
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);
    
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

    return (
        <>
            <div className='bg-gray-100 h-screen relative'>
                <NavBar toggleQuestionForm={() => setShowQuestion(!showQuestion)} />
                <div className="pt-10 px-3 md:px-10 lg:px-20">
                    <div className="w-full flex flex-row justify-center p-1">
                        <div className='w-3/5 min-w-40 flex justify-center flex-col gap-5'>
                            <div className="place-self-center p-6">
                                <h3 className="text-3xl font-bold text-teal-600 w-content text-center w-fit">Pyetjet e juaja</h3>
                            </div>
                            <div>
                                {questions.map(question => (
                                    <QuestionCard
                                        key={question.questionId}
                                        // avatarUrl={question.avatarUrl}
                                        name={question.userName}
                                        category={question.category}
                                        timeAgo={question.timeAgo}
                                        title={question.title}
                                        content={question.content}
                                        // Pass the commentsCount and likesCount when they are available
                                        // commentsCount={question.commentsCount}
                                        // likesCount={question.likesCount}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    {showQuestion && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <QuestionForm 
                                toggleForm={() => setShowQuestion(false)} 
                                style={{ width: '80vw', height: '80vh', maxWidth: '600px' }} 
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}