import React from 'react';
import { MdOutlineCategory } from "react-icons/md";

const CategoryButton = ({ category, onSelect }) => {
    return (
        <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className="flex items-center justify-start py-2 w-auto px-6 hover:text-[#0d9488] hover:border-b hover:border-[#0d9488]">
            <MdOutlineCategory className="mr-1" />
            {category.name}
        </button>
           
    );
};

export default CategoryButton;
