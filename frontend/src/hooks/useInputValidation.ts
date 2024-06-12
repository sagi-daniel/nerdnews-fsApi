import { useState } from 'react';

function useInputValidation(initialValue: string, validateInput: (value: string) => boolean) {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>('');

  const handleChange = (newValue: string) => {
    setValue(newValue);

    if (!validateInput(newValue)) {
      setError('Hibás érték');
    } else {
      setError('');
    }
  };

  return { value, error, setValue: handleChange }; // Módosítás itt
}

export default useInputValidation;
