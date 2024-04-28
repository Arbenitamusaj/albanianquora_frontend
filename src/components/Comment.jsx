import React, { useState } from 'react';
import { IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { timeAgo } from '../utils/timeAgo';
import { removePTags } from '../utils/removePTags';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const Comment = ({ username, createdAt, text, isUserComment, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const formattedDate = timeAgo(createdAt);
  const strippedText = removePTags(text || '');  // Pass an empty string if text is undefined

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    onUpdate(editedText);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedText(text); // Reset to original text if cancel
    setEditMode(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-2 relative">
      <h3 className="text-lg font-bold">{username}</h3>
      <p className="text-gray-700 text-sm mb-2">Posted {formattedDate}</p>
      {editMode ? (
        <div className='w-full rounded-xl p-2'>
          <ReactQuill
            value={editedText}
            onChange={setEditedText}
            theme="snow"
            style={{ height: '180px' }}
          />
          <div className='flex flex-row justify-end items-center mt-16'>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancel} style={{ marginLeft: '8px' }}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: strippedText }}></div>
      )}
      {isUserComment && !editMode && (
        <div className="absolute top-2 right-2 flex">
          <IconButton onClick={handleEdit} aria-label="edit comment">
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete} aria-label="delete comment">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Comment;
