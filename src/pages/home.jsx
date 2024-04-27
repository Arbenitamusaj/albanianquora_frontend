import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import QuestionCard from '../components/QuestionCard';
import QuestionForm from '../components/QuestionForm';
import CategoryButton from '../components/CategoryButton';
import FilterButton from '../components/FilterButton';
import { VscListOrdered } from "react-icons/vsc";
import Link from 'next/link';

export default function Home() {
    const [showQuestion, setShowQuestion] = useState(false);
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]); 

    useEffect(() => {
        fetchCategories();
        fetchQuestions();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5274/api/QuestionCategory');
            setCategories(response.data.map(category => ({
                id: category.id,
                name: category.category
            })));
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5274/api/Question');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleSearch = async (searchTerm) => {
        if (!searchTerm) {
            fetchQuestions();  // Reload all questions if search is cleared or invalid
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5274/api/question/search?search=${searchTerm}`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error performing search:', error);
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
    const fetchMostLikedQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5274/api/Like/mostLiked');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching most liked questions:', error);
        }
    };
    const fetchMostCommentedQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5274/api/Question/mostCommented');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching most liked questions:', error);
        }
    };
    const fetchMostViewedQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5274/api/Question/mostViewed');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching most liked questions:', error);
        }
    };


    return (
        <>
            <div className='bg-gray-100 h-full min-h-screen relative'>
                <NavBar toggleQuestionForm={() => setShowQuestion(!showQuestion)} onSearch={handleSearch} />
                <div className="pt-10 px-3 md:px-10 lg:px-20">
                    <div className="w-full flex flex-row justify-center p-1">
                        <div className='w-1/5 hidden md:block'>
                            <div className="flex flex-wrap gap-2">
                            <Link href="/category/CategoryTable">
                                Category Table
                            </Link>
                               <FilterButton filtername="Top Latest" onClick={fetchLatestQuestions} icon={VscListOrdered} />
                                <FilterButton filtername="Most Liked" onClick={fetchMostLikedQuestions} icon={VscListOrdered} />
                                <FilterButton filtername="Most Commented" onClick={fetchMostCommentedQuestions} icon={VscListOrdered} />
                                <FilterButton filtername="Most Viewed" onClick={fetchMostViewedQuestions} icon={VscListOrdered} />


                            </div>
                        </div>
                        <div className='w-3/5 flex justify-center flex-col'>
                            {questions.map(question => (

                                <QuestionCard
                                    questionId={question.questionId}
                                    name={question.userName}
                                    category={question.category}
                                    timeAgo={question.timeAgo}
                                    title={question.title}
                                    content={question.content}
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
