import React from 'react';
import { useDispatch } from 'react-redux';
import NewCommentForm from './NewCommentForm';

const NewCommentModal = ({ showModal, onCloseModal, post, actionThunk }) => {
  const dispatch = useDispatch();

  const closeHandler = (e) => {
    if (e.target.id === 'overlay') {
      onCloseModal();
    }
  };

  const submitHandler = (body) => {
    dispatch(actionThunk(post.id, body));
    onCloseModal();
  };

  return (
    <aside
      id="overlay"
      onClick={closeHandler}
      className={`flex justify-center items-center fixed top-0 bottom-0 left-0 right-0  ${
        showModal ? 'visible bg-[rgba(0,0,0,0.60)] ' : 'invisible'
      }`}
    >
      <div className="w-[580px]">
        <h1 className="text-center mb-4 font-semibold">Reply Opinion</h1>
        <NewCommentForm showModal={showModal} onSubmit={submitHandler} ownerName={post?.owner?.name} />
      </div>
    </aside>
  );
};

export default NewCommentModal;
