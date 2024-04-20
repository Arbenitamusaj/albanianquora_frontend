import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Select, MenuItem, FormControl, InputLabel, TextField, Button } from '@mui/material';

// Import ReactQuill dynamically with no SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // Optional loading component
});

export default function QuestionForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); // State for the category select

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting:', { title, description, category });
    setTitle('');
    setDescription('');
    setCategory('');
  };

  return (
    <>
      {/* <div className='w-11/12 sm:w-5/6 md:w-4/6 bg-white flex flex-col justify-center items-center h-[60vh] sm:h-[50vh] md:h-5/6 rounded-xl'>
        <div>
            You can post your question here
        </div>
        <div className='sm:h-[60vh] md:h-[70vh] w-10/12 flex justify-center items-center '>
          <form onSubmit={handleSubmit} className="w-10/12 h-full">
            <div className='mb-4 w-full h-1/6 sm:h-1/6 md:h-1/6 mt-2'>
              <TextField
                fullWidth
                id="questionTitle"
                label="Question Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your question here"
              />
            </div>
            <div className='mb-4 w-full mb-4 w-full h-1/6 sm:h-1/6 md:h-1/6 mt-2'>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="tech">Technology</MenuItem>
                  <MenuItem value="health">Health</MenuItem>
                  <MenuItem value="science">Science</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className=' w-full h-2/5 '>
              <div className='h-full bg-white'>
                  <ReactQuill 
                      value={description}
                      className='h-3/5 border-gray-400'
                      onChange={setDescription}
                      theme="snow"
                      placeholder="Enter your question description here"

                  />
              </div>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit Question</button>
            </div>
          </form>
        </div>
      </div> */}

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
                            // value={age}
                            label="Choose Category"
                            // onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='h-3/6 mt-2'>
                    <div className='w-full flex h-5/6'>
                        <ReactQuill 
                            value={description}
                            className=' border-gray-400 w-full h-[70%] lg:h-[90%]'  // Ensure full width inside yellow div
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
            <Button variant="contained" color="primary" onClick={() => console.log("Cancelled")}>
                Cancel
            </Button>
            <Button variant="contained" color="secondary" onClick={() => console.log("Continued")} style={{ marginLeft: '8px' }}>
                Continue
            </Button>
        </div>
      </div>
    </>
  );
}
