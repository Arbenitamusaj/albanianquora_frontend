import React, { useState } from 'react';
import axios from 'axios';
import {Button } from '@mui/material';


const AddCategoryForm =({handleCloseForm}) =>{
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5274/api/QuestionCategory', { category: categoryName });
      console.log('Response:', response);
      setCategoryName('');
      handleCloseForm();
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  return (
    <div dir="ltr">
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={handleCloseForm} variant="outlined" color="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
    </div>
    
  );
}
export default AddCategoryForm;