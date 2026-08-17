import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  CheckCircle2,
  Dumbbell,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  TrendingUp,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

const DEFAULT_EMAIL = "hawi@gymflow.et";
const DEFAULT_PASSWORD = "admin123";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);

  const [error, setError] = useState("");

  // =========================================================
  // LOGIN
  // =========================================================

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (
      email === DEFAULT_EMAIL &&
      password === DEFAULT_PASSWORD
    ) {
      navigate("/dashboard");
      return;
    }

    setError("Invalid email or password.");
  };

  // =========================================================
  // USE PROTOTYPE CREDENTIALS
  // =========================================================

  const handleUseCredentials = () => {
    setEmail(DEFAULT_EMAIL);
    setPassword(DEFAULT_PASSWORD);
    setRememberMe(true);
    setError("");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#02060c] text-white selection:bg-emerald-500/30">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        {/* Emerald glow */}
        <div className="absolute left-[-200px] top-[10%] h-[600px] w-[600px] rounded-full bg-emerald-500/[0.08] blur-[140px]" />

        {/* Blue glow */}
        <div className="absolute right-[-200px] bottom-[-100px] h-[700px] w-[700px] rounded-full bg-blue-600/[0.10] blur-[150px]" />

        {/* Small blue glow */}
        <div className="absolute right-[30%] top-[-200px] h-[500px] w-[500px] rounded-full bg-blue-500/[0.05] blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

      </div>

      {/* =====================================================
          TOP NAVIGATION
      ====================================================== */}

      <header className="relative z-20 mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6 lg:px-10">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.25)]">

            <Dumbbell
              size={22}
              className="text-black"
            />

          </div>

          <div>

            <h1 className="text-lg font-black tracking-tight">
              GymFlow
            </h1>

            <p className="mt-0.5 text-[8px] font-bold tracking-[0.3em] text-emerald-500">
              ETHIOPIA
            </p>

          </div>

        </Link>

        {/* Back */}

        <Link
          to="/"
          className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-slate-400 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
        >
          Back to website

          <ArrowRight
            size={14}
            className="rotate-180 transition-transform group-hover:-translate-x-1"
          />
        </Link>

      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-[1400px] items-center px-6 py-10 lg:px-10">

        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#070b12]/80 shadow-[0_40px_120px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <section className="relative hidden min-h-[720px] overflow-hidden border-r border-white/[0.06] bg-[#060b12] lg:block">

            {/* Decorative glow */}

            <div className="absolute left-[-150px] top-[10%] h-[500px] w-[500px] rounded-full bg-emerald-500/[0.08] blur-[120px]" />

            <div className="absolute right-[-100px] bottom-[-100px] h-[450px] w-[450px] rounded-full bg-blue-500/[0.08] blur-[120px]" />

            {/* Decorative circles */}

            <div className="absolute right-[-160px] top-[100px] h-[500px] w-[500px] rounded-full border border-blue-500/[0.08]" />

            <div className="absolute right-[-100px] top-[160px] h-[380px] w-[380px] rounded-full border border-emerald-500/[0.08]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">

              {/* Top content */}

              <div>

                <div className="mb-7 flex items-center gap-3">

                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)]" />

                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400">
                    Manager Workspace
                  </span>

                </div>

                <h2 className="max-w-xl text-5xl font-black leading-[0.98] tracking-tight xl:text-6xl">

                  Everything your gym needs.

                  <br />

                  <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                    One workspace.
                  </span>

                </h2>

                <p className="mt-7 max-w-lg text-sm leading-7 text-slate-500 xl:text-base">
                  Manage members, payments, trainers, classes,
                  check-ins, and gym operations from one powerful
                  management platform.
                </p>

                {/* Features */}

                <div className="mt-9 space-y-4">

                  <LoginFeature
                    icon={<Users size={18} />}
                    title="Manage members and staff"
                  />

                  <LoginFeature
                    icon={<Wallet size={18} />}
                    title="Track payments and revenue"
                  />

                  <LoginFeature
                    icon={<BarChart3 size={18} />}
                    title="Monitor your gym performance"
                  />

                  <LoginFeature
                    icon={<ShieldCheck size={18} />}
                    title="Secure management access"
                  />

                </div>

              </div>

              {/* Dashboard preview */}

              <div className="relative mt-10">

                <div className="absolute -inset-5 rounded-3xl bg-blue-500/[0.06] blur-2xl" />

                <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090f18] shadow-[0_30px_70px_rgba(0,0,0,0.5)]">

                  {/* Dashboard header */}

                  <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#0b111b] px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">

                        <Dumbbell
                          size={15}
                          className="text-black"
                        />

                      </div>

                      <div>

                        <p className="text-[10px] font-black">
                          GymFlow
                        </p>

                        <p className="text-[6px] font-bold tracking-[0.2em] text-emerald-500">
                          DASHBOARD
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-3">

                      <div className="hidden rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 sm:block">

                        <div className="flex items-center gap-2">

                          <div className="h-2 w-2 rounded-full bg-emerald-400" />

                          <span className="text-[8px] text-slate-500">
                            System Online
                          </span>

                        </div>

                      </div>

                      <Bell
                        size={14}
                        className="text-slate-500"
                      />

                    </div>

                  </div>

                  {/* Dashboard body */}

                  <div className="p-5">

                    <div className="mb-4 flex items-center justify-between">

                      <div>

                        <p className="text-[11px] font-black">
                          Dashboard Overview
                        </p>

                        <p className="mt-1 text-[7px] text-slate-600">
                          Your gym at a glance
                        </p>

                      </div>

                      <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[7px] text-slate-500">
                        This Month
                      </div>

                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-3 gap-3">

                      <DashboardStat
                        icon={<Users size={13} />}
                        label="Members"
                        value="1,248"
                        change="+8.5%"
                      />

                      <DashboardStat
                        icon={<TrendingUp size={13} />}
                        label="Active"
                        value="42"
                        change="+16.7%"
                        green
                      />

                      <DashboardStat
                        icon={<Wallet size={13} />}
                        label="Revenue"
                        value="12.4K"
                        change="+12.3%"
                      />

                    </div>

                    {/* Chart */}

                    <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">

                      <div className="mb-4 flex items-center justify-between">

                        <p className="text-[9px] font-bold">
                          Membership Growth
                        </p>

                        <span className="text-[7px] text-emerald-400">
                          +18.4%
                        </span>

                      </div>

                      <div className="flex h-20 items-end gap-2">

                        {[35, 50, 43, 68, 58, 82, 72, 90].map(
                          (height, index) => (
                            <div
                              key={index}
                              className="relative flex-1 overflow-hidden rounded-t-sm bg-blue-500/[0.08]"
                            >

                              <div
                                className="absolute bottom-0 w-full rounded-t-sm bg-gradient-to-t from-blue-600 to-emerald-400"
                                style={{
                                  height: `${height}%`,
                                }}
                              />

                            </div>
                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              RIGHT SIDE - LOGIN
          ================================================== */}

          <section className="flex min-h-[720px] items-center justify-center bg-[#070b12] p-6 sm:p-10 lg:p-12">

            <div className="w-full max-w-[430px]">

              {/* Mobile logo */}

              <div className="mb-10 flex items-center justify-center lg:hidden">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.25)]">

                    <Dumbbell
                      size={22}
                      className="text-black"
                    />

                  </div>

                  <div>

                    <p className="text-lg font-black">
                      GymFlow
                    </p>

                    <p className="text-[8px] font-bold tracking-[0.3em] text-emerald-500">
                      ETHIOPIA
                    </p>

                  </div>

                </div>

              </div>

              {/* Login heading */}

              <div className="mb-8">

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5">

                  <ShieldCheck
                    size={13}
                    className="text-emerald-400"
                  />

                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">
                    Secure Manager Access
                  </span>

                </div>

                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Welcome back.
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Sign in to continue managing your gym
                  operations.
                </p>

              </div>

              {/* =================================================
                  LOGIN CARD
              ================================================== */}

              <div className="rounded-2xl border border-white/[0.08] bg-[#0a1019] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.35)] sm:p-7">

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* Email */}

                  <div>

                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Email address
                    </label>

                    <div className="group relative">

                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 transition group-focus-within:text-emerald-400"
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
                        placeholder="manager@gymflow.et"
                        className="w-full rounded-xl border border-white/[0.08] bg-[#050a11] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-emerald-500/50 focus:bg-[#07100f] focus:ring-2 focus:ring-emerald-500/10"
                        required
                      />

                    </div>

                  </div>

                  {/* Password */}

                  <div>

                    <div className="mb-2 flex items-center justify-between">

                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Password
                      </label>

                      <button
                        type="button"
                        className="text-[10px] font-semibold text-blue-400 transition hover:text-blue-300"
                      >
                        Forgot password?
                      </button>

                    </div>

                    <div className="group relative">

                      <Lock
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 transition group-focus-within:text-emerald-400"
                      />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={password}
                        onChange={(event) =>
                          setPassword(event.target.value)
                        }
                        placeholder="••••••••••"
                        className="w-full rounded-xl border border-white/[0.08] bg-[#050a11] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-emerald-500/50 focus:bg-[#07100f] focus:ring-2 focus:ring-emerald-500/10"
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (current) => !current
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 transition hover:text-white"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >

                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}

                      </button>

                    </div>

                  </div>

                  {/* Remember me */}

                  <div>

                    <button
                      type="button"
                      onClick={() =>
                        setRememberMe(
                          (current) => !current
                        )
                      }
                      className="flex items-center gap-2"
                    >

                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                          rememberMe
                            ? "border-emerald-400 bg-emerald-500"
                            : "border-slate-700 bg-transparent"
                        }`}
                      >

                        {rememberMe && (
                          <Check
                            size={11}
                            className="text-black"
                          />
                        )}

                      </span>

                      <span className="text-xs text-slate-500">
                        Remember this device
                      </span>

                    </button>

                  </div>

                  {/* Error */}

                  {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3">

                      <p className="text-xs font-medium text-red-400">
                        {error}
                      </p>

                    </div>
                  )}

                  {/* Submit */}

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 py-3.5 text-sm font-black text-black shadow-[0_0_30px_rgba(16,185,129,0.18)] transition-all hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-[0.99]"
                  >

                    Sign in to dashboard

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </button>

                </form>

                {/* Security */}

                <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-slate-600">

                  <ShieldCheck size={13} />

                  <span>
                    Secure connection • Protected access
                  </span>

                </div>

              </div>

              {/* =================================================
                  PROTOTYPE ACCOUNT
              ================================================== */}

              <div className="mt-5 rounded-2xl border border-blue-500/15 bg-blue-500/[0.035] p-5">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10">

                        <UserRound
                          size={14}
                          className="text-blue-400"
                        />

                      </div>

                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-400">
                        Demo Account
                      </p>

                    </div>

                    <p className="mt-3 text-sm font-bold text-white">
                      {DEFAULT_EMAIL}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-600">
                      Password: {DEFAULT_PASSWORD}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={handleUseCredentials}
                    className="shrink-0 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2 text-[10px] font-bold text-emerald-400 transition hover:bg-emerald-500/10 hover:text-emerald-300"
                  >
                    Use account
                  </button>

                </div>

              </div>

              {/* Bottom */}

              <div className="mt-7 flex items-center justify-center gap-2 text-[10px] text-slate-600">

                <CheckCircle2
                  size={13}
                  className="text-emerald-500"
                />

                Built for modern gyms in Ethiopia

              </div>

              <button
                onClick={() => navigate("/")}
                className="mx-auto mt-4 block text-xs text-slate-600 transition hover:text-white"
              >
                ← Return to GymFlow
              </button>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};

/* ============================================================
   LOGIN FEATURE
============================================================ */

interface LoginFeatureProps {
  icon: ReactNode;
  title: string;
}

const LoginFeature = ({
  icon,
  title,
}: LoginFeatureProps) => {
  return (
    <div className="group flex items-center gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-emerald-400 transition group-hover:border-emerald-500/20 group-hover:bg-emerald-500/[0.06]">
        {icon}
      </div>

      <p className="text-xs font-medium text-slate-500 transition group-hover:text-slate-300">
        {title}
      </p>

    </div>
  );
};

/* ============================================================
   DASHBOARD STAT
============================================================ */

interface DashboardStatProps {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
  green?: boolean;
}

const DashboardStat = ({
  icon,
  label,
  value,
  change,
  green = false,
}: DashboardStatProps) => {
  return (
    <div
      className={`rounded-xl border p-3 ${
        green
          ? "border-emerald-500/15 bg-emerald-500/[0.025]"
          : "border-blue-500/15 bg-blue-500/[0.025]"
      }`}
    >

      <div className="mb-2 flex items-center justify-between">

        <div
          className={`flex h-6 w-6 items-center justify-center rounded-lg ${
            green
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-blue-500/10 text-blue-400"
          }`}
        >
          {icon}
        </div>

        <span className="text-[7px] font-bold text-emerald-400">
          {change}
        </span>

      </div>

      <p className="text-[7px] font-bold uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-0.5 text-sm font-black">
        {value}
      </p>

    </div>
  );
};

export default Login;