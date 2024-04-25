import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext'; 
import AddCategoryForm from './AddCategoryForm'; 


const AddCategory = () => {
    const router = useRouter();
    const { isAuthenticated } = useContext(AuthContext);
    const [showForm, setShowForm] = useState(false); 

    const handleAddCategoryClick = () => {
        if (isAuthenticated) {
            setShowForm(true);
        } else {
            router.push('/auth/login');
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div>
            <button onClick={handleAddCategoryClick} className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                Add Category
            </button>
            {/* Conditionally render the form based on showForm state */}
            {showForm && <AddCategoryForm handleCloseForm={handleCloseForm} />}
        </div>
    );
};

export default AddCategory;