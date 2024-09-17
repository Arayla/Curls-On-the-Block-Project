import React, { useState, useEffect } from "react";
import axios from "axios";

// Function to fetch all styles from the server
async function callServer(
  setStyles: React.Dispatch<
    React.SetStateAction<Array<{ style_id: number; style_name: string }>>
  >
): Promise<void> {
  try {
    // Fetching data from the server
    const response = await axios.get("http://localhost:8000/test", {
      params: {
        table: "styles",
      },
    });

    // Updating the state with the fetched data
    setStyles(response.data);
  } catch (error) {
    console.error("Error calling server:", error);
  }
}

// Function to delete a style by `style_id`
async function deleteStyle(
  style_id: number,
  setStyles: React.Dispatch<
    React.SetStateAction<Array<{ style_id: number; style_name: string }>>
  >
): Promise<void> {
  try {
    console.log(`Attempting to delete style with ID: ${style_id}`); // Debugging log

    // Sending delete request to the server
    const response = await axios.delete(
      `http://localhost:8000/test/${style_id}`
    );
    console.log(`Delete response: ${response.data}`);

    // Fetching updated data from the server after deletion
    callServer(setStyles); // Refresh the table after deletion
  } catch (error) {
    console.error("Error deleting style:", error);
  }
}

// Function to insert a new style
async function insertStyle(
  newStyle: string,
  setStyles: React.Dispatch<
    React.SetStateAction<Array<{ style_id: number; style_name: string }>>
  >
): Promise<void> {
  try {
    // Inserting new style into the server
    const response = await axios.post("http://localhost:8000/test", {
      table: "styles",
      data: { style_name: newStyle },
    });

    console.log(`Insert response: ${response.data}`);

    // Fetch the updated styles after insertion
    callServer(setStyles); // Refresh the table after insertion
  } catch (error) {
    console.error("Error inserting style:", error);
  }
}

export function TableExample(): JSX.Element {
  const [styles, setStyles] = useState<
    Array<{ style_id: number; style_name: string }>
  >([]);
  const [newStyle, setNewStyle] = useState<string>("");

  // useEffect hook to call the server when the component mounts
  useEffect(() => {
    callServer(setStyles);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle form submission for adding new style
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page refresh
    await insertStyle(newStyle, setStyles); // Insert new style and refresh table
    setNewStyle(""); // Clear input after submission
  };

  return (
    <div>
      <h2>Styles Table</h2>

      {/* Form to insert new style */}
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

      {/* Conditionally render the table only if data exists */}
      {styles.length > 0 ? (
        <table border={1} cellPadding="10">
          <thead>
            <tr>
              <th>Style Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over the styles data and create table rows */}
            {styles.map((style) => (
              <tr key={style.style_id}>
                <td>{style.style_name}</td>
                <td>
                  <button
                    onClick={() => {
                      console.log(
                        `Delete button clicked for style ID: ${style.style_id}`
                      );
                      deleteStyle(style.style_id, setStyles); // Delete style and refresh table
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading styles...</p> // Show a loading message while data is being fetched
      )}
    </div>
  );
}

export default TableExample;
