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
    const [ emri, setEmri] = useState('');
    const [ mbiemri, setMbiemri] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    //const authToken = localStorage.getItem('auth-token');
    //const userId = authToken ? JSON.parse(atob(authToken.split('.')[1])).userId : null;


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
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const userData = {
          emri: FristName,
          mbiemri: LastName,
          email: Email,
          password: Password
        };
      
        try {
          const authToken = localStorage.getItem('auth-token');
          const response = await axios.put('http://localhost:5274/api/User', userData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
            }
          });
      
          console.log('Response:', response);
          setEmri(emri);
          setMbiemri(mbiemri);
          setEmail(email);
          setPassword(password); 
        } catch (error) {
          console.error('Error updating info:', error);
        }
      };

    return (
        <>
            <div className='bg-gray-100 h-screen relative'>
                <NavBar toggleQuestionForm={() => setShowQuestion(!showQuestion)} />
                <div className="pt-10 px-3 md:px-10 lg:px-20">
                    <div className="w-full flex flex-row justify-center p-1">
                        <div className='w-3/5 min-w-40 flex justify-center flex-col gap-5'>
                            <div className="rounded-xl border p-5 shadow-md bg-white">
                                <form className="flex flex-col gap-4 justify-center">
                                    <p className='px-4'>Emri:</p>
                                    <TextField
                                        type="text"
                                        placeholder={emri}
                                        className="border border-gray-300 px-4 pb-2 rounded-md"
                                        value={emri}
                                        onChange={(e) => setEmri(e.target.value)}
                                    />
                                    <p className='px-4'>Mbiermi:</p>
                                    <TextField
                                        type="text"
                                        placeholder={mbiemri}
                                        className="border border-gray-300 px-4 pb-2 rounded-md"
                                        value={mbiemri}
                                        onChange={(e) => setMbiemri(e.target.value)}
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
                            <div className="place-self-center p-6">
                                <h3 className="text-3xl font-bold text-teal-600 w-content text-center w-fit">Pyetjet e juaja</h3>
                            </div>
                            <div>
                                <QuestionCard name={'John Doe'} category={'General'} timeAgo={'2021-09-01T12:00:00Z'} title={'How to use React?'} content={'I am new to React and I am trying to learn how to use it. Can someone help me?'} />
                                {/* {questions.map(question => (
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
                                ))} */}
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
