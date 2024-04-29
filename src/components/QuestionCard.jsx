import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { BiLike } from "react-icons/bi";
import { removePTags } from '../utils/removePTags';
import { timeAgo as getTimeAgo } from '../utils/timeAgo';
import { useRouter } from 'next/router';
import { IoEye } from "react-icons/io5";
import { showToast } from './Notify';


const QuestionCard = ({ questionId, avatarUrl, name, category, timeAgo, title, description, likesCount, views }) => {
  const strippedContent = removePTags(description);
  const relativeTime = getTimeAgo(timeAgo);
  const [likes, setLikes] = useState(likesCount); 
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const [commentsCount, setCommentsCount] = useState(0);


    useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5274/api/question/${questionId}/commentcount`);
        setCommentsCount(response.data.commentCount);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching comment count:', error);
      }
    };

    fetchCommentsCount();
  }, [questionId]);
  useEffect(() => {
    const fetchLikesCount = async () => {
      try {
        const response = await axios.get(`http://localhost:5274/api/likes/${questionId}`);
        setLikes(response.data); 
        console.log('Likes count:', response.data);
      } catch (error) {
        console.error('Error fetching likes count:', error);
      }
    };

    fetchLikesCount();
  }, [questionId]); 
  useEffect(() => {
    const checkIfLiked = async () => {
        try {
            const response = await axios.get(`http://localhost:5274/api/hasLiked/${questionId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                }
            });
            setLiked(response.data); 
        } catch (error) {
            console.error('Error checking like status:', error);
        }
    };

    checkIfLiked();
}, [questionId]); 

  const handleLike = async (event) => {
    event.stopPropagation();
    const authToken = localStorage.getItem('auth-token');
    const updateCount = liked ? -1 : 1; 

    try {
      if (!liked) {
        await axios.post(`http://localhost:5274/api/like/${questionId}`, {}, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
      } else {
        await axios.delete(`http://localhost:5274/api/unlike/${questionId}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
      }
      setLikes(prev => prev + updateCount); 
      setLiked(!liked); 
    } catch (error) {
      console.error('Error updating like:', error);
      showToast("You must be logged in to like the question!","error")
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
            <div className="text-sm text-neutral-600 description-container" dangerouslySetInnerHTML={{ __html: strippedContent }}></div>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <div className="flex space-x-4 md:space-x-8">
              {router.pathname === '/home' ?(
                 <Link href={`/question-details/${questionId}`}>
                <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span>{commentsCount}</span>
                </div>
              </Link>
              ):(
                <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span>{commentsCount}</span>
                </div>
              )}
             
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                <BiLike onClick={handleLike} className={`cursor-pointer ${liked ? 'text-red-500' : 'text-gray-500'}`} style={{ fontSize: '1.5rem' }} />
                <span>{likes} {liked ? "Unlike" : "Like"}</span>
              </div>
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                <IoEye/>
                <span>{views}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
  );
};

export default QuestionCard;
