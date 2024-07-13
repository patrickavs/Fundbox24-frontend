import Dropdown from '../../components/Dropdown.tsx';
import React from 'react';
import { categoriesWithImage } from '../../data/categoriesWithImage.ts';
import { Category } from '../../types/category.ts';

type Props = {
  placeholder?: string;
  onChange?: (category: Category) => void;
}

export default function CategoryDropdown(props: Props) {
  const dropdownItems = categoriesWithImage.map(categoryWithImage => {
    return {
      label: categoryWithImage.name,
      value: categoryWithImage.id.toString(),
    };
  });

  return (
    <Dropdown
      items={dropdownItems}
      placeholder={props.placeholder}
      onChange={item => {
        if (!props.onChange) {
          return;
        }

        const foundCategoryWithImage = categoriesWithImage.find(
          categoryWithImage =>
            categoryWithImage.id.toString() === item.value
        );

        if (!foundCategoryWithImage) {
          console.log("Can't find category with id", item.value);
          return;
        }

        props.onChange(foundCategoryWithImage);
      }}
      testID={'dropdown'}
    />
  );
}
