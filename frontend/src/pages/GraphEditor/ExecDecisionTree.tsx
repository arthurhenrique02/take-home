import axios from "axios";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ExecDecisionTree = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleExec = async () => {
    const data = localStorage.getItem("fields");

    if (!data) {
        toast.error("No data found!");
        return;
    }

    await axios.post(
        "http://localhost:8000/decision_tree/execute/", JSON.parse(data)
    ).then((response) => {
        toast.success("Tree executed successfully!");
        setModalContent(`Decision: ${response.data.decision}`);
        setIsModalOpen(true);
    }).catch((error) => {
        const errorMessage = error.response?.data?.error || "Failed to execute tree.";
        toast.error(`${errorMessage}`);
    });
  }

  return (
    <>
      <button
        onClick={handleExec}
        className="
        bg-blue-600 text-white rounded-md px-2.5 py-1
        hover:bg-blue-900 transition-colors duration-200 ease-in-out
        "
      >
        Execute
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
      />
    </>
  );
};