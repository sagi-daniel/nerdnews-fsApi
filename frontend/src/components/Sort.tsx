import SelectField from './SelectField';

interface SortProps {
  selectedSort: string;
  setSelectedSort: (sortOrder: string) => void;
}

function Sort({ selectedSort, setSelectedSort }: SortProps) {
  return (
    <div className="flex  md:flex-col  rounded-md">
      <SelectField
        options={[
          { name: 'Újak elől', value: 'desc' },
          { name: 'Régiek elől', value: 'asc' },
        ]}
        id="sortOrder"
        label="Rendezés:"
        value={selectedSort}
        setValue={setSelectedSort}
      />
    </div>
  );
}

export default Sort;
