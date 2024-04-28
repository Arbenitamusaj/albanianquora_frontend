import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

export const showToast = (message, type = "success") => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  }
};

const Notify = () => {
  return <ToastContainer />;
};

export default Notify;
