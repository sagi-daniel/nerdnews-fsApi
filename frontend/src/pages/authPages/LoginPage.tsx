import FormWrapper from '../../features/auth/FormWrapper';
import LoginForm from '../../features/auth/forms/LoginForm';

function LoginPage() {
  return (
    <div className="relative h-screen">
      <FormWrapper label="Bejelentkezés">
        <LoginForm />
      </FormWrapper>
    </div>
  );
}

export default LoginPage;
