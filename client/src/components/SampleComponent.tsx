import React, { useState, useEffect } from "react";
import axios from "axios";

// Try to keep API calls segregated to the services/ directory. Also, keep API URLs under types/api.ts for consistency and organization
async function callServer(
  setStyles: React.Dispatch<React.SetStateAction<Array<{ style_name: string }>>>
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

/* 
If you want to pass properties to a functional child make an interface:

interface ComponentProperties {
  key: number;
  innerText: string;
}; 

Then accept that interface as an object to your functional component:

export const myComponent: React.FC<ComponentProperties> = ({
  key: number,
  innerText: string
}) => {
 // Function code
 ...
} 
 */

export function SampleComponent(): JSX.Element {
  // Declare a state variable to store the styles data
  const [styles, setStyles] = useState<Array<{ style_name: string }>>([]);

  // useEffect hook to call the server when the component mounts
  useEffect(() => {
    callServer(setStyles);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h2>Styles Table</h2>
      {/* Conditionally render the table only if data exists */}
      {styles.length > 0 ? (
        <table border={1} cellPadding="10">
          <thead>
            <tr>
              <th>Style Name</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over the styles data and create table rows */}
            {styles.map((style, index) => (
              <tr key={index}>
                <td>{style.style_name}</td>
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

export default SampleComponent;
