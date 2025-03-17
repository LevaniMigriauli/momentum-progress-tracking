
export const hasSelectedOptions = (selectedOptions) => (Object.entries(selectedOptions).
  some(([_, values]) => values.length > 0))