import React from "react";

const DeleteButton = (props) => {
  const { setIsDelete, handleDelete, deleteId } = props;
  return (
    <>
      <div className="delete-btn-confirmation-container">
        <p className="delete-container-text">
          Are you sure you want to delete?
        </p>
        <div className="delete-btn-container">
          <button className="cancel-btn" onClick={() => setIsDelete(false)}>
            Cancel
          </button>
          <button className="delete-btn" onClick={() => handleDelete(deleteId)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteButton;
