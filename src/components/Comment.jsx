import React from 'react';
import { timeAgo } from '../utils/timeAgo'; 
import { removePTags } from '../utils/removePTags'; 

const Comment = ({ username, createdAt, text }) => {
  const formattedDate = timeAgo(createdAt);
  const strippedText = removePTags(text);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{username}</h3>
      <p className="text-gray-700 text-sm mb-2">Posted {formattedDate}</p>
      <p className="text-gray-700">{strippedText}</p>
    </div>
  );
};

export default Comment;
