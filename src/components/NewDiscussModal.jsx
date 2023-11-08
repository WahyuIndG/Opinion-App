import { useDispatch } from 'react-redux';
import { createPostAsyncThunk } from '../states/posts/action';
import NewDiscussForm from './NewDiscussForm';

const NewDiscussModal = ({ showModal, onClose }) => {
  const dispatch = useDispatch();

  const overlayClickedHandler = (e) => {
    if (e.target.id === 'overlay') {
      onClose();
    }
  };

  const submitHandler = ({ title, category, body }) => {
    dispatch(createPostAsyncThunk({ title, category, body }));
    onClose();
  };

  return (
    <div
      id="overlay"
      onClick={overlayClickedHandler}
      className={`flex justify-center items-center fixed top-0 bottom-0 left-0 right-0  ${
        showModal ? 'visible bg-[rgba(0,0,0,0.60)] ' : 'invisible'
      }`}
    >
      <div className="w-[580px]">
        <h1 className="text-center mb-4 font-semibold">New Opinion</h1>
        <NewDiscussForm showModal={showModal} onSubmit={submitHandler} />
      </div>
    </div>
  );
};

export default NewDiscussModal;
