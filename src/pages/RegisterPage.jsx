import React from 'react';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <div className="w-full h-[calc(100vh-80px)] grid place-items-center text-lg">
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
