import CountdownRedirect from '../../components/CountdownRedirect';

interface FormConfirmationProps {
  title: string;
  message: string;
}

function FormConfirmation({ title, message }: FormConfirmationProps) {
  return (
    <div className="flex justify-center items-center md:w-1/2  text-content-light dark:text-content-dark">
      <div className="text-center mt-10">
        <div className={`flex flex-col justify-center items-center  `}>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-lg mb-4">{message}</p>
          <CountdownRedirect path="/home" counter={30} />
        </div>
      </div>
    </div>
  );
}

export default FormConfirmation;
