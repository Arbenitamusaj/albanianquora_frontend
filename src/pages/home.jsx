import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';
import CategoryButton from '../components/CategoryButton';
import FilterButton from '../components/FilterButton';
import { FaRegComments } from "react-icons/fa";
import { VscListOrdered } from "react-icons/vsc";
import { BiLike } from "react-icons/bi";
import { IoEye } from "react-icons/io5";
import Link from 'next/link';
import SearchBar from '../components/SearchBar';

export default function Home() {
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
            const response = await axios.get('http://localhost:5274/api/questions');
            setQuestions(response.data);
            console.log(response.data)

        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };
    const fetchLatestQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5274/api/question/latest');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching latest questions:', error);
        }
    };
    const fetchMostLikedQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5274/api/mostLiked');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching most liked questions:', error);
        }
    };
    const fetchMostCommentedQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5274/api/question/mostCommented');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching most liked questions:', error);
        }
    };
    const fetchMostViewedQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5274/api/question/mostViewed');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching most liked questions:', error);
        }
    };


    const handleCategorySelect = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:5274/api/question/${categoryId}`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions by category:', error);
        }
    };
    const handleSearch = async (searchTerm) => {
        try {
            const response = await axios.get(`http://localhost:5274/api/question/title/search?search=${searchTerm}`);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error performing search:', error);
        }
    };

    return (
        <>
            <div className='bg-gray-100 h-full min-h-screen relative'>
                <div className="pt-10 px-3 md:px-10 lg:px-20">
                    <div className="w-full flex flex-row justify-center p-1">
                        <div className='w-1/5 hidden md:block'>
                            <div className="flex flex-wrap gap-2">
                            <Link href="/category/CategoryTable">
                                Category Table
                            </Link>
                               <FilterButton filtername="Top Latest" onClick={fetchLatestQuestions} icon={VscListOrdered} />
                                <FilterButton filtername="Most Liked" onClick={fetchMostLikedQuestions} icon={BiLike} />
                                <FilterButton filtername="Most Commented" onClick={fetchMostCommentedQuestions} icon={FaRegComments} />
                                <FilterButton filtername="Most Viewed" onClick={fetchMostViewedQuestions} icon={IoEye} />


                            </div>
                        </div>
                        <div className='w-3/5 flex justify-center flex-col'>
                            <div className='mb-10'>
                                <SearchBar placeholder="Search..."  onSearch={handleSearch} />
                            </div>
                    

                            {questions.map(question => (
                                // <Link href={`/question-details/${question.questionId}`}>
                                    <QuestionCard
                                        questionId={question.questionId}
                                        name={question.userName}
                                        category={question.category}
                                        timeAgo={question.timeAgo}
                                        title={question.title}
                                        description={question.content}
                                        views = {question.views}
                                    />
                                // </Link>
                         
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
                </div>
            </div>
        </>
    );
}
