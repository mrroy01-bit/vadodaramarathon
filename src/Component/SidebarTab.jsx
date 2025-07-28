// Sidebar.jsx

const menuItems = [
  { key: "12th-edition", label: "12ᵗʰ Edition" },
  { key: "11th-edition", label: "11ᵗʰ Edition" },
  { key: "10th-edition", label: "10ᵗʰ Edition" },
  { key: "9th-edition", label: "9ᵗʰ Edition" },
  { key: "other-edition", label: "Other Edition" },
];

export default function Sidebar({ activeKey, setActiveKey }) {
  return (
    <aside className="w-64 h-screen p-4  mt-28 ml-12">
      <h2 className="text-xl font-bold mb-6 text-gray-800">VM Editions</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              onClick={() => setActiveKey(item.key)}
              className={`w-full text-left px-4 py-2  transition font-medium ${
                activeKey === item.key
                  ? "bg-[#3CAA40] text-white"
                  : "text-gray-800 hover:bg-[#3CAA40]"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
