import React, { useEffect } from "react";
import axios from "axios";

async function callServer(): Promise<void> {
  try {
    const response = await axios.get("http://localhost:8000/test", {
      params: {
        table: "styles",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error calling server:", error);
  }
}

export function SampleComponent(): JSX.Element {
  useEffect(() => {
    callServer();
  }, []);

  return <div>This is a sample component</div>;
}

export default SampleComponent;
