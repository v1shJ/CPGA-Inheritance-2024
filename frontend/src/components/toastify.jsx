import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function showSuccessToast(message){
    console.log(message);
    toast.success(message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};

// Error notification
export const showErrorToast = (message) => {
    toast.error(message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    });
};

// Info notification
export const showInfoToast = (message) => {
    toast.info(message, {
        autoClose: 4000,
    });
};

// Custom styled notification
export const showCustomToast = (data) => {
    toast(data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
            backgroundColor: 'white',
            color: 'black',
        },
    });
};


// Loader notification
export const showLoaderToast = (message) => {
    toast.loading(message, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};