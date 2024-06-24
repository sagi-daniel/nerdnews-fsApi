import { useState } from 'react';
import { useForgotPassword } from '../useforgotPassword';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('testuser7@gmail.com');
  const { forgotPassword, isLoading } = useForgotPassword();

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    forgotPassword({ email });
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField type="email" id="email" label="Email" value={email} setValue={setEmail} required={true} />

      <Button isLoading={isLoading} type="submit" text="Jelszó visszaállítás" size="full" />
    </form>
  );
}

export default ForgotPasswordForm;
