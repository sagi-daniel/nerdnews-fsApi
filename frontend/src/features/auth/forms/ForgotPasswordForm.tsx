import { useState } from 'react';
import InputField from '../../../components/form-ui/InputField';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/AuthContext';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const { forgotPassword, isLoading } = useAuth();

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    forgotPassword(email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="email"
        id="email"
        name="email"
        label="Email"
        value={email}
        setValue={setEmail}
        required={true}
        autoComplete="email"
      />

      <Button isLoading={isLoading} type="submit" text="Jelszó visszaállítás" size="full" />
    </form>
  );
}

export default ForgotPasswordForm;
