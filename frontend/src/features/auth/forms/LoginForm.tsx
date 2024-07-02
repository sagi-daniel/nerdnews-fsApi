import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import InputField from '../../../components/form-ui/InputField';
import Button from '../../../components/Button';
import CustomNavLink from '../../../components/CustomNavLink';
import UpdatePasswordForm from './UpdatePasswordForm';
import Modal from '../../../components/Modal';
import ForgotPasswordForm from './ForgotPasswordForm';

function LoginForm() {
  const [email, setEmail] = useState('testuser7@gmail.com');
  const [password, setPassword] = useState('testUser123');
  const [isForgetPasswordModel, setIsForgetPasswordModel] = useState(false);
  const { login } = useAuth();

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
        <CustomNavLink text="Elfelejtett jelszó" onClick={() => setIsForgetPasswordModel(true)} />
        <CustomNavLink text="Regisztráció" path="/signup" />
      </div>
      <Modal isOpen={isForgetPasswordModel} setIsOpen={setIsForgetPasswordModel}>
        <ForgotPasswordForm />
      </Modal>
    </>
  );
}

export default LoginForm;
