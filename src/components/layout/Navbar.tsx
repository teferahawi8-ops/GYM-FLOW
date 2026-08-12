import {
  Search,
  Bell,
  ChevronDown,
  User,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/5 bg-[#080C15]/90 px-6 backdrop-blur-xl md:px-8">

      {/* =========================================
          SEARCH
      ========================================= */}
      <div className="flex w-full max-w-xl items-center">

        <div className="flex h-11 w-full items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 transition focus-within:border-blue-500/40 focus-within:bg-white/[0.05]">

          <Search
            size={19}
            strokeWidth={2}
            className="shrink-0 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search members, trainers, classes..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
          />

          {/* Keyboard shortcut */}
          <div className="hidden items-center gap-1 rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-[10px] text-slate-600 sm:flex">
            <span>⌘</span>
            <span>K</span>
          </div>

        </div>

      </div>

      {/* =========================================
          RIGHT SIDE
      ========================================= */}
      <div className="ml-6 flex items-center gap-4">

        {/* Notification */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
        >
          <Bell size={20} strokeWidth={1.8} />

          {/* Notification dot */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#080C15]" />

        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-white/5 sm:block" />

        {/* User Profile */}
        <button
          type="button"
          className="group flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-white/[0.04]"
        >

          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-blue-500/30 bg-gradient-to-br from-blue-600/30 to-violet-600/30">
            <User
              size={20}
              className="text-blue-400"
            />
          </div>

          {/* User Info */}
          <div className="hidden text-left sm:block">

            <p className="text-sm font-semibold leading-5 text-white">
              Admin
            </p>

            <p className="text-[11px] leading-4 text-slate-500">
              Gym Manager
            </p>

          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-600 transition group-hover:text-slate-400 sm:block"
          />

        </button>

      </div>

    </header>
  );
};

export default Navbar;