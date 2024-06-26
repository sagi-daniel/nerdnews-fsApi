import { ChangeEvent, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputFieldProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'date'; // Restrict type to specific values
  id?: string;
  label: string;
  value: string;
  required: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>> | ((newValue: string) => void);
  isValid?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

function InputField({
  type = 'text',
  id,
  label,
  value,
  required,
  setValue,
  isValid,
  errorMessage,
  successMessage,
}: InputFieldProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="mb-3 w-full">
      <label className="block mb-1">{label}</label>
      <div className="relative">
        <input
          type={isPasswordVisible ? 'text' : type}
          id={id}
          value={value}
          onChange={handleChange}
          required={required}
          className="w-full rounded-md p-2 text-content-light focus:outline-none focus:ring focus:ring-primary"
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute text-2xl text-border-dark inset-y-0 right-0 px-3 py-1"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
          </button>
        )}
      </div>
      {!isValid && <small className="text-error">{errorMessage}</small>}
      {isValid && value && <small className="text-success">{successMessage}</small>}
    </div>
  );
}

export default InputField;
