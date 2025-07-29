// Sidebar.jsx

const menuItems = [
  { key: "introduction", label: "Introduction" },
  { key: "vm2023", label: "VM 2023" },
  { key: "overview", label: "Overview" },
  { key: "the-team", label: "The Team" },
  { key: "prime-minister-speaks", label: "Prime Minister Speaks" },
  { key: "brand-ambassadors", label: "Brand Ambassadors" },
  { key: "affiliations", label: "Affiliations" },
  { key: "sponsors", label: "Sponsors" },
  { key: "partners", label: "Partners" },

];

export default function Sidebar({ activeKey, setActiveKey }) {
  return (
    <aside className="w-64 h-screen p-4 ml-12 mt-28">
      <h2 className="mb-6 text-xl font-bold text-gray-800">Know Us
</h2>
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
