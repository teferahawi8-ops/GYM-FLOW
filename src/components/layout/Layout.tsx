import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070B14]">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute right-[-150px] top-[30%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute bottom-[-200px] left-[35%] h-[450px] w-[450px] rounded-full bg-blue-500/5 blur-[140px]" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="relative ml-64 min-h-screen">

        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="p-6 md:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Layout;