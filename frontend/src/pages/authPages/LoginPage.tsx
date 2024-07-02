import FormWrapper from '../../features/auth/FormWrapper';
import LoginForm from '../../features/auth/forms/LoginForm';

function LoginPage() {
  return (
    <FormWrapper label="Bejelentkezés">
      <LoginForm />
    </FormWrapper>
  );
}

export default LoginPage;
