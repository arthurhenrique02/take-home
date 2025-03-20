import { Drawer } from "components/Drawer";
import { editor } from "@src/pages/GraphEditor/Editor";
import { useContext, useState,  } from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


type Field = {
  name: string;
  value: string;
};

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
    toast.error("Fields saved successfully!");

    console.log(toast)
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
