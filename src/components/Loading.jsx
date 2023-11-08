import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

const Loading = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-10">
      <LoadingBar style={{ backgroundColor: 'whitesmoke' }} />
    </div>
  );
};

export default Loading;
