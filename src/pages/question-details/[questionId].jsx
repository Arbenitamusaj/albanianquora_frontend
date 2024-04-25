import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import QuestionCard from '../../components/QuestionCard';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Button } from '@mui/material';


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
    const [feedbackMessage, setFeedbackMessage] = useState('');

    useEffect(() => {
        if (questionId) { // Only proceed if questionId is not undefined
            const fetchQuestionDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:5274/api/Question/${questionId}`);
                    setQuestionDetails(response.data);
                } catch (error) {
                    console.error('Error fetching question details:', error);
                } finally {
                    setLoading(false); // Set loading to false regardless of the outcome
                }
            };
            fetchQuestionDetails();
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
            setComment(''); // Clear the comment input field
        } catch (error) {
            console.error('Error posting comment:', error);
            setFeedbackMessage('Failed to post comment.');
        }
    }; 

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!questionDetails) {
        return <p>No question found.</p>; // Handle the case where questionDetails is null
    }

    return (
        <div className='w-full  flex  justify-center flex-col items-center  bg-gray-100'>
            <div className='text-3xl italic my-10'>
                Question Details
            </div>
            <div className=' w-2/3'>
            <QuestionCard
                questionId={questionDetails.questionId}
                avatarUrl={''} // Assuming avatar URL is not provided in the current API response
                name={questionDetails.userName}
                category={questionDetails.category}
                timeAgo={questionDetails.timeAgo}
                title={questionDetails.title}
                content={questionDetails.content}
                // commentsCount={0} // Assuming not provided, set accordingly if available
                // likesCount={0} // Assuming not provided, set accordingly if available
            />
            </div>
            <div className='w-full  flex flex-col items-center '>
                <div className='w-1/2 flex flex-row justify-start items-center p-2'>
                    <span className='text-lg font-semibold'>Add your comment:</span>
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
