import SelectField from './SelectField';

interface SortProps {
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
}

function Sort({ sortOrder, setSortOrder }: SortProps) {
  return (
    <div className="flex  md:flex-col  rounded-md">
      <SelectField
        options={[
          { name: 'Újak elől', value: 'desc' },
          { name: 'Régiek elől', value: 'asc' },
        ]}
        id="sortOrder"
        label="Rendezés:"
        value={sortOrder}
        setValue={setSortOrder}
      />
    </div>
  );
}

export default Sort;
