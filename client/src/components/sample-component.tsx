import React, { useEffect, useState } from "react";
import axios from "axios";

interface Data {
  id: number;
  name: string;
}

export function SampleComponent(): JSX.Element {
  let [loading, setLoading] = useState(true);

  let [data, setData] = useState<Data[]>([]);

  async function callServer(): Promise<void> {
    try {
      const response = await axios.get("http://localhost:8000/test", {
        params: {
          table: "sample",
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error calling server:", error);
    }
  }

  useEffect(() => {
    callServer();
  }, []);

  if (loading) return <div>Loading...</div>;

  let names: string = "";
  for (let i = 0; i < data.length; i++) {
    names += "{id: " + data[i].id + ", name: " + data[i].name + "}\n";
  }

  return (
    <>
      <div>This is a sample component</div>
      <div>{names}</div>
    </>
  );
}

export default SampleComponent;
