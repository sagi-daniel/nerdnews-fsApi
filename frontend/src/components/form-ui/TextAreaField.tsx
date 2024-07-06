import { ChangeEvent } from 'react';

interface TextAreaFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  row: number;
  required: boolean;
  autoComplete?: string;
  setValue: React.Dispatch<React.SetStateAction<string>> | ((newValue: string) => void);
  isValid?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

function TextAreaField({
  id,
  name,
  label,
  value,
  required,
  autoComplete = 'off',
  row,
  setValue,
  isValid,
  errorMessage,
  successMessage,
}: TextAreaFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <div className="w-full md:mb-3">
      <label htmlFor={id} className="mb-1 block">
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          autoComplete={autoComplete}
          className="w-full rounded-md p-2 text-content-light focus:outline-none focus:ring focus:ring-primary box-border"
          rows={row}
        />
      </div>
      {!isValid && <small className="text-error">{errorMessage}</small>}
      {isValid && value && <small className="text-success">{successMessage}</small>}
    </div>
  );
}

export default TextAreaField;
