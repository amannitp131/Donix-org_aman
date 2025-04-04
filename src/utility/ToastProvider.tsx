"use client"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { X, Loader2 } from 'lucide-react';

const ToastProvider = ({ theme = 'light' }) => {
  const showLoadingToast = (message: string) => {
    toast.info(message, {
      icon: <Loader2 className="animate-spin" />, 
      closeButton: ({ closeToast }) => (
        <button
          onClick={closeToast}
          className="p-1 hover:text-red-500 transition duration-300"
        >
          <X size={18} />
        </button>
      ),
      className: 'rounded-2xl shadow-lg border border-blue-500',
      style: {
        background: '#3b82f6',
        color: 'white',        
      },
    });
  };

  return (
    <div>
      <button
        onClick={() => showLoadingToast('Loading... Please wait!')}
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
      >
        Show Loading Toast
      </button>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        pauseOnFocusLoss={false}
        theme={theme}
        className={`${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
         progressClassName="bg-green-500"
      />
    </div>
  );
};

export default ToastProvider;
