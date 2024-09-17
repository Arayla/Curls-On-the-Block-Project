import React, { useState } from "react";
import axios from "axios";

async function insertData(
  setStyles: React.Dispatch<
    React.SetStateAction<Array<{ style_name: string }>>
  >,
  newStyle: string
): Promise<void> {
  try {
    console.log("Sending data to server:", { style_name: newStyle }); // Log the data being sent

    // Inserting data into the server
    const response = await axios.post("http://localhost:8000/test", {
      table: "styles",
      data: { style_name: newStyle },
    });

    // Check the server response to confirm successful insertion
    if (response.data.affectedRows > 0) {
      // Append the new style to the existing styles state
      setStyles((prevStyles) => [...prevStyles, { style_name: newStyle }]);
    } else {
      console.error("Failed to insert new style:", response.data);
    }
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

const SampleInsert: React.FC = () => {
  const [styles, setStyles] = useState<Array<{ style_name: string }>>([]);
  const [newStyle, setNewStyle] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted with new style:", newStyle); // Log the form submission data
    await insertData(setStyles, newStyle);
    setNewStyle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          New Style:
          <input
            type="text"
            value={newStyle}
            onChange={(e) => setNewStyle(e.target.value)}
          />
        </label>
        <button type="submit">Insert</button>
      </form>
      <ul>
        {styles.map((style, index) => (
          <li key={index}>{style.style_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SampleInsert;
