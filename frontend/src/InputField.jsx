import React, { useState } from 'react';

const InputField = ({
  type = 'text',
  id,
  label,
  value,
  setValue,
  validateInput,
  validationResult,
  errorMessage,
  successMessage,
}) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const newvalue = e.target.value;
    setValue(newvalue);

    if (!validateInput(newvalue)) {
      validationResult(false);
      setError(errorMessage);
    } else {
      validationResult(true);
      setError('');
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
      {value && !error && <small className="text-success">{successMessage}</small>}
    </div>
  );
};

export default InputField;
