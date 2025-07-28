import './App.css';
import LandingPage from './pages/landingPage';
import VmEditions from './pages/Vm_editions';
import TwelfthEdition from "./pages/Tab/12thedition";
import EleventhEdition from "./pages/Tab/11thedition";
import TenthEdition from "./pages/Tab/10thedition";
import NinthEdition from "./pages/Tab/9thedition";
import OtherEdition from "./pages/Tab/Otheredition";
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
   </Routes>
  );
}



export default App;
