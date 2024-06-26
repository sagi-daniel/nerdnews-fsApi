import SelectField from './SelectField';

interface SortProps {
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
}

function Sort({ sortOrder, setSortOrder }: SortProps) {
  return (
    <div className="flex  md:flex-col  rounded-md">
      <div className="w-full md:w-full md:mb-3 ">
        <SelectField
          options={[
            { name: 'Újak elől', value: 'desc' },
            { name: 'Régiek elől', value: 'asc' },
          ]}
          id="sortOrder"
          label="Rendezés:"
          value={sortOrder}
          setValue={setSortOrder}
          required={false}
        />
      </div>
    </div>
  );
}

export default Sort;
