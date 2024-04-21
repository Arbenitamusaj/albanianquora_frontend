import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { MdQuestionAnswer } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext'; 

const AskButton = ({ toggleQuestionForm, setIsOpen }) => {
    const router = useRouter();
    const { isAuthenticated } = useContext(AuthContext);

    const handleAskClick = () => {
        if (isAuthenticated) {
            toggleQuestionForm();
            setIsOpen(false);
        } else {
            router.push('/auth/login');
        }
    };

    return (
        <button onClick={handleAskClick} className="flex items-center justify-center py-2 w-full px-6 text-center hover:text-[#0d9488] hover:border-b hover:border-[#0d9488]">
            <MdQuestionAnswer className="mr-1" />Ask
        </button>
    );
};

export default AskButton;