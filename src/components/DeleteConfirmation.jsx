import React from 'react';
import { Button } from '@mui/material';

const DeleteConfirmation = ({ isOpen, onCancel, onConfirm }) => {
    return (
        <div dir="ltr">
            <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
                <p className="mb-4">Are you sure you want to delete?</p>
                <div className="flex justify-end">
                    <Button onClick={onConfirm} variant="contained" color="primary" className="ml-2">
                        Confirm
                    </Button>
                    <Button onClick={onCancel} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default DeleteConfirmation;
