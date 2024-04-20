import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm';

export default function Home() {
  const [showQuestion, setShowQuestion] = useState(false);

  const toggleQuestionForm = () => setShowQuestion(!showQuestion);

  return (
    <div className='bg-gray-100 h-screen relative'>
      <button 
        onClick={toggleQuestionForm} 
        className=" top-4 left-4 z-20 px-4 py-2 text-white bg-blue-500 rounded"
      >
        Ask
      </button>
      {showQuestion && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center h-screen">
          <QuestionForm style={{ width: '80vw', height: '80vh', maxWidth: '600px' }} />

        </div>
      )}
    </div>
  );
}
