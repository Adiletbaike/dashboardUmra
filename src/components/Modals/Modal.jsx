import React from "react";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if(e.target.id === 'wrapper') onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 overflow-y-scroll backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
      id="wrapper"
    >
      <div className="md:w-[600px] w-[90%] mx-auto flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
