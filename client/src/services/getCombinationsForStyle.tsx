import { api, COMBOS_ENDPOINT } from "../types";

//
// Get styles and categories to populate dropdowns. Should be set on component mount
//
export async function getCombinationsForStyle(
  styleForQuery: string,
  setCombos: React.Dispatch<React.SetStateAction<Array<string>>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
  // Combos
  try {
    // Fetching data from the server
    const response = await api.get(COMBOS_ENDPOINT, {
      params: {
        style_name: styleForQuery,
      },
    });

    // Updating the state with the fetched data
    let stringArr: Array<string> = response.data.map(
      (item: { category_combination: string }) => item.category_combination
    );

    stringArr.unshift("Choose a combo...");
    setCombos(stringArr);
  } catch (error) {
    console.error("Error calling server for combos:", error);
  } finally {
    // Set loading to false if react hook is passed for it
    if (setLoading) setLoading(false);
  }
}

export {};
