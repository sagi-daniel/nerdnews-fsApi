import React from 'react';
import InputField from './InputField';

interface DateRangeFilterProps {
  dateRange: { fromDate: string; toDate: string };
  setDateRange: React.Dispatch<React.SetStateAction<{ fromDate: string; toDate: string }>>;
}

function useInputValidation(initialValue: string, validateInput: (value: string) => boolean) {
  const [value, setValue] = React.useState<string>(initialValue);
  const [error, setError] = React.useState<string>('');

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

function DateRangeFilter({ dateRange, setDateRange }: DateRangeFilterProps) {
  const fromDateInput = useInputValidation(dateRange.fromDate, (value) => true);
  const toDateInput = useInputValidation(dateRange.toDate, (value) => true);

  const handleFromDateChange = (newValue: string) => {
    fromDateInput.setValue(newValue); // Módosítás itt
    setDateRange((prev) => ({ ...prev, fromDate: newValue }));
  };

  const handleToDateChange = (newValue: string) => {
    toDateInput.setValue(newValue); // Módosítás itt
    setDateRange((prev) => ({ ...prev, toDate: newValue }));
  };

  return (
    <div className="flex w-full md:flex-col mb-3 gap-2 md-gap-0 rounded-md ">
      <InputField
        type="date"
        id="fromDate"
        label="Kezdő dátum:"
        value={fromDateInput.value}
        setValue={handleFromDateChange}
        errorMessage={fromDateInput.error}
        successMessage="Érvényes érték"
      />

      <InputField
        type="date"
        id="toDate"
        label="Vége dátum:"
        value={toDateInput.value}
        setValue={handleToDateChange}
        errorMessage={toDateInput.error}
        successMessage="Érvényes érték"
      />
    </div>
  );
}

export default DateRangeFilter;
