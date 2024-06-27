import { useState } from 'react';
import { useResetPassword } from '../useResetPassword';
import InputField from '../../../components/form-ui/InputField';
import Button from '../../../components/Button';
import { useParams } from 'react-router-dom';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { resetPassword } = useResetPassword();

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
        label="Új jelszó"
        value={password}
        setValue={setPassword}
        required={true}
      />
      <InputField
        type="password"
        id="passwordConfirm"
        label="Új jelszó ismétlés"
        value={passwordConfirm}
        setValue={setPasswordConfirm}
        required={true}
      />
      <Button type="submit" text="Küldés" size="full" />
    </form>
  );
}

export default ResetPasswordPage;
