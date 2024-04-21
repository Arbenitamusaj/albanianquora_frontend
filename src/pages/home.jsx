import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import NavBar from '../components/NavBar';

export default function Home() {
  const [showQuestion, setShowQuestion] = useState(false);

  return (
    <div className='bg-gray-100 h-screen relative'>
      <NavBar toggleQuestionForm={() => setShowQuestion(!showQuestion)} />
      {showQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <QuestionForm style={{ width: '80vw', height: '80vh', maxWidth: '600px' }} />
        </div>
      )}
    </div>
  );
}