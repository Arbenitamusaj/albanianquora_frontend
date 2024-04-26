import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import QuestionCard from '../../components/QuestionCard';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Button } from '@mui/material';
import Comment from '../../components/Comment'
import { FaArrowRight } from "react-icons/fa6";



const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
export default function QuestionDetails() {
    const router = useRouter();
    const { questionId } = router.query;
    const [questionDetails, setQuestionDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    useEffect(() => {
        if (questionId) {
            setLoading(true);
            const fetchQuestionDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:5274/api/Question/${questionId}`);
                    setQuestionDetails(response.data);
                    console.log(questionDetails);
                } catch (error) {
                    console.error('Error fetching question details:', error);
                }
            };

            const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5274/Comment/byQuestion/${questionId}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
            };
            const incrementViews = async () => {
                try {
                    await axios.post(`http://localhost:5274/api/Question/incrementView/${questionId}`);
                } catch (error) {
                    console.error('Error incrementing views:', error);
                }
            };
            if (questionId) {
                incrementViews();  
            }

            fetchQuestionDetails();
            fetchComments();
            setLoading(false);
        }
    }, [questionId]);
       
    const handlePostComment = async () => {
        if (!comment.trim()) {
            setFeedbackMessage('Comment content cannot be empty.');
            return;
        }
        
        try {
            const authToken = localStorage.getItem('auth-token');
            await axios.post(`http://localhost:5274/Comment/comments/${questionId}`, {
                content: comment,
            }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            setFeedbackMessage('Comment posted successfully.');
            setComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
            setFeedbackMessage('Failed to post comment.');
        }
    }; 

    return (
        <div className='w-full  flex  justify-center flex-col items-center  bg-gray-100'>
            <div className='text-3xl italic my-10'>
                Question Details
            </div>
        {questionDetails ? (
            <div className=' w-2/3'>
            <QuestionCard
                questionId={questionId}
                avatarUrl={''}
                name={questionDetails.userName}
                category={questionDetails.category}
                timeAgo={questionDetails.timeAgo}
                title={questionDetails.title}
                content={questionDetails.content}
                commentsCount={comments.length} 
                likesCount={comments.length}
            />
            </div>
        ) : (
            <p>Loading question details...</p> 
        )}
            <div className='w-full  flex flex-col items-center '>
                <div className='w-1/2 flex flex-row justify-start items-center p-2'>
                    <span className='text-base font-semibold'>Comment Section:</span>
                </div>
                <div className='w-1/2 rounded-xl p-2 '>
            {comments.map(comment => (
                <Comment username={comment.userName} createdAt={comment.timeAgo} text={comment.content} />
            ))}
                </div>
                <div className='w-1/2 flex flex-row justify-start items-center p-2'>
                    <span className='text-base font-semibold'>Add your comment:</span>
                </div>
                <div className='w-1/2 rounded-xl p-2 '>
                    <ReactQuill 
                        value={comment}
                        className='border-black w-full '  
                        onChange={setComment}
                        theme="snow"
                        placeholder="Enter your question description here"
                        style={{ height: '200px' }}
                    />
                </div>

            {feedbackMessage && <div className="w-1/2 text-center">{feedbackMessage}</div>}
                <div className='w-1/2 flex flex-row justify-end items-center mt-10 p-2 '>
                    <Button variant="contained" color="primary" onClick={handlePostComment}>
                        Post
                    </Button>
                </div>      
            </div>


        </div>
    );
}
