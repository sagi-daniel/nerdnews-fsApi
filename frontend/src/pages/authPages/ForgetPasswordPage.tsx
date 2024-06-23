import FormWrapper from '../../features/auth/FormWrapper';
import ForgetPasswordForm from '../../features/auth/forms/ForgotPasswordForm';

function ForgetPasswordPage() {
  return (
    <div className="relative h-screen">
      <FormWrapper label="Jelszó visszaállítás">
        <ForgetPasswordForm />
      </FormWrapper>
    </div>
  );
}

export default ForgetPasswordPage;
