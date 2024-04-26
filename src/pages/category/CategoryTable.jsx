import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCategory from '@/components/AddCategorymyalias';
import EditCategory from '@/components/EditCategorymyalias';
import DeleteConfirmation from '@/components/DeleteConfirmationmyalias';

function CategoryTable() {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5274/api/QuestionCategory');
                const sortedCategories = response.data.sort((a, b) => a.id.localeCompare(b.id));
                setCategories(sortedCategories);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleEditClick = (category) => {
        setEditingCategory(category);
        setShowEditForm(true);
    };

    const handleCloseEditForm = () => {
        setShowEditForm(false);
        setEditingCategory(null);
    };

    const handleUpdateCategory = (updatedCategory) => {
        const updatedCategories = categories.map((cat) =>
            cat.id === updatedCategory.id ? updatedCategory : cat
        );
        setCategories(updatedCategories);
    };


    const handleDelete = (category) => {
        setDeleteCategory(category);
        setIsConfirmationOpen(true);
    };

    const handleCancelDelete = () => {
        setDeleteCategory(null);
        setIsConfirmationOpen(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5274/api/QuestionCategory/${deleteCategory.id}`);
            setCategories(categories.filter((cat) => cat.id !== deleteCategory.id));
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            setIsConfirmationOpen(false);
        }
    };


    return (
        <div className="px-6 py-4 relative overflow-x-auto  sm:rounded-lg  shadow-md">
            <div dir="rtl">
            <div class="absolute h-14 w-14 top-8 start-10">
                <AddCategory />
                {showEditForm && (
                <EditCategory
                    category={editingCategory}
                    onSubmit={handleUpdateCategory}
                    onClose={handleCloseEditForm}
                />
                )}
            </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-gray-200">
                    Categories
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-500">These are existing categories</p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Category Name
                        </th>
                        <th scope="col" className="px-6 py-4 text-right">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td class="text-sm text-gray-700 border-b px-6 py-4x">
                                {category.category}
                            </td>
                            <td className="px-6 py-4 border-b text-right">
                                <button onClick={() => handleEditClick(category)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(category)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-4">
                                    Delete
                                </button>               
                             </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteConfirmation
                isOpen={isConfirmationOpen}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default CategoryTable;