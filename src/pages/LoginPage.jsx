import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] grid place-items-center text-lg">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
