import React, { useState, ChangeEvent } from "react";

interface InputFieldProps {
  type?: string;
  id?: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  validateInput: (value: string) => boolean;
  validationResult: (isValid: boolean) => void;
  errorMessage: string;
  successMessage: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  id,
  label,
  value,
  setValue,
  validateInput,
  validationResult,
  errorMessage,
  successMessage,
}) => {
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (!validateInput(newValue)) {
      validationResult(false);
      setError(errorMessage);
    } else {
      validationResult(true);
      setError("");
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        className="w-full border border-bg-border-light dark:border-bg-dark rounded-md p-2 text-content-light"
      />
      {error && <small className="text-error">{errorMessage}</small>}
      {value && !error && (
        <small className="text-success">{successMessage}</small>
      )}
    </div>
  );
};

export default InputField;
