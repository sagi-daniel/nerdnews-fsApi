// InputField.tsx

import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  type?: string;
  id?: string;
  label: string;
  value: string;
  setValue: (newValue: string) => void; // Módosítás itt
  validateInput?: (value: string) => boolean;
  validationResult?: (isValid: boolean) => void;
  errorMessage?: string;
  successMessage?: string;
}

function InputField({
  type = 'text',
  id,
  label,
  value,
  setValue, // Módosítás itt
  validateInput,
  validationResult,
  errorMessage,
  successMessage,
}: InputFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // if (!validateInput(newValue)) {
    //   validationResult(false);
    // } else {
    //   validationResult(true);
    // }
  };

  return (
    <div className=" w-1/2 md:mb-3 md:w-full">
      <label className="mb-1 hidden md:block ">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        className="w-full border border-bg-border-light dark:border-bg-dark rounded-md p-2 text-content-light"
      />
      {/* {!validationResult && <small className="text-error">{errorMessage}</small>}
      {value && validationResult && <small className="text-success">{successMessage}</small>} */}
    </div>
  );
}

export default InputField;
