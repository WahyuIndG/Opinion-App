import { FiMail, FiLock, FiAtSign } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormInput from './FormInput';
import useInput from '../hooks/useInput';
import { registerUserAsyncThunk } from '../states/users/action';

function RegisterForm() {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUserAsyncThunk({ name, email, password }));
    navigate('/', { replace: true });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-fit p-7 px-10 border-[2px] border-[rgba(121,121,121,0.26)] rounded-2xl flex flex-col items-center gap-4"
    >
      <h1 className="text-3xl font-semibold mb-2">Register</h1>
      <FormInput
        type="name"
        icon={<FiAtSign />}
        placeholder="john_doe"
        value={name}
        setValue={setName}
      />
      <FormInput
        type="email"
        icon={<FiMail />}
        placeholder="john@sample.com"
        value={email}
        setValue={setEmail}
      />
      <FormInput
        type="password"
        icon={<FiLock />}
        placeholder="at least 6 character"
        value={password}
        setValue={setPassword}
      />
      <button className="bg-dkText text-dkBackground py-2 px-6 text-lg font-bold rounded-full mt-3">
        Sign Up
      </button>
      <span className="text-xs text-dkinactive mt-1">
        Already have an account ?{' '}
        <Link to="/login" className="text-dkText">
          Come On
        </Link>
      </span>
    </form>
  );
}

export default RegisterForm;
