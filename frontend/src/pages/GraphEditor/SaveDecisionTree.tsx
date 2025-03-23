import React, { useContext } from "react";
import { graph } from "./Graph";
import axios from "axios";


export const SaveDecisionTree = () => {
    const { nodes, edges } = useContext(graph);
  
    const handleSave = async () => {
      try {
        const response = await axios.post("https://api.example.com/save-decision-tree", {
          nodes,
          edges,
        });
        console.log("Data saved successfully:", response.data);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };
  
    return (
        <button
            onClick={handleSave}
            className="
                bg-green-700 text-white rounded-md fixed top-1.5 left-1.5 px-2.5 py-1 z-50
                hover:bg-green-900 transition-colors duration-200 ease-in-out
            "
        >
            Save Tree
        </button>
    );
  };;