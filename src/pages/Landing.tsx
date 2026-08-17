import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Dumbbell,
  Menu,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

const Landing = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#03070d] font-sans text-white">
      {/* ============================================================
          GLOWING BACKGROUND
      ============================================================ */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Blue glow - top right */}
        <div className="absolute -right-64 -top-64 h-[650px] w-[650px] rounded-full bg-blue-600/[0.08] blur-[140px]" />

        {/* Green glow - bottom left */}
        <div className="absolute -bottom-64 -left-64 h-[650px] w-[650px] rounded-full bg-emerald-500/[0.08] blur-[140px]" />

        {/* Small center green glow */}
        <div className="absolute left-1/2 top-[45%] h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-emerald-400/[0.025] blur-[120px]" />

        {/* Very subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* ============================================================
          CONTENT
      ============================================================ */}

      <div className="relative z-10">
        {/* ============================================================
            NAVBAR
        ============================================================ */}

        <header className="border-b border-white/[0.07] bg-[#03070d]/80 backdrop-blur-xl">
          <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 lg:px-8">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10">
                <Dumbbell size={20} className="text-emerald-400" />
              </div>

              <div>
                <p className="text-base font-black tracking-tight">
                  GymFlow
                </p>

                <p className="text-[8px] font-bold tracking-[0.3em] text-emerald-400">
                  ETHIOPIA
                </p>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden items-center gap-8 md:flex">
              <a
                href="#features"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Features
              </a>

              <a
                href="#why-gymflow"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Why GymFlow
              </a>

              <a
                href="#about"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                About
              </a>
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Manager Login
              </Link>

              <Link
                to="/login"
                className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-emerald-400"
              >
                Get Started
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-lg border border-white/10 p-2 text-slate-300 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* MOBILE MENU */}
          {mobileMenu && (
            <div className="border-t border-white/[0.07] bg-[#050a10] px-5 py-5 md:hidden">
              <nav className="flex flex-col gap-4">
                <a
                  href="#features"
                  onClick={() => setMobileMenu(false)}
                  className="text-sm text-slate-300"
                >
                  Features
                </a>

                <a
                  href="#why-gymflow"
                  onClick={() => setMobileMenu(false)}
                  className="text-sm text-slate-300"
                >
                  Why GymFlow
                </a>

                <a
                  href="#about"
                  onClick={() => setMobileMenu(false)}
                  className="text-sm text-slate-300"
                >
                  About
                </a>

                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="mt-2 rounded-lg bg-emerald-500 px-5 py-3 text-center text-sm font-bold text-black"
                >
                  Manager Login
                </Link>
              </nav>
            </div>
          )}
        </header>

        {/* ============================================================
            MAIN
        ============================================================ */}

        <main>
          {/* ========================================================
              HERO
          ======================================================== */}

          <section className="mx-auto max-w-6xl px-5 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
              {/* HERO TEXT */}
              <div>
                {/* BADGE */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400">
                    Built for modern gyms in Ethiopia
                  </span>
                </div>

                {/* HEADING */}
                <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-[64px]">
                  Manage your gym
                  <span className="block text-slate-400">
                    simply and
                  </span>
                  <span className="block text-emerald-400">
                    efficiently.
                  </span>
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                  GymFlow helps you manage members, payments, trainers,
                  classes, and daily gym operations — all in one simple
                  system.
                </p>

                {/* BUTTONS */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/login"
                    className="group flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3.5 text-sm font-bold text-black transition hover:bg-emerald-400"
                  >
                    Get Started

                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>

                  <a
                    href="#features"
                    className="flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
                  >
                    Explore Features
                  </a>
                </div>

                {/* TRUST */}
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  <TrustItem text="Easy to use" />

                  <TrustItem text="Secure" />

                  <TrustItem text="Built for Ethiopia" />
                </div>
              </div>

              {/* ====================================================
                  SIMPLE DASHBOARD PREVIEW
              ==================================================== */}

              <div className="relative">
                {/* Dashboard glow */}
                <div className="absolute -inset-8 rounded-[40px] bg-emerald-500/[0.05] blur-[70px]" />

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#071019] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                  {/* DASHBOARD HEADER */}
                  <div className="flex h-14 items-center justify-between border-b border-white/[0.06] bg-[#09131f] px-4 sm:px-5">
                    <div className="flex items-center gap-2.5">
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

                        <p className="text-[6px] font-bold tracking-[0.25em] text-emerald-400">
                          ETHIOPIA
                        </p>
                      </div>
                    </div>

                    <div className="h-7 w-7 rounded-full bg-blue-500/20" />
                  </div>

                  {/* DASHBOARD CONTENT */}
                  <div className="p-4 sm:p-6">
                    {/* TITLE */}
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">
                        Overview
                      </p>

                      <h2 className="mt-1 text-lg font-black sm:text-xl">
                        Good morning, Manager
                      </h2>

                      <p className="mt-1 text-[9px] text-slate-500">
                        Here's what's happening at your gym today.
                      </p>
                    </div>

                    {/* STATS */}
                    <div className="mt-5 grid grid-cols-3 gap-2.5">
                      <DashboardStat
                        icon={Users}
                        label="Members"
                        value="1,248"
                        change="+8.5%"
                      />

                      <DashboardStat
                        icon={Users}
                        label="Active Now"
                        value="42"
                        change="+16.7%"
                      />

                      <DashboardStat
                        icon={CreditCard}
                        label="Revenue"
                        value="12.4K"
                        change="+12.3%"
                      />
                    </div>

                    {/* CHART + CLASSES */}
                    <div className="mt-4 grid gap-3 md:grid-cols-[1.4fr_1fr]">
                      {/* CHART */}
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold">
                              Membership Growth
                            </p>

                            <p className="mt-1 text-[8px] text-slate-600">
                              Last 6 months
                            </p>
                          </div>

                          <TrendingUp
                            size={14}
                            className="text-emerald-400"
                          />
                        </div>

                        <div className="mt-5 flex h-28 items-end gap-2">
                          {[
                            35,
                            48,
                            42,
                            65,
                            57,
                            78,
                            70,
                            90,
                          ].map((height, index) => (
                            <div
                              key={index}
                              className="relative flex-1 rounded-t-md bg-emerald-500/[0.08]"
                              style={{
                                height: `${height}%`,
                              }}
                            >
                              <div
                                className="absolute bottom-0 w-full rounded-t-md bg-gradient-to-t from-emerald-600 to-emerald-400"
                                style={{
                                  height: `${height * 0.8}%`,
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="mt-2 flex justify-between text-[7px] text-slate-700">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                          <span>Jun</span>
                        </div>
                      </div>

                      {/* UPCOMING CLASSES */}
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] font-bold">
                            Upcoming Classes
                          </p>

                          <CalendarDays
                            size={13}
                            className="text-slate-600"
                          />
                        </div>

                        <div className="mt-4 space-y-4">
                          <SmallClass
                            time="08:00"
                            name="HIIT Training"
                            people="18/20"
                          />

                          <SmallClass
                            time="09:30"
                            name="Strength"
                            people="14/20"
                          />

                          <SmallClass
                            time="11:00"
                            name="Yoga Flow"
                            people="12/15"
                          />
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM STATS */}
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3">
                        <p className="text-[8px] text-slate-600">
                          New Members
                        </p>

                        <p className="mt-1 text-sm font-black">
                          156
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3">
                        <p className="text-[8px] text-slate-600">
                          Retention
                        </p>

                        <p className="mt-1 text-sm font-black">
                          92.3%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              FEATURES
          ======================================================== */}

          <section
            id="features"
            className="border-y border-white/[0.06] bg-white/[0.012]"
          >
            <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                  Features
                </p>

                <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                  Everything your gym needs
                </h2>

                <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
                  Simple tools to help you manage your gym without
                  unnecessary complexity.
                </p>
              </div>

              <div className="mt-12 grid gap-5 md:grid-cols-3">
                <FeatureCard
                  icon={Users}
                  title="Member Management"
                  description="Keep members, memberships, and attendance organized in one place."
                />

                <FeatureCard
                  icon={CreditCard}
                  title="Payments"
                  description="Track payments, renewals, and your gym's financial activity."
                />

                <FeatureCard
                  icon={BarChart3}
                  title="Reports"
                  description="Understand your gym performance with simple, useful insights."
                />
              </div>
            </div>
          </section>

          {/* ========================================================
              WHY GYMFLOW
          ======================================================== */}

          <section id="why-gymflow">
            <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                    Why GymFlow?
                  </p>

                  <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                    Less paperwork.
                    <span className="block text-slate-500">
                      More time for your gym.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
                    Stop switching between spreadsheets, notebooks,
                    payment records, and different systems. GymFlow
                    brings your daily gym operations together.
                  </p>

                  <div className="mt-7 space-y-4">
                    <CheckItem text="Manage members and memberships" />

                    <CheckItem text="Track payments and renewals" />

                    <CheckItem text="Organize trainers and classes" />

                    <CheckItem text="Track gym performance" />
                  </div>
                </div>

                {/* SIMPLE INFO CARD */}
                <div className="relative">
                  <div className="absolute -inset-5 rounded-[35px] bg-emerald-500/[0.04] blur-[60px]" />

                  <div className="relative rounded-2xl border border-white/10 bg-[#071019] p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      GymFlow
                    </p>

                    <h3 className="mt-3 text-2xl font-black">
                      One simple place for your gym.
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      Keep the information your team needs close,
                      organized, and easy to understand.
                    </p>

                    <div className="mt-7 grid grid-cols-3 gap-3">
                      <InfoStat
                        label="Members"
                        value="1,248"
                      />

                      <InfoStat
                        label="Active"
                        value="42"
                      />

                      <InfoStat
                        label="Revenue"
                        value="12.4K"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              ETHIOPIA
          ======================================================== */}

          <section id="about">
            <div className="mx-auto max-w-6xl px-5 pb-20 lg:px-8 lg:pb-24">
              <div className="relative overflow-hidden rounded-2xl border border-blue-500/10 bg-[#07121e] px-6 py-10 sm:px-10">
                {/* BLUE GLOW */}
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/[0.08] blur-[90px]" />

                <div className="relative max-w-3xl">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                    Made for Ethiopia
                  </p>

                  <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                    Built around the way
                    <span className="text-blue-400">
                      {" "}
                      Ethiopian gyms operate.
                    </span>
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                    GymFlow is designed with local gym operations in
                    mind, from membership management to financial
                    reporting and daily staff oversight.
                  </p>

                  <Link
                    to="/login"
                    className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400"
                  >
                    Get Started
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              CTA
          ======================================================== */}

          <section>
            <div className="mx-auto max-w-6xl px-5 pb-20 lg:px-8 lg:pb-24">
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] px-6 py-14 text-center sm:px-10">
                {/* CTA GLOW */}
                <div className="absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-emerald-500/[0.08] blur-[90px]" />

                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                    Ready to get started?
                  </p>

                  <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black sm:text-4xl">
                    Run your gym with clarity.
                  </h2>

                  <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">
                    Manage members, payments, trainers, classes, and
                    daily operations in one place.
                  </p>

                  <Link
                    to="/login"
                    className="group mx-auto mt-7 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3.5 text-sm font-bold text-black transition hover:bg-emerald-400"
                  >
                    Go to Manager Login

                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ============================================================
            FOOTER
        ============================================================ */}

        <footer className="border-t border-white/[0.07]">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Dumbbell size={16} />
              </div>

              <div>
                <p className="text-sm font-bold">
                  GymFlow
                </p>

                <p className="text-[7px] font-bold tracking-[0.25em] text-emerald-400">
                  ETHIOPIA
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              © 2026 GymFlow Ethiopia. Built for modern gyms.
            </p>

            <Link
              to="/login"
              className="text-xs font-semibold text-slate-400 transition hover:text-emerald-400"
            >
              Manager Login →
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

/* ================================================================
   TRUST ITEM
================================================================ */

const TrustItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2
        size={15}
        className="text-emerald-400"
      />

      <span className="text-xs text-slate-500">
        {text}
      </span>
    </div>
  );
};

/* ================================================================
   DASHBOARD STAT
================================================================ */

interface DashboardStatProps {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
}

const DashboardStat = ({
  icon: Icon,
  label,
  value,
  change,
}: DashboardStatProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3">
      <div className="flex items-center justify-between">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
          <Icon size={13} />
        </div>

        <span className="text-[7px] font-bold text-emerald-400">
          {change}
        </span>
      </div>

      <p className="mt-3 text-[7px] font-bold uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-base font-black">
        {value}
      </p>
    </div>
  );
};

/* ================================================================
   UPCOMING CLASS
================================================================ */

interface SmallClassProps {
  time: string;
  name: string;
  people: string;
}

const SmallClass = ({
  time,
  name,
  people,
}: SmallClassProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
          <CalendarDays size={11} />
        </div>

        <div>
          <p className="text-[8px] font-bold">
            {name}
          </p>

          <p className="mt-0.5 text-[7px] text-slate-600">
            {time}
          </p>
        </div>
      </div>

      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[7px] font-bold text-emerald-400">
        {people}
      </span>
    </div>
  );
};

/* ================================================================
   FEATURE CARD
================================================================ */

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 transition duration-200 hover:border-emerald-500/20 hover:bg-white/[0.025]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
        <Icon size={20} />
      </div>

      <h3 className="mt-5 text-base font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
};

/* ================================================================
   CHECK ITEM
================================================================ */

const CheckItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
        <CheckCircle2
          size={15}
          className="text-emerald-400"
        />
      </div>

      <span className="text-sm text-slate-300">
        {text}
      </span>
    </div>
  );
};

/* ================================================================
   INFO STAT
================================================================ */

const InfoStat = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <p className="text-[8px] text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-black">
        {value}
      </p>
    </div>
  );
};

export default Landing;