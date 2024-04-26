import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import QuestionCard from '../../components/QuestionCard';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Button } from '@mui/material';
import Comment from '../../components/Comment'
import { FaArrowRight } from "react-icons/fa6";
import { jwtDecode } from 'jwt-decode';


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
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.nameid); 
        }
        
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
                console.log("Comments fetched:", response.data);
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
    }, [userId,questionId]);
       
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
    const handleDeleteComment = async (commentId) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await axios.delete(`http://localhost:5274/Comment/comments/${commentId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.status === 200) {
            setComments(comments.filter(comment => comment.id !== commentId));
            setFeedbackMessage('Comment deleted successfully.');
        } else {
            throw new Error('Failed to delete comment');
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        setFeedbackMessage('Failed to delete comment.');
    }
};

const handleEditComment = async (commentId, newContent) => {
    console.log("Editing comment ID:", commentId);
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await axios.put(`http://localhost:5274/Comment/comments/${commentId}`, {
            content: newContent
        }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.status === 200) {
            const updatedComments = comments.map(comment => {
                if (comment.id === commentId) {
                    return { ...comment, content: newContent };
                }
                return comment;
            });
            setComments(updatedComments);
            setFeedbackMessage('Comment updated successfully.');
        } else {
            throw new Error('Failed to update comment');
        }
    } catch (error) {
        console.error('Error updating comment:', error);
        setFeedbackMessage('Failed to update comment.');
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
                        <Comment
                            key={comment.id}
                            commentId={comment.commentId}
                            username={comment.userName}
                            createdAt={comment.timeAgo}
                            text={comment.content}
                            isUserComment={comment.userId === userId}
                            onUpdate={(newContent) => handleEditComment(comment.id, newContent)}
                            onDelete={() => handleDeleteComment(comment.id)}
                        />
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
