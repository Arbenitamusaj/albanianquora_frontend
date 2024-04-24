import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import QuestionCard from '../components/QuestionCard';
import QuestionForm from '../components/QuestionForm';
import CategoryButton from '../components/CategoryButton';
import FilterButton from '../components/FilterButton';
import { VscListOrdered } from "react-icons/vsc";


export default function Home() {
    const [showQuestion, setShowQuestion] = useState(false);
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5274/api/QuestionCategory');
                const categoriesData = response.data.map(category => ({
                    id: category.id,
                    name: category.category
                }));
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5274/api/Question');
                setQuestions(response.data);
                console.log("Questions with TimeAgo from backend:", response.data.map(q => q.timeAgo));
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchCategories();
        fetchQuestions();
    }, []);

    const handleCategorySelect = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:5274/api/Question/ByCategory/${categoryId}`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions by category:', error);
        }
    };
    const fetchLatestQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5274/api/Question/latest');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching latest questions:', error);
        }
    };


    return (
        <>
            <div className='bg-gray-100 h-screen relative'>
                <NavBar toggleQuestionForm={() => setShowQuestion(!showQuestion)} />
                <div className="pt-10 px-3 md:px-10 lg:px-20">
                    <div className="w-full flex flex-row justify-center p-1">
                        <div className='w-1/5 hidden md:block'>
                            <div className="flex flex-wrap gap-2">
                               <FilterButton filtername="Top Latest" onClick={fetchLatestQuestions} icon={VscListOrdered} />
                            </div>
                        </div>
                        <div className='w-3/5 flex justify-center flex-col'>
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
                        <div className='w-1/5 hidden md:block'>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <CategoryButton
                                        key={category.id}
                                        category={category}
                                        onSelect={() => handleCategorySelect(category.id)}
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
