interface FormConfirmationProps {
  title: string;
  message: string;
  type?: 'confirm' | 'success' | 'error' | 'thanks';
}

function FormConfirmation({ title, message, type = 'confirm' }: FormConfirmationProps) {
  return (
    <div className={`flex flex-col size-full items-center gap-16 justify-center`}>
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
}

export default FormConfirmation;
