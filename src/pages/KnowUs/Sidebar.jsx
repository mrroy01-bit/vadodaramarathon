import { useState, useEffect } from "react";
import { knowUsService  } from "../../services/api";

const defaultMenuItems = [
  { key: "causes-support", label: "Causes We Support" },
  { key: "donate", label: "Donate" },
];

export default function Sidebar({ activeKey, setActiveKey }) {
  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await knowUsService.getAll();
        const data = response.data || response;

        const dynamicCategories = [];
        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (
              item.knowusType &&
              !dynamicCategories.find((cat) => cat.key === item.knowusSlug)
            ) {
              dynamicCategories.push({
                key: item.knowusSlug ||
                     item.knowusType.toLowerCase().replace(/\s+/g, "-"),
                label: item.knowusType,
              });
            }
          });
        }

        setMenuItems([...defaultMenuItems, ...dynamicCategories]);
      } catch (error) {
        console.error("Error fetching know us categories:", error);
        setMenuItems(defaultMenuItems);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <aside className="w-64 h-screen p-4 ml-12 mt-28">
      <h2 className="mb-6 text-xl font-bold text-gray-800">Know us</h2>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3CAA40]"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      ) : (
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveKey(item.key)}
                className={`w-full text-left px-4 py-2 transition font-medium rounded-lg ${
                  activeKey === item.key
                    ? "bg-[#3CAA40] text-white"
                    : "text-gray-800 hover:bg-[#3CAA40] hover:text-white"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
