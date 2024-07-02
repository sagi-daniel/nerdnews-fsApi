import FormWrapper from '../../features/auth/FormWrapper';
import UpdatePasswordForm from '../../features/auth/forms/UpdatePasswordForm';

function UpdatePasswordPage() {
  return (
    <FormWrapper label="Jelszó megváltoztatása" formClosePath="/myAccount">
      <UpdatePasswordForm />
    </FormWrapper>
  );
}

export default UpdatePasswordPage;
