import { FiMail, FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import { useDispatch } from 'react-redux';
import { setAuthUserAsyncThunk } from '../states/authUser/action';
import useInput from '../hooks/useInput';
import { useRef } from 'react';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const onLoginHandler = (e) => {
    e.preventDefault();
    dispatch(setAuthUserAsyncThunk({ email, password }));
    navigate('/', { replace: true });
  };

  return (
    <form
      ref={formRef}
      onSubmit={onLoginHandler}
      className="w-fit p-7 px-10 border-[2px] border-[rgba(121,121,121,0.26)] rounded-2xl flex flex-col items-center gap-4"
    >
      <h1 className="text-3xl font-semibold mb-2">Login</h1>
      <FormInput type={'email'} icon={<FiMail />} placeholder={'john@sample.com'} value={email} setValue={setEmail} />
      <FormInput
        type={'password'}
        icon={<FiLock />}
        placeholder={'at least 6 character'}
        value={password}
        setValue={setPassword}
      />
      <button className="bg-dkText text-dkBackground py-2 px-6 text-lg font-bold rounded-full mt-3">Sign In</button>
      <span className="text-xs text-dkinactive mt-1">
        Don’t have an account ?{' '}
        <Link to="/register" className="text-dkText">
          Create Now
        </Link>
      </span>
    </form>
  );
};

export default LoginForm;
