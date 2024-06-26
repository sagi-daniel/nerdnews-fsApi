import React, { useState } from 'react';
import InputField from './InputField';

interface DateRangeFilterProps {
  fromDate: string;
  toDate: string;
  setFromDate: (fromDate: string) => void;
  setToDate: (toDate: string) => void;
}

function DateRangeFilter({ fromDate, toDate, setFromDate, setToDate }: DateRangeFilterProps) {
  const [isValidFromDate, setIsValidFromDate] = useState(true);
  const [isValidToDate, setIsValidToDate] = useState(true);
  const [fromDateError, setFromDateError] = useState('');
  const [toDateError, setToDateError] = useState('');

  const handleFromDateChange = (newValue: string) => {
    if (newValue < toDate) {
      setFromDate(newValue);
      setIsValidFromDate(true);
      setFromDateError('');
    } else {
      setIsValidFromDate(false);
      setFromDateError('Kezdő dátum nem lehet nagyobb vagy egyenlő, mint a vég dátum.');
    }
  };

  const handleToDateChange = (newValue: string) => {
    if (newValue > fromDate) {
      setToDate(newValue);
      setIsValidToDate(true);
      setToDateError('');
    } else {
      setIsValidToDate(false);
      setToDateError('Vég dátum nem lehet kisebb vagy egyenlő, mint a kezdő dátum.');
    }
  };

  return (
    <div className="flex w-full md:w-full md:mb-3 md:flex-col mb-3 gap-2 md-gap-0 rounded-md">
      <InputField
        type="date"
        id="fromDate"
        label="Kezdő dátum:"
        value={fromDate}
        setValue={handleFromDateChange}
        isValid={isValidFromDate}
        errorMessage={fromDateError}
        required={false}
      />
      <InputField
        type="date"
        id="toDate"
        label="Vége dátum:"
        value={toDate}
        setValue={handleToDateChange}
        isValid={isValidToDate}
        errorMessage={toDateError}
        required={false}
      />
    </div>
  );
}

export default DateRangeFilter;
