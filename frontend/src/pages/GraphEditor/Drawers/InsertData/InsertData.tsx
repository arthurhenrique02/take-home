import { Drawer } from "components/Drawer";
import { editor } from "@src/pages/GraphEditor/Editor";
import { useContext, useEffect, useState,  } from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { NodeProps } from "reactflow";
import { ConditionalNodeData } from "../../Nodes/Conditional";
import { graph } from "../../Graph";
import { EndNodeData } from "../../Nodes/End";


type Field = {
  name: string;
  value: string;
};

type ConditionalField = {
  first_value: string;
  second_value: string;
  condition: ">" | "<" | "=" | ">=" | "<=";
}

type DecisionField = {
  decision: string;
}

export const insertStartData = () => {
  const { drawerVisible, closeEditorDrawer } = useContext(editor);
  const [fields, setFields] = useState<Field[]>(() => {
    const savedFields = localStorage.getItem("fields");
    return savedFields ? JSON.parse(savedFields) : [{ name: "", value: "" }];
  });

  const handleAddField = () => {
    setFields([...fields, { name: "", value: "" }]);
  };

  const handleMinusField = () => {
    if (fields.length > 1) {
      setFields(fields.slice(0, fields.length - 1));
    }
  };

  const handleFieldChange = (index: number, key: keyof Field, value: string) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const handleSave = () => {
    localStorage.setItem("fields", JSON.stringify(fields.filter((field) => field.name && field.value)));
    toast.success("Fields saved successfully!");
  };

  return (
    <>
        <Drawer
        title="Insert data"
        content={
            <div className="p-4">
            {fields.map((field, index) => (
                <div key={index} className="grid gap-6 mb-6 md:grid-cols-2">
                <input
                    type="text"
                    placeholder="Field Name"
                    value={field.name}
                    onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                    className="bg-stone-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <input
                    type="text"
                    placeholder="Field Value"
                    value={field.value}
                    onChange={(e) => handleFieldChange(index, "value", e.target.value)}
                    className="bg-stone-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                </div>
            ))}
            <div className="flex justify-between">
                <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Save
                </button>
                <div>
                    <button onClick={handleAddField} className="btn btn-primary mb-4">
                        <PlusCircleIcon className="w-8 text-teal-500 group-hover-focus:text-teal-300 transition-colors bg-white group-hover-focus:bg-slate-900 duration-300" />
                    </button>
                    <button onClick={handleMinusField} className="btn btn-primary mb-4">
                        <MinusCircleIcon className="w-8 text-red-500 group-hover-focus:text-teal-300 transition-colors bg-white group-hover-focus:bg-slate-900 duration-300" />
                    </button>
                </div>
            </div>
            </div>
        }
        onClose={closeEditorDrawer}
        visible={drawerVisible}
        />
    </>
  );
};

export const insertConditionalData = (
  node: NodeProps<ConditionalNodeData>
) => {
  const { drawerVisible, closeEditorDrawer } = useContext(editor);
  const { nodes, setNodes } = useContext(graph);
  const [field, setField] = useState<ConditionalField>({ first_value: "", second_value: "", condition: ">" });

  useEffect(() => {
    const nodeToUpdate = nodes.find((n) => n.id === node.id);
    if (nodeToUpdate) {
      if (!node.data.label) return;

      const [first_value, condition, second_value] = node.data.label.split(" ");
      setField({ first_value, condition: condition as ">" | "<" | "=" | ">=" | "<=", second_value });
    }
  }, [node, nodes]);

  // check fields data, find node from id, and update node label (dont save in local storage)
  const handleFieldChange = (key: keyof ConditionalField, value: string) => {
    setField({ ...field, [key]: value });
  };

  const handleSave = () => {
    const nodeToUpdate = nodes.find((n) => n.id === node.id);

    if (!nodeToUpdate || !field.first_value || !field.second_value) {
      toast.error("Please fill all fields!");
      return
    }

    nodeToUpdate.data.label = `${field.first_value} ${field.condition} ${field.second_value}`;

    setNodes([...nodes]);
    closeEditorDrawer();
  };

  return (
    <>
        <Drawer
        title="Insert data"
        content={
            <div className="p-4">
              <div className="grid gap-6 mb-6 md:grid-cols-3">
                <input
                    type="text"
                    placeholder="1st value"
                    value={field.first_value}
                    onChange={(e) => handleFieldChange("first_value", e.target.value)}
                    className="bg-stone-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <select
                    className="bg-stone-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => handleFieldChange("condition", e.target.value)}
                >
                    <option value=">">{'>'}</option>
                    <option value="<">{'<'}</option>
                    <option value="=">{'='}</option>
                    <option value=">=">{'>='}</option>
                    <option value="<=">{'<='}</option>
                </select>

                <input
                    type="text"
                    placeholder="2nd value"
                    value={field.second_value}
                    onChange={(e) => handleFieldChange("second_value", e.target.value)}
                    className="bg-stone-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            <div className="flex justify-between">
                <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Save
                </button>
            </div>
          </div>
        }
        onClose={closeEditorDrawer}
        visible={drawerVisible}
        />
    </>
  );
};

export const insertDecisionData = (
  node: NodeProps<EndNodeData>
) => {
  const { drawerVisible, closeEditorDrawer } = useContext(editor);
  const { nodes, setNodes } = useContext(graph);
  const [field, setField] = useState<DecisionField>({decision: ""});

  useEffect(() => {
    const nodeToUpdate = nodes.find((n) => n.id === node.id);
    if (nodeToUpdate) {
      setField({ decision: nodeToUpdate.data.label });
    }
  }, [node.id, nodes]);


  // check fields data, find node from id, and update node label (dont save in local storage)
  const handleFieldChange = (key: keyof DecisionField, value: string) => {
    setField({ ...field, [key]: value });
  };

  const handleSave = () => {
    const nodeToUpdate = nodes.find((n) => n.id === node.id);

    if (!nodeToUpdate) {
      toast.error("Node not found!");
      return
    }
    nodeToUpdate.data.label = field.decision;
    setNodes([...nodes]);
    closeEditorDrawer();
  };

  return (
    <>
        <Drawer
        title="Insert data"
        content={
            <div className="p-4">
              <div className="grid gap-6 mb-6">
                <textarea
                    placeholder="Decision"
                    value={field.decision}
                    onChange={(e) => handleFieldChange("decision", e.target.value)}
                    className="bg-stone-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            <div className="flex justify-between">
                <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Save
                </button>
            </div>
          </div>
        }
        onClose={closeEditorDrawer}
        visible={drawerVisible}
        />
    </>
  );
};
