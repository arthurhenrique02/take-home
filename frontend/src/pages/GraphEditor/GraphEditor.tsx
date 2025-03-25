import "reactflow/dist/style.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReactFlow, { Background } from "reactflow";
import { AddNodeEdge } from "./AddNodeEdge";
import { CurrentDrawer } from "./Drawers";
import { EditorProvider } from "./Editor";
import { GraphProvider, graph } from "./Graph";
import { allNodes } from "./Nodes";
import { generateEdge, generateNode } from "./nodeGeneration";
import { positionNodes } from "./positionNodes";
import { SaveDecisionTree } from "./SaveDecisionTree";
import axios from "axios";
import { loadTree } from "./Graph";

const edgeTypes = {
  "add-node": AddNodeEdge,
};

function ReactFlowSandbox() {
  const {
    nodes,
    edges,
    reactFlowInstance,
    setReactFlowInstance,
    fitZoomToGraph,
    setNodes,
    setEdges,
  } = useContext(graph);

  const [centeredGraphAtStart, setCenteredGraphAtStart] = useState(false);
  const reactFlowRef = useRef<HTMLDivElement>(null);

  const tryCenteringGraph = useCallback(() => {
    if (centeredGraphAtStart) {
      return;
    }

    fitZoomToGraph(reactFlowRef);

    const viewport = reactFlowInstance?.getViewport();
    if (viewport && viewport.x !== 0 && viewport.y !== 0) {
      return setCenteredGraphAtStart(true);
    }

    const retryTimeInMs = 50;
    setTimeout(() => tryCenteringGraph(), retryTimeInMs);
  }, [centeredGraphAtStart, fitZoomToGraph, reactFlowInstance]);

  useEffect(() => {
    tryCenteringGraph();
  }, [tryCenteringGraph]);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get("http://localhost:80/decision_tree/retrieve");
        const treeJson = response.data;
        const { nodes: loadedNodes, edges: loadedEdges } = loadTree(treeJson);
        loadedNodes.unshift(generateNode({ nodeName: "start", id: "start" }));
        loadedEdges.unshift(generateEdge({ source: "start", target: loadedNodes[1].id }))

        const [positionedNodes, positionedEdges] = positionNodes(loadedNodes, loadedEdges);
        setNodes(positionedNodes);
        setEdges(positionedEdges);
      } catch (error) {
        // load default tree if failed to fetch
        const initialNodes = [
          generateNode({ nodeName: "start", id: "start" }),
          generateNode({ nodeName: "end" }),
        ];
        const initialEdges = [
          generateEdge({
            source: "start",
            target: initialNodes[1].id,
          }),
        ];
        const [positionedNodes, positionedEdges] = positionNodes(
          initialNodes,
          initialEdges
        );
        setNodes(positionedNodes);
        setEdges(positionedEdges);
    
      }
    };
    fetchTree();
  }, []);

  return (
    <div className="h-full flex flex-col overflow-hidden w-full relative">
      <ReactFlow
        ref={reactFlowRef}
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={allNodes}
        onInit={setReactFlowInstance}
        nodesDraggable={false}
        deleteKeyCode={null}
      >
        <Background className="bg-N-75" size={2} color="#C1C4D6" />
      </ReactFlow>
      <CurrentDrawer />
    </div>
  );
}

export function GraphEditor() {
  return (
    <EditorProvider>
      <GraphProvider>
        <SaveDecisionTree />
        <ReactFlowSandbox />
      </GraphProvider>
    </EditorProvider>
  );
}
