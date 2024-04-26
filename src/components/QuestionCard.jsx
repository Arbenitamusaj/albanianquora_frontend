import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { BiLike } from "react-icons/bi";
import { removePTags } from '../utils/removePTags';
import { timeAgo as getTimeAgo } from '../utils/timeAgo';
import { useRouter } from 'next/router';


const QuestionCard = ({ questionId, avatarUrl, name, category, timeAgo, title, content, commentsCount, likesCount }) => {
  const strippedContent = removePTags(content);
  const relativeTime = getTimeAgo(timeAgo);
  const [likes, setLikes] = useState(likesCount); // Initialize likes with the initial prop
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const isQuestionDetailPage = router.pathname === '/question-details/[questionId]';
  useEffect(() => {
    const fetchLikesCount = async () => {
      try {
        const response = await axios.get(`http://localhost:5274/api/Like/count/${questionId}`);
        setLikes(response.data); // Update state with the fetched likes count
        console.log('Likes count:', response.data);
      } catch (error) {
        console.error('Error fetching likes count:', error);
      }
    };

    fetchLikesCount();
  }, [questionId]); // Re-run this effect if questionId changes
  useEffect(() => {
    const checkIfLiked = async () => {
        try {
            const response = await axios.get(`http://localhost:5274/api/Like/hasLiked/${questionId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            setLiked(response.data); // Set the initial liked state based on the response
        } catch (error) {
            console.error('Error checking like status:', error);
        }
    };

    checkIfLiked();
}, [questionId]); // Re-run this effect if questionId changes

  const handleLike = async (event) => {
    event.stopPropagation(); // Stop the link navigation
    const authToken = localStorage.getItem('auth-token');
    const updateCount = liked ? -1 : 1; // Determine if we are incrementing or decrementing

    try {
      if (!liked) {
        await axios.post(`http://localhost:5274/api/Like/like/${questionId}`, {}, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
      } else {
        await axios.delete(`http://localhost:5274/api/Like/unlike/${questionId}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
      }
      setLikes(prev => prev + updateCount); // Update likes locally
      setLiked(!liked); // Toggle liked state
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };
  
  return (
      <div className='flex items-center justify-center mb-3'>
        <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white">
          <div className="flex w-full items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-slate-400" style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
              <div className="text-lg font-bold text-slate-700">{name}</div>
            </div>
            <div className="flex items-center space-x-8">
              <button className="rounded-2xl border bg-[#E8DFCA] px-3 py-1 text-xs font-semibold">{category}</button>
              <div className="text-xs text-neutral-500">{relativeTime}</div>
            </div>
          </div>

          <div className="mt-4 mb-6">
            <div className="mb-3 text-xl font-bold">{title}</div>
            <div className="text-sm text-neutral-600" dangerouslySetInnerHTML={{ __html: strippedContent }}></div>
          </div>
          {isQuestionDetailPage ? (
          <div className="flex items-center justify-between text-slate-500">
            <div className="flex space-x-4 md:space-x-8">
           
               <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span>{commentsCount}</span>
              </div> 
              
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                <BiLike onClick={handleLike} className={`cursor-pointer ${liked ? 'text-red-500' : 'text-gray-500'}`} style={{ fontSize: '1.5rem' }} />
                <span>{likes} {liked ? "Unlike" : "Like"}</span>
              </div>

            </div>
          </div>) : (
          <div className="flex justify-end">
            <Link href={`/question-details/${questionId}`}>
                Question Details →          
            </Link>
          </div>
        )}
        </div>
      </div>

  );
};

export default QuestionCard;
