import { Routes, Route } from "react-router-dom";
import SBIDashboard from "./components/Dashboard/SBIDashboard";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<SBIDashboard />} />
    </Routes>
  );
}

export default App;
