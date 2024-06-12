interface SelectFieldProps {
  options: { name: string; value: string }[];
  id: string;
  label: string;
  value: string;
  setValue: (sortOrder: string) => void;
  handleSortOrderChange: (value: string) => void;
}

function SelectField({ options, id, label, value, setValue, handleSortOrderChange }: SelectFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    handleSortOrderChange(newValue);
  };

  return (
    <div className="w-1/2 md:w-full md:mb-3  ">
      <label className="mb-1 hidden md:block">{label}</label>

      <select
        id={id}
        value={value}
        onChange={handleChange}
        className="w-full border border-bg-border-light dark:border-bg-dark rounded-md p-2 text-content-light"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
