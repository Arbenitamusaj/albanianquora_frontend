import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { Select, MenuItem, FormControl, InputLabel, TextField, Button } from '@mui/material';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function QuestionForm({toggleForm}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
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

const handleSubmit = async (event) => {
  event.preventDefault();

  const questionData = {
    QuestionTitle: title,
    QuestionDescription: description,
    QuestionCategoryId: category
  };

  try {
    const response = await axios.post('http://localhost:5274/api/Question', questionData);
    console.log('Response:', response);
    setTitle('');
    setDescription('');
    setCategory('');
    toggleForm(); 
  } catch (error) {
    console.error('Error submitting question:', error);
  }
};


  return (
    <>
      <div className='relative w-11/12 sm:w-7/12 flex flex-col bg-white flex h-[87vh] '>
        <div className='w-full h-[10vh] bg-gray-100 p-2 text-lg sm:text-xl flex flex-row items-end '>
            <div className='bg-green-100'>
                Post Question
            </div>
        </div>
        <div className='w-full h-[100vh] p-2 sm:p-10'>
            <div className=' h-full p-2'>
                <div className='h-1/6 flex items-center justify-center'>
                    <div className='w-full h-1/2 flex items-center justify-center '>
                        <TextField
                            fullWidth
                            size="small"
                            id="questionTitle"
                            label="Question Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your question here"
                        />
                    </div>
                </div>
        <div className='h-1/6 flex items-center justify-center'>
          <div className='w-full h-1/2 text-white flex items-center justify-center'>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Choose Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Choose Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
                <div className='h-3/6 mt-2'>
                    <div className='w-full flex h-5/6'>
                        <ReactQuill 
                            value={description}
                            className=' border-gray-400 w-full h-[70%] lg:h-[90%]'  
                            onChange={setDescription}
                            theme="snow"
                            placeholder="Enter your question description here"
                            style={{ height: '125`px' }}
                        />
                    </div>
                </div>

            </div>
        </div>
        <div className='w-full bg-green-900 h-1/5 flex items-center justify-center sm:justify-end p-4'>
            <Button variant="contained" color="primary" onClick={() => toggleForm()}>
                Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} color="secondary"  style={{ marginLeft: '8px' }}>
                Continue
            </Button>
        </div>
      </div>
    </>
  );
}