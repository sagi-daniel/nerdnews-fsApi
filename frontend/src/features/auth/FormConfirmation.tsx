interface FormConfirmationProps {
  title: string;
  message: string;
}

function FormConfirmation({ title, message }: FormConfirmationProps) {
  return (
    <section className="relative h-screen text-content-light dark:text-content-dark">
      <div className={`flex flex-col size-full items-center  justify-center`}>
        <h1>{title}</h1>
        <p>{message}</p>
        {/* {TODO home navigation} */}
      </div>
    </section>
  );
}

export default FormConfirmation;
