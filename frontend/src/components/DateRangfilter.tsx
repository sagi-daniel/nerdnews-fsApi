import InputField from './InputField';
import useInputValidation from '../hooks/useInputValidation';

interface DateRangeFilterProps {
  fromDate: string;
  toDate: string;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
}

function DateRangeFilter({ fromDate, toDate, setFromDate, setToDate }: DateRangeFilterProps) {
  const fromDateInput = useInputValidation(fromDate, () => true);
  const toDateInput = useInputValidation(toDate, () => true);
  const handleFromDateChange = (newValue: string) => {
    fromDateInput.setValue(newValue);
    setFromDate(newValue);
  };

  const handleToDateChange = (newValue: string) => {
    toDateInput.setValue(newValue);
    setToDate(newValue);
  };

  return (
    <div className="flex w-full md:flex-col mb-3 gap-2 md-gap-0 rounded-md ">
      <InputField
        type="date"
        id="fromDate"
        label="Kezdő dátum:"
        value={fromDateInput.value}
        defaultValue={fromDate}
        setValue={handleFromDateChange}
        errorMessage={fromDateInput.error}
        successMessage="Érvényes érték"
      />

      <InputField
        type="date"
        id="toDate"
        label="Vége dátum:"
        value={toDateInput.value}
        defaultValue={toDate}
        setValue={handleToDateChange}
        errorMessage={toDateInput.error}
        successMessage="Érvényes érték"
      />
    </div>
  );
}

export default DateRangeFilter;
