import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const ExecDecisionTree = () => {
  const handleExec = async () => {
    const data = localStorage.getItem("fields");

    if (!data) {
        toast.error("No data found!");
        return;
    }

    await axios.post(
        "http://localhost:80/decision_tree/execute/", JSON.parse(data)
    ).then((response) => {
        console.log(response.data)
        localStorage.setItem("fields", JSON.stringify(response.data));
        toast.success("Tree executed successfully!");
    }).catch((error) => {
        console.log(error);
        const errorMessage = error.response?.data?.error || "Failed to execute tree.";
        toast.error(`${errorMessage}`);
    });

  }

  return (
    <button
      onClick={handleExec}
      className="
        bg-blue-600 text-white rounded-md px-2.5 py-1
        hover:bg-blue-900 transition-colors duration-200 ease-in-out
      "
    >
      Execute
    </button>
  );
};