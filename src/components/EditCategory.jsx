import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const EditCategoryForm = ({ category, onSubmit, onClose }) => {
    const [categoryName, setCategoryName] = useState(category.category);

    const handleSubmitEditForm = async (event) => {
        event.preventDefault();
        try {
            const updatedCategory = { ...category, category: categoryName };
            await axios.put(`http://localhost:5274/api/QuestionCategory/${category.id}`, updatedCategory);
            onSubmit(updatedCategory);
            onClose();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <div dir="ltr">
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
                    <form onSubmit={handleSubmitEditForm}>
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
                                Update
                            </Button>
                            <Button onClick={onClose} variant="outlined" color="secondary">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryForm;
