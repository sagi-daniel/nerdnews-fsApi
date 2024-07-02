import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SingupModel } from '../../../models/auth.models';
import { useAuth } from '../../../context/AuthContext';
import InputField from '../../../components/form-ui/InputField';
import Button from '../../../components/Button';
import ForgotPasswordForm from './ForgotPasswordForm';
import Modal from '../../../components/Modal';

function SignupForm() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isForgetPasswordModel, setIsForgetPasswordModel] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  /* TODO A validációt megcsinálni */

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('A jelszavak nem egyeznek');
      return;
    }
    try {
      const newUser: SingupModel = {
        userName,
        email,
        password,
        passwordConfirm,
      };

      signup(newUser);
      navigate('/myAccount');
    } catch (error) {
      console.error('Sikertelen regisztráció', error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            type="text"
            id="userName"
            label="Felhasználónév"
            value={userName}
            setValue={setUserName}
            required={true}
          />
          <InputField type="email" id="email" label="Email" value={email} setValue={setEmail} required={true} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            type="password"
            id="password"
            label="Jelszó"
            value={password}
            setValue={setPassword}
            required={true}
          />
          <InputField
            type="password"
            id="passwordConfirm"
            label="Jelszó megerősítése"
            value={passwordConfirm}
            setValue={setPasswordConfirm}
            required={true}
          />
        </div>
        <Button type="submit" text="Regisztráció" size="full" />
      </form>
      <Modal isOpen={isForgetPasswordModel} setIsOpen={setIsForgetPasswordModel}>
        <ForgotPasswordForm />
      </Modal>
    </>
  );
}

export default SignupForm;
