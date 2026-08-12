import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CreditCard,
  ClipboardCheck,
  WalletCards,
  CalendarDays,
  Settings,
  LogOut,
  Crown,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Members",
      path: "/members",
      icon: Users,
    },
    {
      name: "Trainers",
      path: "/trainers",
      icon: Dumbbell,
    },
    {
      name: "Memberships",
      path: "/memberships",
      icon: CreditCard,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: ClipboardCheck,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: WalletCards,
    },
    {
      name: "Classes",
      path: "/classes",
      icon: CalendarDays,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/5 bg-[#080C15]">

      {/* =========================================
          LOGO
      ========================================= */}
      <div className="flex h-24 items-center gap-3 border-b border-white/5 px-6">

        {/* Logo Icon */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-600/20">
          <Dumbbell
            size={24}
            strokeWidth={2.5}
            className="text-white"
          />
        </div>

        {/* Logo Text */}
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            FitManage
          </h1>

          <p className="text-[11px] font-medium text-slate-500">
            GYM MANAGEMENT
          </p>
        </div>

      </div>

      {/* =========================================
          MAIN MENU
      ========================================= */}
      <div className="flex-1 overflow-y-auto px-4 py-6">

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
          Main Menu
        </p>

        <nav className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600/15 text-blue-400"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                    )}

                    {/* Icon */}
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                      className={
                        isActive
                          ? "text-blue-400"
                          : "text-slate-500 transition-colors group-hover:text-slate-300"
                      }
                    />

                    {/* Text */}
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}

        </nav>

        {/* =========================================
            SETTINGS
        ========================================= */}
        <div className="mt-8">

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
            Settings
          </p>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600/15 text-blue-400"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`
            }
          >
            <Settings
              size={19}
              strokeWidth={1.8}
              className="text-slate-500 group-hover:text-slate-300"
            />

            <span>Settings</span>
          </NavLink>

        </div>

      </div>

      {/* =========================================
          UPGRADE CARD
      ========================================= */}
      <div className="px-4 pb-4">

        <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-violet-600/10 to-transparent p-4">

          {/* Glow */}
          <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-blue-500/20 blur-2xl" />

          <div className="relative">

            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/15">
              <Crown
                size={18}
                className="text-blue-400"
              />
            </div>

            <h3 className="text-sm font-semibold text-white">
              Upgrade to Pro
            </h3>

            <p className="mt-1 text-[11px] leading-4 text-slate-500">
              Unlock advanced reports,
              automation and more.
            </p>

            <button className="mt-3 flex w-full items-center justify-center rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white transition hover:bg-blue-500">
              Upgrade Now
            </button>

          </div>

        </div>

      </div>

      {/* =========================================
          LOGOUT
      ========================================= */}
      <div className="border-t border-white/5 p-4">

        <button
          type="button"
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/5 hover:text-red-400"
        >
          <LogOut
            size={19}
            strokeWidth={1.8}
            className="text-slate-500 transition-colors group-hover:text-red-400"
          />

          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;