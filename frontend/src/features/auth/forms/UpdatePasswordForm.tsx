import { useState } from 'react';

import InputField from '../../../components/form-ui/InputField';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/AuthContext';

function UpdatePasswordForm() {
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { updatePassword } = useAuth();

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    try {
      const passwords = {
        passwordCurrent,
        password,
        passwordConfirm,
      };
      if (passwords) updatePassword(passwords);
    } catch (error) {
      console.error('Failed to request forget password token', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="password"
        id="passwordCurrent"
        label="Jelenlegi jelszó"
        value={passwordCurrent}
        setValue={setPasswordCurrent}
        required={true}
      />
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

export default UpdatePasswordForm;
