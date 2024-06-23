import FormWrapper from '../../features/auth/FormWrapper';
import SignupForm from '../../features/auth/forms/SignupForm';

function SignupPage() {
  return (
    <div className="relative h-screen">
      <FormWrapper label="Regisztráció" size="medium">
        <SignupForm />
      </FormWrapper>
    </div>
  );
}

export default SignupPage;
