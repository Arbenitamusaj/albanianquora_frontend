import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCategory from '@/components/AddCategorymyalias';

function CategoryTable() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5274/api/QuestionCategory');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="px-6 py-4 relative overflow-x-auto  sm:rounded-lg  shadow-md">
            <div dir="rtl">
            <div class="absolute h-14 w-14 top-8 start-10">
                <AddCategory />
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
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-4">Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryTable;