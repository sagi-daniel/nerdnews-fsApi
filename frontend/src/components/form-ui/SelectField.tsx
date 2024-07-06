interface SelectFieldProps {
  options: { name: string; value: string }[];
  id: string;
  name: string;
  label: string;
  required: boolean;
  autoComplete?: string;
  value: string;
  setValue: (value: string) => void;
}

function SelectField({ options, id, name, label, required, autoComplete = 'off', value, setValue }: SelectFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <div className="w-full md:mb-3">
      <label htmlFor={id} className="mb-1 block">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-md p-2 text-content-light focus:outline-none focus:ring focus:ring-primary box-border"
      >
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export default SelectField;
