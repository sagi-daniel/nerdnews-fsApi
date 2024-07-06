function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="error-message">
      <p>Error: {message}</p>
    </div>
  );
}

export default ErrorMessage;
