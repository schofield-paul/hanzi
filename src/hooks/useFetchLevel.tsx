import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FetchDataHookProps {
  selectedLevel: number | null;
  selectedSection: string | null;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
}

const useFetchData = ({
  selectedLevel,
  selectedSection,
  setSelectedItems,
}: FetchDataHookProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log("selectedLevel", selectedLevel);
  console.log("selectedSection", selectedSection);
  const fetchData = async () => {
    try {
      setIsLoading(true);

      //const response = await fetch("http://localhost:3001/api/hanzi");

      const response = await fetch(
        `https://hanzi-app.onrender.com/hanzi?hsk_level=${encodeURIComponent(
          selectedLevel || 1
        )}&hsk_section=${encodeURIComponent(selectedSection || 1)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      setSelectedItems((prevItems: any) => ({ ...prevItems, data: result }));
      navigate("/app", { state: { data: result } });
      console.log("result", result);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading };
};

export default useFetchData;
