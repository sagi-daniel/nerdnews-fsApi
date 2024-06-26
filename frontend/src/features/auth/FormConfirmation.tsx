import CountdownRedirect from '../../components/CountdownRedirect';

interface FormConfirmationProps {
  title: string;
  message: string;
}

function FormConfirmation({ title, message }: FormConfirmationProps) {
  return (
    <section className="relative h-screen text-content-light dark:text-content-dark">
      <div className={`flex flex-col size-full items-center  justify-center`}>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-4">{message}</p>
        <CountdownRedirect path="/home" counter={10} />
      </div>
    </section>
  );
}

export default FormConfirmation;
