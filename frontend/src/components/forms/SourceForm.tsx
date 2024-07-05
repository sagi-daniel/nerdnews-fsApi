import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createSource, updateSource } from '../../services/apiSource';
import CategoryModel from '../../models/Category.model';
import SourceModel from '../../models/Source.model';
import InputField from '../form-ui/InputField';
import Button from '../Button';
import toast from 'react-hot-toast';
import SelectField from '../form-ui/SelectField';
import { getCategories } from '../../services/apiCategory';
import { capitalizeWord } from '../../utils/helpers';

interface KeyValueOption {
  name: string;
  value: string;
}

interface SourceFormProps {
  source?: SourceModel | null;
  setModalVisible: (value: boolean) => void;
}

function SourceForm({ source, setModalVisible }: SourceFormProps) {
  const [sourceName, setSourceName] = useState(source?.sourceName || '');
  const [sourceType, setSourceType] = useState(source?.sourceType || '');
  const [sourceLink, setSourceLink] = useState(source?.sourceLink || '');
  const [category, setCategory] = useState(source?.category._id || '');
  const [comment, setComment] = useState(source?.comment || '');

  const { data: categories } = useQuery(['categoriesOptions'], getCategories);

  const categoryNames = categories?.map((category: CategoryModel) => {
    return { name: capitalizeWord(category.categoryName), value: category._id };
  }) as KeyValueOption[];

  const queryClient = useQueryClient();

  const { mutate: updateSourceMutate } = useMutation(updateSource, {
    onSuccess: () => {
      toast.success(`Forrás frissítve!`);
      queryClient.invalidateQueries(['sources']);
    },
  });

  const { mutate: createSourceMutate } = useMutation(createSource, {
    onSuccess: () => {
      toast.success(`Forrás létrehozva!`);
      queryClient.invalidateQueries(['sources']);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const saveSource = {
      sourceName,
      sourceType,
      sourceLink,
      category: category,
      comment,
    };

    if (source && source._id) {
      const updatedSource = { ...source, ...saveSource };
      const sourceId = source._id;
      updateSourceMutate({ source: updatedSource, sourceId });
      setModalVisible(false);
    } else {
      createSourceMutate(saveSource);
      setModalVisible(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          type="text"
          id="sourceName"
          label="Forrás neve"
          value={sourceName}
          setValue={setSourceName}
          required={true}
        />
        <SelectField
          options={[
            { name: 'RSS', value: 'RSS' },
            { name: 'RDF', value: 'RDF' },
          ]}
          id="sourceType"
          label="Forrás típusa"
          value={sourceType}
          setValue={setSourceType}
          required={true}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          type="text"
          id="sourceLink"
          label="Forrás linkje"
          value={sourceLink}
          setValue={setSourceLink}
          required={true}
        />
        <SelectField
          id="category"
          label="Kategória"
          options={categoryNames}
          value={category}
          setValue={setCategory}
          required={true}
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Megjegyzés</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-md p-2 text-content-light font-semibold focus:outline-none focus:ring focus:ring-primary"
        />
      </div>
      <Button type="submit" text={source ? 'Mentés' : 'Létrehozás'} size="full" />
    </form>
  );
}

export default SourceForm;
