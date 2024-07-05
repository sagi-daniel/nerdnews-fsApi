import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import InputField from '../../../components/form-ui/InputField';
import Button from '../../../components/Button';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { resetPassword } = useAuth();

  const { resetToken } = useParams();

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    try {
      const passwords = {
        password,
        passwordConfirm,
      };
      if (resetToken) resetPassword({ passwords, resetToken });
    } catch (error) {
      console.error('Failed to request forget password token', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="password"
        id="password"
        name="password"
        label="Új jelszó"
        value={password}
        setValue={setPassword}
        required={true}
        autoComplete="new-password"
      />
      <InputField
        type="password"
        id="passwordConfirm"
        name="passwordConfirm"
        label="Új jelszó ismétlés"
        value={passwordConfirm}
        setValue={setPasswordConfirm}
        required={true}
        autoComplete="new-password"
      />
      <Button type="submit" text="Küldés" size="full" />
    </form>
  );
}

export default ResetPasswordPage;
