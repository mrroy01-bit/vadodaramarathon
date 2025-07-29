import './App.css';
import LandingPage from './pages/landingPage';
import VmEditions from './pages/VmEditions/Vm_editions';
import TwelfthEdition from "./pages/VmEditions/Tab/12thedition";
import EleventhEdition from "./pages/VmEditions/Tab/11thedition";
import TenthEdition from "./pages/VmEditions/Tab/10thedition";
import NinthEdition from "./pages/VmEditions/Tab/9thedition";
import OtherEdition from "./pages/VmEditions/Tab/Otheredition";
import CausesSupport from './pages/CausesSupport';

import KnowUs from './pages/KnowUs/KnowUs';
import Introduction from './pages/KnowUs/Tab/Introduction';
import VM2023 from './pages/KnowUs/Tab/VM2023';
import Overview from './pages/KnowUs/Tab/Overview';
import TheTeam from './pages/KnowUs/Tab/TheTeam';
import PrimeMinisterSpeaks from './pages/KnowUs/Tab/PrimeMinisterSpeaks';
import BrandAmbassadors from './pages/KnowUs/Tab/BrandAmbassadors';
import Affiliations from './pages/KnowUs/Tab/Affiliations';
import Sponsors from './pages/KnowUs/Tab/Sponsors';
import Partners from './pages/KnowUs/Tab/Partners';


import { Route, Routes, Navigate } from 'react-router-dom';
function App() {
  return (
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
          <Route path="prime-minister-speaks" element={<PrimeMinisterSpeaks />} />
          <Route path="brand-ambassadors" element={<BrandAmbassadors />} />
          <Route path="affiliations" element={<Affiliations />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="partners" element={<Partners />} />
          <Route path="other-edition" element={<OtherEdition />} />
        </Route>
   </Routes>
  );
}



export default App;
