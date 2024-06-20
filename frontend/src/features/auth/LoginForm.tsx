import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './useLogin';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { FiX } from 'react-icons/fi';
import CloseIcon from '../../components/CloseIcon';

function LoginForm() {
  const { login } = useLogin();
  const [email, setEmail] = useState('testuser7@gmail.com');
  const [password, setPassword] = useState('testUser123');

  const navigate = useNavigate();

  function handleCloseLogin() {
    navigate('/home');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/myAccount');
    } catch (error) {
      console.error('Failed to login', error);
    }
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="relative bg-border-dark text-content-dark p-8 rounded-md w-96">
        <CloseIcon onClick={handleCloseLogin} path="/home" />
        <h2 className=" mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <InputField type="email" id="email" label="Email" value={email} setValue={setEmail} required={true} />
          <InputField
            type="password"
            id="password"
            label="Jelszó"
            value={password}
            setValue={setPassword}
            required={true}
          />

          <Button type="submit" text="Bejelentkezés" size="full" />
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
