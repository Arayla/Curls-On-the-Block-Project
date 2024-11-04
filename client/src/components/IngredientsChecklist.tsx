import React from "react";

interface IngredientsChecklistProps {
  label: string;
  ingredients: string[];
  selectedIngredients: string[];
  onChange: (selected: string[]) => void;
}

export const IngredientsChecklist: React.FC<IngredientsChecklistProps> = ({
  label,
  ingredients,
  selectedIngredients,
  onChange,
}) => {
  // Handler for checkbox changes
  const handleCheckboxChange = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      // Remove the ingredient if it's already selected
      onChange(selectedIngredients.filter((item) => item !== ingredient));
    } else {
      // Add the ingredient if it's not selected
      onChange([...selectedIngredients, ingredient]);
    }
  };

  return (
    <fieldset className="ingredients-checklist">
      <legend>{label}</legend>
      {ingredients.map((ingredient, index) => (
        <div key={ingredient}>
          <input
            type="checkbox"
            id={`ingredient-${index}`}
            name="ingredients"
            value={ingredient}
            checked={selectedIngredients.includes(ingredient)}
            onChange={() => handleCheckboxChange(ingredient)}
          />
          <label htmlFor={`ingredient-${index}`}>{ingredient}</label>
        </div>
      ))}
    </fieldset>
  );
};

export default IngredientsChecklist;
