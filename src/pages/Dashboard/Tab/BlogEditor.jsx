import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import ImageTool from "@editorjs/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon } from "@radix-ui/react-icons";

// ---------- Initial Pages ----------
const initialPages = [
  { label: "Know Us" },
  { label: "Philanthropy" },
  { label: "Causes We Support 2024",

   },
  {
    label: "VM Editions",
    children: [
      { label: "12th Edition" },
      { label: "11th Edition" },
      { label: "10th Edition" },
    ],
  },
];

// ---------- Category → API Map ----------
const apiMap = {
  "Know Us": {
    byFile: "/api/knowus/upload",
    byUrl: "/api/knowus/fetch",
  },
  "Philanthropy": {
    byFile: "/api/philanthropy/upload",
    byUrl: "/api/philanthropy/fetch",
  },
  "Causes We Support 2024": {
    byFile: "/api/causes2024/upload",
    byUrl: "/api/causes2024/fetch",
  },
  "12th Edition": {
    byFile: "/api/vm-editions/12/upload",
    byUrl: "/api/vm-editions/12/fetch",
  },
  "11th Edition": {
    byFile: "/api/vm-editions/11/upload",
    byUrl: "/api/vm-editions/11/fetch",
  },
  "10th Edition": {
    byFile: "/api/vm-editions/10/upload",
    byUrl: "/api/vm-editions/10/fetch",
  },
};

// ---------- Dropdown Component ----------
function CategoryDropdown({ options, value, onChange, setOptions }) {
  const [newEdition, setNewEdition] = useState("");

  const addEdition = (parentLabel) => {
    if (!newEdition.trim()) return;
    setOptions((prev) =>
      prev.map((p) =>
        p.label === parentLabel
          ? {
              ...p,
              children: [...(p.children || []), { label: newEdition.trim() }],
            }
          : p
      )
    );
    setNewEdition("");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-left hover:bg-gray-50">
          {value || "Select Page ▾"}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white border border-gray-200 rounded-lg shadow-lg p-1 z-50"
          sideOffset={5}
        >
          {options.map((opt) =>
            opt.children ? (
              <DropdownMenu.Sub key={opt.label}>
                <DropdownMenu.SubTrigger className="px-4 py-2 text-sm flex justify-between items-center rounded hover:bg-gray-100 cursor-pointer">
                  {opt.label}
                  <ChevronRightIcon />
                </DropdownMenu.SubTrigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.SubContent
                    className="min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg p-2"
                    sideOffset={5}
                  >
                    {opt.children.map((sub) => (
                      <DropdownMenu.Item
                        key={sub.label}
                        onSelect={() => onChange(sub.label)}
                        className="px-4 py-2 text-sm rounded hover:bg-blue-100 cursor-pointer"
                      >
                        {sub.label}
                      </DropdownMenu.Item>
                    ))}

                    {/* Add new edition */}
                    <div className="flex items-center gap-1 pt-2 border-t text-xs">
                      <input
                        value={newEdition}
                        onChange={(e) => setNewEdition(e.target.value)}
                        placeholder="New Edition..."
                        className="flex-1 border rounded px-2 py-1 text-sm"
                      />
                      <button
                        onClick={() => addEdition(opt.label)}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                      >
                        +
                      </button>
                    </div>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
              </DropdownMenu.Sub>
            ) : (
              <DropdownMenu.Item
                key={opt.label}
                onSelect={() => onChange(opt.label)}
                className="px-4 py-2 text-sm rounded hover:bg-blue-100 cursor-pointer"
              >
                {opt.label}
              </DropdownMenu.Item>
            )
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

// ---------- Main BlogEditor ----------
export default function BlogEditor() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [pages, setPages] = useState(initialPages);

  // re-init EditorJS whenever category changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.destroy?.();
      editorRef.current = null;
    }

    const apis = apiMap[category] || { byFile: "/uploadFile", byUrl: "/fetchUrl" };

    editorRef.current = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      tools: {
        header: { class: Header, inlineToolbar: true },
        list: { class: List, inlineToolbar: true },
        embed: Embed,
        image: {
          class: ImageTool,
          config: {
            endpoints: apis,
          },
        },
      },
    });

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [category]);

  const handleSave = async () => {
    if (editorRef.current) {
      try {
        const output = await editorRef.current.save();
        console.log("Saved Blog:", {
          title,
          category,
          content: output,
        });
        alert("Blog saved! Check console for output.");
      } catch (err) {
        console.error("Saving failed:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col lg:flex-row gap-6">
      {/* Editor Section */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
        <input
          type="text"
          placeholder="Enter Blog Title..."
          className="w-full text-2xl font-semibold border-b pb-2 outline-none mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div id="editorjs" className="min-h-[400px]" />
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="p-5 rounded-xl border border-gray-300 bg-white shadow hover:shadow-md transition">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Page / Category
          </label>
          <CategoryDropdown
            options={pages}
            value={category}
            onChange={(val) => setCategory(val)}
            setOptions={setPages}
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
        >
          Save Blog
        </button>
      </div>
    </div>
  );
}
