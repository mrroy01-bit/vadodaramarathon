// Sidebar.jsx

const menuItems = [
  { key: "jobs", label: "Jobs" },
  { key: "volunteer", label: "Volunteer" },
  { key: "partner", label: "Partner" },
  { key: "sponsor", label: "Sponsor" },

];

export default function Sidebar({ activeKey, setActiveKey }) {
  return (
    <aside className="w-64 h-screen p-4 ml-12 mt-28">
      <h2 className="mb-6 text-xl font-bold text-gray-800">Philanthropy
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
