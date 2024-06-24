import FormWrapper from '../../features/auth/FormWrapper';
import LoginForm from '../../features/auth/forms/LoginForm';

function LoginPage() {
  return (
    <section className="relative h-screen">
      <FormWrapper label="Bejelentkezés">
        <LoginForm />
      </FormWrapper>
    </section>
  );
}

export default LoginPage;
