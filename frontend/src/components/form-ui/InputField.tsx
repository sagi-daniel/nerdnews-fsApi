import { ChangeEvent, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputFieldProps {
  type: 'text' | 'password' | 'email' | 'number' | 'date';
  id: string;
  name: string;
  label: string;
  value: string;
  required: boolean;
  autoComplete?: string;
  setValue: React.Dispatch<React.SetStateAction<string>> | ((newValue: string) => void);
  isValid?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

function InputField({
  type = 'text',
  id,
  name,
  label,
  value,
  required,
  autoComplete = 'off',
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

  // fixed input date style issue
  const inputPaddingClass = type === 'date' ? 'p-[7px]' : 'p-2';

  return (
    <div className="w-full md:mb-3">
      <label className="mb-1 block">{label}</label>
      <div className="relative">
        <input
          type={isPasswordVisible ? 'text' : type}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          autoComplete={autoComplete}
          className={`w-full rounded-md ${inputPaddingClass} text-content-light focus:outline-none focus:ring focus:ring-primary box-border`}
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
