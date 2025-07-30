import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi"; // Menu icon
import Sidebar from "../JoinTheTeam/sidebar";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";

export default function KnowUs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine active tab from URL path
  const activeKey = location.pathname.split("/")[2] || "jobs";

  return (
    <>
      <Header />
      <div className="flex min-h-screen relative">
        {/* Mobile menu icon */}
        <button
          className="md:hidden absolute mt-24 ml-40 top-4 left-4 z-20"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <FiMenu size={28} />
        </button>

        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-30 transition-transform duration-200
            bg-white  md:static md:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:block
          `}
        >
          <Sidebar
            activeKey={activeKey}
            setActiveKey={(key) => {
              navigate(`/join-the-team/${key}`);
              setSidebarOpen(false); // Close sidebar on navigation (mobile)
            }}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
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
