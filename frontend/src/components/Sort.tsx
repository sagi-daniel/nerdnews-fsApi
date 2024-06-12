import { useNavigate, useLocation } from 'react-router-dom';
import SelectField from './SelectField';

interface SortProps {
  selectedSort: string;
  setSelectedSort: (sortOrder: string) => void;
}

function Sort({ selectedSort, setSelectedSort }: SortProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSortOrderChange = (sortOrder: string) => {
    const params = new URLSearchParams(location.search);
    if (sortOrder) {
      params.set('sortOrder', sortOrder);
    } else {
      params.delete('sortOrder');
    }

    const newUrl = `${location.pathname}?${params.toString()}`.replace(/%2C/g, ',');
    navigate(newUrl, { replace: true });
  };

  return (
    <div className="flex  md:flex-col  rounded-md">
      <SelectField
        options={[
          { name: 'Újak elől', value: 'desc' },
          { name: 'Régiek elől', value: 'asc' },
        ]}
        id="sortOrder"
        label="Sorrend:"
        value={selectedSort}
        setValue={setSelectedSort}
        handleSortOrderChange={handleSortOrderChange}
      />
    </div>
  );
}

export default Sort;
