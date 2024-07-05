import FormWrapper from '../../features/auth/FormWrapper';
import SignupForm from '../../features/auth/forms/SignupForm';

function SignupPage() {
  return (
    <FormWrapper label="Regisztráció" size="large">
      <SignupForm />
    </FormWrapper>
  );
}

export default SignupPage;
