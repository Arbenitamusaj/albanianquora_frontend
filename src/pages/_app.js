import { useRouter } from 'next/router';
import '../styles/globals.css';
import AuthProvider from '../../context/AuthContext';
import NavBar from '../components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import QuestionForm from '../components/QuestionForm';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isNotHomePage = router.pathname !== '/home';
  const [showQuestion, setShowQuestion] = useState(false);


  return (
    <AuthProvider>
      <NavBar toggleQuestionForm={() => setShowQuestion(!showQuestion)} />
      <Component {...pageProps} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        limit={3}
      />
      {showQuestion && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <QuestionForm 
                                toggleForm={() => setShowQuestion(false)} 
                                style={{ width: '80vw', height: '80vh', maxWidth: '600px' }} 
                            />
                        </div>
                    )}
    </AuthProvider>
  );
}
