import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import QuestionCard from '../../components/QuestionCard';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Button } from '@mui/material';
import Comment from '../../components/Comment'
import { jwtDecode } from 'jwt-decode';
import { showToast } from '../../components/Notify';
import { FaArrowLeft } from "react-icons/fa";
import Link from 'next/link';

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
                    const response = await axios.get(`http://localhost:5274/api/question-details/${questionId}`);
                    setQuestionDetails(response.data);
                    console.log(questionDetails);
                } catch (error) {
                    console.error('Error fetching question details:', error);
                }
            };

            const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5274/api/comments/${questionId}`);
                console.log("Comments fetched:", response.data);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
            };
            const incrementViews = async () => {
                try {
                    await axios.post(`http://localhost:5274/api/incrementView/${questionId}`);
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
    }, [userId,questionId,comment]);
       
const handlePostComment = async () => {
    if (!comment.trim()) {
        showToast("Please, type your comment first!", "error")
        return;
    }

    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await axios.post(`http://localhost:5274/api/comment/${questionId}`, {
            content: comment,
        }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        console.log(response)
        if (response.data) {
            const newComment = {
                ...response.data,
                userName: response.data.userName, 
                createdAt: response.data.createdAt,
                content: response.data.content
            };
            setComments(prevComments => [...prevComments, newComment]);
            setComment(''); // Reset the input field
            showToast('Comment posted successfully!', 'success');
        }

    } catch (error) {
        console.error('Error posting comment:', error);
        showToast('You must be logged in to post a comment', 'error');
    }
};


    const handleDeleteComment = async (commentId) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await axios.delete(`http://localhost:5274/api/comment/${commentId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.status === 200) {
            setComments(comments.filter(comment => comment.id !== commentId));
            showToast('Comment deleted successfully!', 'success');
        } else {
            throw new Error('Failed to delete comment');
            
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        showToast('Failed to delete comment. Please try again.', 'error');
    }
};

const handleEditComment = async (commentId, newContent) => {
    console.log("Editing comment ID:", commentId);
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await axios.put(`http://localhost:5274/api/comment/${commentId}`, {
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
            showToast('Comment edited successfully!','success')
        } else {
            throw new Error('Failed to update comment');
        }
    } catch (error) {
        console.error('Error updating comment:', error);
        showToast('Failed to edit comment. Please try again.','error')
    }
};

    return (
        <div className='w-full  flex  justify-center flex-col items-center  bg-gray-100'>
            <div class='flex justify-start  w-full pl-4 mt-5'> 
              <Link href={`/home`}>
                <div className='flex justify-start items-center'>
                    <FaArrowLeft/>
                    <span className='ml-2'>Go back</span>
                 </div>
              </Link>
            </div>
            <div className='text-3xl italic mb-5'>
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
                    description={questionDetails.content}
                    views = {questionDetails.views}
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

                <div className='w-1/2 flex flex-row justify-end items-center mt-10 p-2 '>
                    <Button variant="contained" color="primary" onClick={handlePostComment}>
                        Post
                    </Button>
                </div>      
            </div>
        </div>
    );
}
