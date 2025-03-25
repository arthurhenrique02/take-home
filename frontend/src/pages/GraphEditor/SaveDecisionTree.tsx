import { useContext } from "react";
import { graph, TreeNode } from "./Graph";
import axios from "axios";
import { Edge, Node } from "reactflow";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const buildTreeJson = (nodes: Node[], edges: Edge[]): TreeNode | null => {
    const nodeMap = new Map<string, Node>(nodes.map(node => [node.id, node]));

    // Adjacency list to store the edges in the graph
    const adjacencyList: Record<string, { False?: string; True?: string }> = {};
      edges.forEach(({ source, target, label }) => {
        if (!adjacencyList[source]) adjacencyList[source] = {};
        if (label === "False" || label === "True") {
            adjacencyList[source][label as "False" | "True"] = target;
        }
    });
  
    const dfs = (nodeId: string | undefined): TreeNode | null => {
      if (!nodeId || !nodeMap.has(nodeId)) return null;
      const node = nodeMap.get(nodeId)!;
      const children = adjacencyList[nodeId] || {};

      return {
        label: (node.data as { label?: string })?.label ?? "",
        type: (node.type)? node.type : "",
        right: children.False ? dfs(children.False) : null,
        left: children.True ? dfs(children.True) : null,
      };
    };
  
    // find start node (node after 'start' node)
    const startNode = edges.find(edge => edge.source === "start")?.target;

    return dfs(startNode);
  };
export const SaveDecisionTree = () => {
  const { nodes, edges } = useContext(graph);

  const handleSave = async () => {
    const treeJson = buildTreeJson(nodes, edges);
    try {
      await axios.post("http://localhost:80/decision_tree/create_or_update/", treeJson);
      toast.success("Tree saved successfully!");
    } catch (error) {
      toast.error(`Failed to save tree. ${error}`);
    }
  };

  return (
    <button
      onClick={handleSave}
      className="
        bg-green-700 text-white rounded-md px-2.5 py-1
        hover:bg-green-900 transition-colors duration-200 ease-in-out
      "
    >
      Save Tree
    </button>
  );
};