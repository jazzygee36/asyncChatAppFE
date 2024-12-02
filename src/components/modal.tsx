import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={onClose}
    >
      {/* Prevent closing the modal when clicking inside */}
      <div
        className='bg-[#282b33] md:w-full w-[90%] max-w-lg rounded-lg shadow-lg p-6 relative '
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none'
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
