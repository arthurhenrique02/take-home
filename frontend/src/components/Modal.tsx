import React from 'react';
import { XCircleIcon } from "@heroicons/react/20/solid";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg p-4 shadow-lg w-[40vw] h-[50vh] flex flex-col">
        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircleIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow flex items-center justify-center">
          <p className="text-center w-full overflow-hidden text-ellipsis">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};
