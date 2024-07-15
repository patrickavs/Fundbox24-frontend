import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { expect, it, describe, jest, beforeEach } from '@jest/globals';
import CategoryDropdown from '../src/pages/add/CategoryDropdown.tsx';
import { Category } from '../src/types/category.ts';

const mockCategoriesWithImage: Category[] = [
  { id: 1, value: '1', name: 'Category 1', image: 'image1' },
  { id: 2, value: '0', name: 'Category 2', image: 'image2' },
  { id: 3, value: '2', name: 'Category 3', image: 'image3' },
];

jest.mock('../src/data/categoriesWithImage.ts', () => ({
  categoriesWithImage: [
    { id: 1, value: '1', name: 'Category 1', image: 'image1' },
    { id: 2, value: '0', name: 'Category 2', image: 'image2' },
    { id: 3, value: '2', name: 'Category 3', image: 'image3' },
  ],
}));

describe('CategoryDropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log an error if the selected item does not match any category', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {
    });
    const invalidItem = { label: 'Invalid Category', value: '123' };
    render(<CategoryDropdown onChange={jest.fn()} />);

    const dropdown = screen.getByTestId('dropdown');
    fireEvent(dropdown, 'onChange', invalidItem);

    expect(consoleLogSpy).toHaveBeenCalledWith("Can't find category with id", invalidItem.value);
    consoleLogSpy.mockRestore();
  });
});
