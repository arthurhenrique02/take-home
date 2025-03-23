import { RectangleSvg } from "assets/Rectangle";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";
import { DrawerName, editor } from "../Editor";
import { useContext } from "react";

export type DecisionNodeData = {
  label: string;
  width: number;
  height: number;
};

export function DecisionNode({ id, data }: NodeProps<DecisionNodeData>) {
  const { showDrawer } = useContext(editor);
  return (
    <NodeWrapper>
      <div
        className="w-full h-full group"
        style={{
          width: data.width,
          height: data.height,
        }}
      >
        <div className="p-9 flex items-center justify-center text-[12px] text-center w-full h-full relative">
          <div
            className={`group-hover-focus:cursor-pointer absolute left-0 top-0 w-full h-full text-Y-300 [&>svg]:stroke-Y-600 group-hover:text-Y-350 z-0`}
            onClick={() => showDrawer(DrawerName.insertConditionalData, { id: id, data: data })}
          >
            <RectangleSvg strokeWidth={4} />
          </div>
          <Handle
            type="target"
            id="target"
            className="invisible"
            position={Position.Top}
            isConnectable={false}
          />
          <p className={`cursor-pointer line-clamp-3 z-10`}>{data.label}</p>
          <Handle
            type="source"
            id="source"
            className="invisible"
            position={Position.Bottom}
            isConnectable={false}
          />
        </div>
      </div>
    </NodeWrapper>
  );
}
