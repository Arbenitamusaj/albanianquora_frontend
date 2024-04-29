import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';


export default function profileQuestions() {
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
    

    return (
        <>
            <div className='bg-gray-100 h-screen relative'>
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
                </div>
            </div>
        </>
    );
}