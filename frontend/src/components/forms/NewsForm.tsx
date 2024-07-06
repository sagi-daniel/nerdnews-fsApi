import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNews, updateNews } from '../../services/apiNews';
import { capitalizeWord, formatDateIsoToNormal } from '../../utils/helpers';
import { getCategories } from '../../services/apiCategory';
import { getSources } from '../../services/apiSource';
import SourceModel from '../../models/Source.model';
import NewsModel from '../../models/News.model';
import CategoryModel from '../../models/Category.model';
import InputField from '../form-ui/InputField';
import Button from '../Button';
import toast from 'react-hot-toast';
import SelectField from '../form-ui/SelectField';
import TextAreaField from '../form-ui/TextAreaField';

interface KeyValueOption {
  name: string;
  value: string;
}

interface NewsFormProps {
  news?: NewsModel | null;
  setModalVisible: (value: boolean) => void;
}

function NewsForm({ news, setModalVisible }: NewsFormProps) {
  const [release, setRelease] = useState(formatDateIsoToNormal(news?.release) || '');
  const [source, setSource] = useState(news?.source._id || '');
  const [category, setCategory] = useState(news?.category._id || '');
  const [title, setTitle] = useState(news?.title || '');
  const [link, setLink] = useState(news?.link || '');
  const [content, setContent] = useState(news?.content || '');
  const [imageUrl, setImageUrl] = useState(news?.imageUrl || '');

  const queryClient = useQueryClient();

  const { data: categories } = useQuery(['categoriesOptions'], getCategories);
  const categoryNames = categories?.map((category: CategoryModel) => {
    return { name: capitalizeWord(category.categoryName), value: category._id };
  }) as KeyValueOption[];

  const { data: sources } = useQuery(['sourcesOptions'], getSources);
  const sourceNames = sources?.map((source: SourceModel) => {
    return { name: capitalizeWord(source.sourceName), value: source._id };
  }) as KeyValueOption[];

  const { mutate: updateNewsMutate } = useMutation(updateNews, {
    onSuccess: () => {
      toast.success(`Hír frissítve!`);
      queryClient.invalidateQueries(['news']);
    },
  });

  const { mutate: createNewsMutate } = useMutation(createNews, {
    onSuccess: () => {
      toast.success(`Hír létrehozva!`);
      queryClient.invalidateQueries(['news']);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const saveNews = {
      release,
      source,
      category,
      title,
      link,
      content,
      imageUrl,
    };

    if (news && news._id) {
      const updateNews = { ...news, ...saveNews };
      const newsId = news._id;
      updateNewsMutate({ news: updateNews, newsId });
      setModalVisible(false);
    } else {
      createNewsMutate(saveNews);
      setModalVisible(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-4">
        <InputField
          type="date"
          id="release"
          name="release"
          label="Publikálás"
          value={release}
          setValue={setRelease}
          required={true}
        />
        <SelectField
          id="source"
          name="source"
          label="Forrás"
          options={sourceNames}
          value={source}
          setValue={setSource}
          required={true}
        />
        <SelectField
          id="category"
          name="category"
          label="Kategória"
          options={categoryNames}
          value={category}
          setValue={setCategory}
          required={true}
        />
      </div>
      <TextAreaField id="title" name="title" label="Cím" value={title} setValue={setTitle} required={true} row={3} />
      <InputField type="text" id="link" name="link" label="Link" value={link} setValue={setLink} required={true} />
      <InputField
        type="text"
        id="imageUrl"
        name="imageUrl"
        label="Kép"
        value={imageUrl}
        setValue={setImageUrl}
        required={true}
      />
      <TextAreaField
        label="Tartalom"
        id="content"
        name="content"
        value={content}
        setValue={setContent}
        isValid={content.length > 0}
        row={5}
        errorMessage="A tartalom megadása kötelező"
        successMessage="Description is valid"
        required={true}
      />
      <Button type="submit" text={news ? 'Mentés' : 'Létrehozás'} size="full" />
    </form>
  );
}

export default NewsForm;
