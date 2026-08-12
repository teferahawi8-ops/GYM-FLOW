import Trainers from "./pages/Trainers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="trainers" element={<Trainers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;