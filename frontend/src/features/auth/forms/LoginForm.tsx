import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../useLogin';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import CustomNavLink from '../../../components/CustomNavLink';

function LoginForm() {
  const [email, setEmail] = useState('testuser7@gmail.com');
  const [password, setPassword] = useState('testUser123');
  const { login } = useLogin();

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      login({ email, password });
      navigate('/myAccount');
    } catch (error) {
      console.error('Failed to login', error);
    }
  }

  return (
    <>
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
      <div className="flex justify-between mt-4">
        <CustomNavLink text="Elfelejtett jelszó" path="/forgetPassword" />
        <CustomNavLink text="Regisztráció" path="/signup" />
      </div>
    </>
  );
}

export default LoginForm;
