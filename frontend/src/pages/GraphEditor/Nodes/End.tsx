import { Handle, NodeProps, Position } from "reactflow";

import { NodeWrapper } from "./NodeWrapper";
import { DrawerName, editor } from "../Editor";
import { useContext } from "react";

export type EndNodeData = {
  width: number;
  height: number;
  label: string;
};

export function EndNode({ id, data }: NodeProps<EndNodeData>) {
  const { showDrawer } = useContext(editor);
  return (
    <NodeWrapper>
      <div
        className={`rounded-full aspect-square flex items-center justify-center border-4 border-N-400 h-full bg-white text-[12px] cursor-pointer`}
        style={{
          width: data.width,
          height: data.height,
        }}
        onClick={() => showDrawer(DrawerName.insertDecisionData, { id: id, data: data })}
      >
        <Handle
          type="target"
          id="target"
          className="invisible"
          position={Position.Top}
          isConnectable={false}
        />
        <p className="font-medium">{(data.label) ? data.label : "End"}</p>
      </div>
    </NodeWrapper>
  );
}
