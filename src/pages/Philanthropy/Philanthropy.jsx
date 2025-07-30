import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Menu and Close icons
import Sidebar from "../Philanthropy/sidebar";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";

export default function Philanthropy() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine active tab from URL path
  const activeKey = location.pathname.split("/")[2] || "causes-support";

  return (
    <>
      <Header />
      <div className="flex  min-h-screen relative">
        {/* Mobile menu icon */}
        {!sidebarOpen && (
          <button
            className="md:hidden absolute top-4 mt-24 ml-44 left-4 "
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <FiMenu size={28} />
          </button>
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0  left-0 z-40 transition-transform duration-200
            bg-white  md:static md:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:block
          `}
        >
          {/* Close icon for mobile */}
          <div className="md:hidden flex justify-end p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <FiX size={28} />
            </button>
          </div>
          <Sidebar
            activeKey={activeKey}
            setActiveKey={(key) => {
              navigate(`/philanthropy/${key}`);
              setSidebarOpen(false); // Close sidebar on navigation (mobile)
            }}
          />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
