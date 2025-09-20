import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/landingPage";
import VmEditions from "./pages/VmEditions/Vm_editions";
import TwelfthEdition from "./pages/VmEditions/Tab/12thedition";
import EleventhEdition from "./pages/VmEditions/Tab/11thedition";
import TenthEdition from "./pages/VmEditions/Tab/10thedition";
import NinthEdition from "./pages/VmEditions/Tab/9thedition";
import OtherEdition from "./pages/VmEditions/Tab/Otheredition";
import CausesSupport from "./pages/CausesSupport";

import KnowUs from "./pages/KnowUs/KnowUs";
import Introduction from "./pages/KnowUs/Tab/Introduction";
import VM2023 from "./pages/KnowUs/Tab/VM2023";
import Overview from "./pages/KnowUs/Tab/Overview";
import TheTeam from "./pages/KnowUs/Tab/TheTeam";
import PrimeMinisterSpeaks from "./pages/KnowUs/Tab/PrimeMinisterSpeaks";
import BrandAmbassadors from "./pages/KnowUs/Tab/BrandAmbassadors";
import Affiliations from "./pages/KnowUs/Tab/Affiliations";
import Sponsors from "./pages/KnowUs/Tab/Sponsors";
import Partners from "./pages/KnowUs/Tab/Partners";

import Philanthropy from "./pages/Philanthropy/Philanthropy";
import CausesWeSupport from "./pages/Philanthropy/Tab/CausesSupport";
import ObservershipProgram from "./pages/Philanthropy/Tab/ObservershipProgram";
import VmConnect from "./pages/Philanthropy/Tab/VMConnect";
import NgoPartner from "./pages/Philanthropy/Tab/NGOPartner";
import Donate from "./pages/Philanthropy/Tab/Donate";

import JoinTheTeam from "./pages/JoinTheTeam/JoinTheTeam";
import Jobs from "./pages/JoinTheTeam/Tab/Jobs";
import Volunteer from "./pages/JoinTheTeam/Tab/Volunteer";
import Partner from "./pages/JoinTheTeam/Tab/Partner";
import Sponsor from "./pages/JoinTheTeam/Tab/Sponsor";

import PrivacyNotice from "./Component/Footer/PrivacyNotice";
import FAQAccordion from "./Component/Footer/FAQs";
import TermsAndConditions from "./Component/Footer/TermsAndConditions";
import Contact from "./Component/Footer/Contact";
import PastEvents from "./Component/Footer/PastEvents";

import Gallery from "./Component/Footer/Gallery/Gallery";
import Year2020 from "./Component/Footer/Gallery/Tab/2020";
import Year2019 from "./Component/Footer/Gallery/Tab/2019";
import Year2018 from "./Component/Footer/Gallery/Tab/2018";
import PressPage from "./Component/Footer/Press";
import ArticlePage from "./Component/Footer/ArticlePage";

import UserLogin from "./pages/Auth/Login/UserLogin";
import UserRegister from "./pages/Auth/Register/UserRegister";
import PasswordForget from "./pages/Auth/Login/PasswordForget";
import AdminLogin from "./pages/Auth/Login/AdminLogin";
import AdminRegister from "./pages/Auth/Register/AdminRegister";
import Dashboard from "./pages/Dashboard/AdminDashboard";
import BrandDashboard from "./pages/Dashboard/BrandDashboard";
import UserDashboard from "./pages/Dashboard/UserDashbord";
import SponsorsDashboard from "./pages/Dashboard/SponsorDashboard";
import ProtectedRoute from "./Component/ProtectedRoute";
import Unauthorized from "./Component/Unauthorized";
import { Route, Routes, Navigate } from "react-router-dom";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vm" element={<VmEditions />}>
          <Route index element={<Navigate to="12th-edition" />} />
          <Route path="12th-edition" element={<TwelfthEdition />} />
          <Route path="11th-edition" element={<EleventhEdition />} />
          <Route path="10th-edition" element={<TenthEdition />} />
          <Route path="9th-edition" element={<NinthEdition />} />
          <Route path="other-edition" element={<OtherEdition />} />
        </Route>
        <Route path="/causes-support" element={<CausesSupport />} />
        <Route path="/know-us" element={<KnowUs />}>
          <Route index element={<Navigate to="Introduction" />} />
          <Route path="introduction" element={<Introduction />} />
          <Route path="vm2023" element={<VM2023 />} />
          <Route path="overview" element={<Overview />} />
          <Route path="the-team" element={<TheTeam />} />
          <Route
            path="prime-minister-speaks"
            element={<PrimeMinisterSpeaks />}
          />
          <Route path="brand-ambassadors" element={<BrandAmbassadors />} />
          <Route path="affiliations" element={<Affiliations />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="partners" element={<Partners />} />
          <Route path="other-edition" element={<OtherEdition />} />
        </Route>
        <Route path="/philanthropy" element={<Philanthropy />}>
          <Route index element={<Navigate to="causes-support" />} />
          <Route path="causes-support" element={<CausesWeSupport />} />
          <Route
            path="the-mg-nurture-observership-program"
            element={<ObservershipProgram />}
          />
          <Route path="vm-connect" element={<VmConnect />} />
          <Route path="ngo-partner" element={<NgoPartner />} />
          <Route path="donate" element={<Donate />} />
        </Route>
        <Route path="/join-the-team" element={<JoinTheTeam />}>
          <Route index element={<Navigate to="jobs" />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="volunteer" element={<Volunteer />} />
          <Route path="partner" element={<Partner />} />
          <Route path="sponsor" element={<Sponsor />} />
        </Route>
        <Route path="/privacy-notice" element={<PrivacyNotice />} />
        <Route path="/faqs" element={<FAQAccordion />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/past-events" element={<PastEvents />} />
        <Route path="/gallery" element={<Gallery />}>
          <Route index element={<Year2020 />} />
          <Route path="2020" element={<Year2020 />} />
          <Route path="2019" element={<Year2019 />} />
          <Route path="2018" element={<Year2018 />} />
        </Route>
        <Route path="/press" element={<PressPage />} />
        <Route path="/press/:id" element={<ArticlePage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/password-forget" element={<PasswordForget />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/brand/dashboard" element={<BrandDashboard />} />
        <Route path="/sponsors/dashboard" element={<SponsorsDashboard />} />
      </Routes>
    </>
  );
}

export default App;
