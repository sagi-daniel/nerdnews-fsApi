import FormWrapper from '../../features/auth/FormWrapper';
import UpdatePasswordForm from '../../features/auth/forms/UpdatePasswordForm';

function UpdatePasswordPage() {
  return (
    <div className="relative h-screen">
      <FormWrapper label="Jelszó megváltoztatása" formClosePath="/myAccount">
        <UpdatePasswordForm />
      </FormWrapper>
    </div>
  );
}

export default UpdatePasswordPage;
