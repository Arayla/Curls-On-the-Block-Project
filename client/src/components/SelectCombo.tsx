import React, { useEffect, useState } from "react";
import axios from "axios";

interface StyleCategorySelectorProps {
    styleVal: string; // The currently selected style value
    onCategoryChange: (categories: string[]) => void; // Callback function to update selected categories
}

const StyleCategorySelector: React.FC<StyleCategorySelectorProps> = ({ styleVal, onCategoryChange }) => {
    const [categories, setCategories] = useState<string[]>([]); // State to store categories
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    useEffect(() => {
        const fetchCombinations = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/combinations?style_name=${styleVal}`);
                setCategories(response.data.map((item: { category_combination: string }) => item.category_combination)); // Adjust based on the actual response structure
            } catch (err) {
                setError("Error fetching combinations");
            } finally {
                setLoading(false);
            }
        };

        if (styleVal) {
            fetchCombinations();
        }
    }, [styleVal]); // Fetch combinations whenever styleVal changes

    if (loading) {
        return <div>Loading combinations...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    const handleSelectionChange = (selectedOptions: string[]) => {
        onCategoryChange(selectedOptions); // Call the passed function with the selected options
    };

    return (
        <div>
            <label htmlFor="style-category">Select Style Category:</label>
            <select
                id="style-category"
                onChange={(e) => handleSelectionChange([e.target.value])} // Convert selected value to array
                multiple // Allow multiple selection
            >
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StyleCategorySelector;
