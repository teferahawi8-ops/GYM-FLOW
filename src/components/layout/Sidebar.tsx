import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CreditCard,
  ClipboardCheck,
  Wallet,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Members",
      icon: Users,
      path: "/dashboard/members",
    },
    {
      name: "Trainers",
      icon: Dumbbell,
      path: "/dashboard/trainers",
    },
    {
      name: "Memberships",
      icon: CreditCard,
      path: "/dashboard/memberships",
    },
    {
      name: "Attendance",
      icon: ClipboardCheck,
      path: "/dashboard/attendance",
    },
    {
      name: "Payments",
      icon: Wallet,
      path: "/dashboard/payments",
    },
    {
      name: "Classes",
      icon: CalendarDays,
      path: "/dashboard/classes",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-slate-950 text-white">
      
      {/* ================================
          LOGO
      ================================= */}
      <div className="flex h-20 items-center border-b border-slate-800 px-6">
        <div className="flex items-center gap-3">
          
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
            <Dumbbell size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold">
              FitManage
            </h1>

            <p className="text-xs text-slate-400">
              Gym Management
            </p>
          </div>

        </div>
      </div>

      {/* ================================
          NAVIGATION
      ================================= */}
      <nav className="flex-1 px-4 py-6">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        <div className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />

                <span>
                  {item.name}
                </span>
              </NavLink>
            );
          })}

        </div>
      </nav>

      {/* ================================
          LOGOUT
      ================================= */}
      <div className="border-t border-slate-800 p-4">

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={20} />

          <span>
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;