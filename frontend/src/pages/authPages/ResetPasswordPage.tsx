import FormWrapper from '../../features/auth/FormWrapper';
import ResetPasswordForm from '../../features/auth/forms/ResetPasswordForm';

function ResetPasswordPage() {
  return (
    <FormWrapper label="Jelszó visszaállítás">
      <ResetPasswordForm />
    </FormWrapper>
  );
}

export default ResetPasswordPage;
