import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CategoryModel, { CreateCategoryModel, UpdateCategoryModel } from '../../models/Category.model';
import { createCategory, updateCategory } from '../../services/apiCategory';
import Button from '../Button';
import toast from 'react-hot-toast';
import InputField from '../form-ui/InputField';

interface CategoryFormProps {
  category?: CategoryModel | null;
  setModalVisible: (value: boolean) => void;
}

function CategoryForm({ category, setModalVisible }: CategoryFormProps) {
  const [categoryName, setCategoryName] = useState(category?.categoryName || '');

  const queryClient = useQueryClient();

  const { mutate: updateCategoryMutate } = useMutation(updateCategory, {
    onSuccess: () => {
      toast.success(`Kategória frissítve!`);
      queryClient.invalidateQueries(['categories']);
    },
  });

  const { mutate: createCategoryMutate } = useMutation(createCategory, {
    onSuccess: () => {
      toast.success(`Kategória létrehozva!`);
      queryClient.invalidateQueries(['categories']);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (category && category._id) {
      const updateCategory: UpdateCategoryModel = {
        categoryId: category._id,
        category: categoryName,
      };

      updateCategoryMutate(updateCategory);
      setModalVisible(false);
    } else {
      const newCategory: CreateCategoryModel = {
        categoryName,
      };

      createCategoryMutate(newCategory);
      setModalVisible(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <InputField
          type="text"
          id="categoryName"
          name="categoryName"
          label="Kategória neve"
          value={categoryName}
          setValue={setCategoryName}
          required={true}
        />
      </div>
      <Button type="submit" text={category ? 'Mentés' : 'Létrehozás'} size="full" />
    </form>
  );
}

export default CategoryForm;
