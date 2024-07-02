import FormWrapper from '../../features/auth/FormWrapper';
import ForgetPasswordForm from '../../features/auth/forms/ForgotPasswordForm';

function ForgetPasswordPage() {
  return (
    <FormWrapper label="Jelszó visszaállítás" formClosePath="/login">
      <ForgetPasswordForm />
    </FormWrapper>
  );
}

export default ForgetPasswordPage;
