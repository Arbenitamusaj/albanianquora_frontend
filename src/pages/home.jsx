import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import QuestionCard from '../components/QuestionCard';
import QuestionForm from '../components/QuestionForm';
import CategoryButton from '../components/CategoryButton';

export default function Home() {
    const [showQuestion, setShowQuestion] = useState(false);
    const [categories, setCategories] = useState([]); 

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

        fetchCategories();
    }, []);

    const handleCategorySelect = categoryId => {
        console.log(`Category selected: ${categoryId}`);
    };

    return (
        <>
            <div className='bg-gray-100 h-screen relative'>
                <NavBar toggleQuestionForm={() => setShowQuestion(!showQuestion)} />
                <div className="pt-10 px-3 md:px-10 lg:px-20">
                    <div className="w-full flex flex-row justify-center p-1">
                        <div className='w-1/5 hidden md:block'>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <CategoryButton
                                        key={category.id}
                                        category={category}
                                        onSelect={handleCategorySelect}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='w-3/5 flex justify-center'>
                            <QuestionCard
                                avatarUrl="https://i.pravatar.cc/150"
                                name="Arbenita"
                                category="Lifestyle"
                                timeAgo="2 hours ago"
                                title="How do lifestyle choices influence overall health?"
                                content="Aliquam a tristique sapien, nec bibendum urna. Maecenas convallis dignissim turpis, non suscipit mauris interdum at."
                                commentsCount="4"
                                likesCount="125"
                            />
                        </div>
                        <div className='w-1/5 hidden md:block'>
                            {/* Placeholder for additional sidebar or content */}
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
