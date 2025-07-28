// VmEditions.jsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Component/SidebarTab";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
export default function VmEditions() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from URL path
  const activeKey = location.pathname.split("/")[2] || "12th-edition";

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar activeKey={activeKey} setActiveKey={(key) => navigate(`/vm/${key}`)} />
        <main className="flex-1 p-6 ">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
