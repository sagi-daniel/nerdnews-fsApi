interface SelectFieldProps {
  options: { name: string; value: string }[];
  id: string;
  label: string;
  required: boolean;
  value: string;
  setValue: (value: string) => void;
}

function SelectField({ options, id, label, required, value, setValue }: SelectFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <div className="w-full  md:mb-3  ">
      <label className="mb-1 block">{label}</label>

      <select
        id={id}
        value={value}
        onChange={handleChange}
        required={required}
        className="w-full border border-bg-border-light dark:border-bg-dark rounded-md p-2 text-content-light"
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
