import FormWrapper from '../../features/auth/FormWrapper';
import ResetPasswordForm from '../../features/auth/forms/ResetPasswordForm';

function ResetPasswordPage() {
  return (
    <div className="relative h-screen">
      <FormWrapper label="Jelszó visszaállítás">
        <ResetPasswordForm />
      </FormWrapper>
    </div>
  );
}

export default ResetPasswordPage;
