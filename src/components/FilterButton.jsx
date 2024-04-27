import React from 'react';

const FilterButton = ({ filtername, onClick, icon: Icon }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center text-gray-700 py-2 w-auto px-6 hover:text-[#456789] hover:border-b hover:border-red-700  hover:text-red-700">
            {Icon && <Icon className='mr-2' />}
            {filtername}
        </button>
    );
}

export default FilterButton;
