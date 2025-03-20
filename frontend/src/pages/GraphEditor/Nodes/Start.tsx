import { useContext } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";
import { DrawerName, editor } from "../Editor";

type StartNodeData = {
  width: number;
  height: number;
};

export function StartNode({ data }: NodeProps<StartNodeData>) {
  const { showDrawer } = useContext(editor);
  return (
    <NodeWrapper>
      <div
        className={`rounded-full aspect-square flex items-center justify-center border-4 border-N-400 bg-white text-[12px] h-full cursor-pointer`}
        style={{
          width: data.width,
          height: data.height,
        }}
        onClick={() => showDrawer(DrawerName.insertStartData, { id: "source" })}
      >
        <p className="font-medium">{"Start"}</p>
        <Handle
          type="source"
          id="source"
          className="invisible"
          position={Position.Bottom}
          isConnectable={false}
        />
      </div>
    </NodeWrapper>
  );
}
