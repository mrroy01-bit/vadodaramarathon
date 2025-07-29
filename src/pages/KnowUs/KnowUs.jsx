// VmEditions.jsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../KnowUs/Sidebar";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
export default function KnowUs() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from URL path
  const activeKey = location.pathname.split("/")[2] || "Introduction";

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar activeKey={activeKey} setActiveKey={(key) => navigate(`/know-us/${key}`)} />
        <main className="flex-1 p-6 ">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
