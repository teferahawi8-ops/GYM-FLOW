import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  CreditCard,
  Clock,
  Users,
  Wallet,
  CalendarDays,
} from "lucide-react";

interface MembershipPlan {
  id: number;
  name: string;
  duration: number;
  durationType: "Days" | "Months" | "Years";
  price: number;
  description: string;
  status: "Active" | "Inactive";
  members: number;
}

const initialPlans: MembershipPlan[] = [
  {
    id: 1,
    name: "Basic",
    duration: 1,
    durationType: "Months",
    price: 1000,
    description: "Perfect for beginners starting their fitness journey.",
    status: "Active",
    members: 24,
  },
  {
    id: 2,
    name: "Standard",
    duration: 3,
    durationType: "Months",
    price: 2500,
    description: "Best choice for regular gym members.",
    status: "Active",
    members: 48,
  },
  {
    id: 3,
    name: "Premium",
    duration: 12,
    durationType: "Months",
    price: 8000,
    description: "Complete yearly membership for dedicated members.",
    status: "Active",
    members: 31,
  },
];

const Memberships = () => {
  /* =========================================
     MEMBERSHIP DATA
  ========================================= */

  const [plans, setPlans] = useState<MembershipPlan[]>(() => {
    const savedPlans = localStorage.getItem("gym_membership_plans");

    if (savedPlans) {
      try {
        return JSON.parse(savedPlans) as MembershipPlan[];
      } catch {
        return initialPlans;
      }
    }

    return initialPlans;
  });

  /* =========================================
     SEARCH
  ========================================= */

  const [search, setSearch] = useState("");

  /* =========================================
     FILTER
  ========================================= */

  const [filter, setFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  /* =========================================
     MODAL
  ========================================= */

  const [showModal, setShowModal] = useState(false);

  const [editingPlan, setEditingPlan] =
    useState<MembershipPlan | null>(null);

  /* =========================================
     FORM
  ========================================= */

  const [formData, setFormData] = useState({
    name: "",
    duration: 1,
    durationType: "Months" as
      | "Days"
      | "Months"
      | "Years",
    price: "",
    description: "",
  });

  /* =========================================
     SAVE TO LOCAL STORAGE
  ========================================= */

  useEffect(() => {
    localStorage.setItem(
      "gym_membership_plans",
      JSON.stringify(plans)
    );
  }, [plans]);

  /* =========================================
     FILTER PLANS
  ========================================= */

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        plan.name.toLowerCase().includes(searchValue) ||
        plan.description
          .toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        filter === "All" ||
        plan.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [plans, search, filter]);

  /* =========================================
     STATISTICS
  ========================================= */

  const activePlans = plans.filter(
    (plan) => plan.status === "Active"
  ).length;


  const totalMembers = plans.reduce(
    (total, plan) => total + plan.members,
    0
  );

  const totalRevenue = plans.reduce(
    (total, plan) =>
      total + plan.price * plan.members,
    0
  );

  /* =========================================
     OPEN ADD MODAL
  ========================================= */

  const openAddModal = () => {
    setEditingPlan(null);

    setFormData({
      name: "",
      duration: 1,
      durationType: "Months",
      price: "",
      description: "",
    });

    setShowModal(true);
  };

  /* =========================================
     OPEN EDIT MODAL
  ========================================= */

  const openEditModal = (plan: MembershipPlan) => {
    setEditingPlan(plan);

    setFormData({
      name: plan.name,
      duration: plan.duration,
      durationType: plan.durationType,
      price: plan.price.toString(),
      description: plan.description,
    });

    setShowModal(true);
  };

  /* =========================================
     CLOSE MODAL
  ========================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingPlan(null);
  };

  /* =========================================
     SUBMIT FORM
  ========================================= */

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.price ||
      Number(formData.price) < 0
    ) {
      alert("Please enter a valid membership name and price.");
      return;
    }

    if (Number(formData.duration) <= 0) {
      alert("Duration must be greater than 0.");
      return;
    }

    /* EDIT */

    if (editingPlan) {
      setPlans((currentPlans) =>
        currentPlans.map((plan) =>
          plan.id === editingPlan.id
            ? {
                ...plan,
                name: formData.name.trim(),
                duration: Number(formData.duration),
                durationType: formData.durationType,
                price: Number(formData.price),
                description:
                  formData.description.trim(),
              }
            : plan
        )
      );

      closeModal();
      return;
    }

    /* ADD */

    const newPlan: MembershipPlan = {
      id: Date.now(),
      name: formData.name.trim(),
      duration: Number(formData.duration),
      durationType: formData.durationType,
      price: Number(formData.price),
      description:
        formData.description.trim() ||
        "Gym membership plan.",
      status: "Active",
      members: 0,
    };

    setPlans((currentPlans) => [
      ...currentPlans,
      newPlan,
    ]);

    closeModal();
  };

  /* =========================================
     DELETE PLAN
  ========================================= */

  const deletePlan = (id: number) => {
    const plan = plans.find(
      (item) => item.id === id
    );

    if (!plan) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete the ${plan.name} membership?`
    );

    if (!confirmed) return;

    setPlans((currentPlans) =>
      currentPlans.filter(
        (item) => item.id !== id
      )
    );
  };

  /* =========================================
     TOGGLE STATUS
  ========================================= */

  const toggleStatus = (id: number) => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              status:
                plan.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : plan
      )
    );
  };

  /* =========================================
     FORMAT PRICE
  ========================================= */

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(
      price
    );
  };

  return (
    <div className="space-y-8">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

        <div>
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <CreditCard
                size={21}
                className="text-blue-400"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold tracking-tight text-white">
                Memberships
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create and manage gym membership plans.
              </p>

            </div>

          </div>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
        >
          <Plus size={18} />

          Add Membership
        </button>

      </div>

      {/* =========================================
          STATISTICS
      ========================================= */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL PLANS */}

        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] p-5 transition hover:-translate-y-1 hover:border-blue-500/20">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-500/5 blur-3xl" />

          <div className="relative flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Plans
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {plans.length}
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <CreditCard size={21} />
            </div>

          </div>

          <div className="mt-5 h-px bg-white/5" />

          <p className="mt-3 text-xs text-slate-600">
            All membership plans
          </p>

        </div>

        {/* ACTIVE PLANS */}

        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] p-5 transition hover:-translate-y-1 hover:border-emerald-500/20">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-500/5 blur-3xl" />

          <div className="relative flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Active Plans
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {activePlans}
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={21} />
            </div>

          </div>

          <div className="mt-5 h-px bg-white/5" />

          <p className="mt-3 text-xs text-slate-600">
            Currently available plans
          </p>

        </div>

        {/* MEMBERS */}

        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] p-5 transition hover:-translate-y-1 hover:border-violet-500/20">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet-500/5 blur-3xl" />

          <div className="relative flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Members on Plans
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {totalMembers}
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <Users size={21} />
            </div>

          </div>

          <div className="mt-5 h-px bg-white/5" />

          <p className="mt-3 text-xs text-slate-600">
            Members using memberships
          </p>

        </div>

        {/* REVENUE */}

        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] p-5 transition hover:-translate-y-1 hover:border-amber-500/20">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-500/5 blur-3xl" />

          <div className="relative flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Plan Revenue
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {formatPrice(totalRevenue)}
                <span className="ml-1 text-sm font-medium text-slate-500">
                  ETB
                </span>
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <Wallet size={21} />
            </div>

          </div>

          <div className="mt-5 h-px bg-white/5" />

          <p className="mt-3 text-xs text-slate-600">
            Estimated membership value
          </p>

        </div>

      </div>

      {/* =========================================
          SEARCH + FILTER
      ========================================= */}

      <div className="rounded-2xl border border-white/5 bg-[#0D131D] p-4">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* SEARCH */}

          <div className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-[#111925] px-4 py-3 lg:max-w-md">

            <Search
              size={18}
              className="shrink-0 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search membership plans..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
            />

          </div>

          {/* FILTERS */}

          <div className="flex items-center gap-2">

            {(
              ["All", "Active", "Inactive"] as const
            ).map((item) => (

              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                    : "bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* RESULTS */}

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">

          <p className="text-xs text-slate-600">

            Showing{" "}

            <span className="font-medium text-slate-400">
              {filteredPlans.length}
            </span>

            {" "}of{" "}

            <span className="font-medium text-slate-400">
              {plans.length}
            </span>

            {" "}plans

          </p>

          {(search || filter !== "All") && (

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              Clear filters
            </button>

          )}

        </div>

      </div>

      {/* =========================================
          MEMBERSHIP CARDS
      ========================================= */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {filteredPlans.map((plan) => (

          <div
            key={plan.id}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] transition duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5"
          >

            {/* TOP LINE */}

            <div
              className={`h-1 ${
                plan.status === "Active"
                  ? "bg-blue-500"
                  : "bg-slate-600"
              }`}
            />

            <div className="p-6">

              {/* HEADER */}

              <div className="flex items-start justify-between gap-3">

                <div>

                  <div className="flex items-center gap-2">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                      <CreditCard
                        size={17}
                        className="text-blue-400"
                      />
                    </div>

                    <h2 className="text-xl font-bold text-white">
                      {plan.name}
                    </h2>

                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {plan.description ||
                      "Gym membership plan."}
                  </p>

                </div>

                {/* STATUS */}

                <button
                  type="button"
                  onClick={() =>
                    toggleStatus(plan.id)
                  }
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    plan.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20"
                  }`}
                >

                  {plan.status === "Active" ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    <XCircle size={13} />
                  )}

                  {plan.status}

                </button>

              </div>

              {/* PRICE */}

              <div className="mt-7">

                <span className="text-3xl font-bold text-white">
                  {formatPrice(plan.price)}
                </span>

                <span className="ml-2 text-sm font-medium text-slate-500">
                  ETB
                </span>

              </div>

              {/* DETAILS */}

              <div className="mt-6 space-y-3 border-t border-white/5 pt-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3 text-sm text-slate-500">

                    <Clock
                      size={17}
                      className="text-blue-400"
                    />

                    <span>
                      Duration
                    </span>

                  </div>

                  <span className="text-sm font-medium text-slate-300">
                    {plan.duration}{" "}
                    {plan.durationType}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3 text-sm text-slate-500">

                    <Users
                      size={17}
                      className="text-violet-400"
                    />

                    <span>
                      Members
                    </span>

                  </div>

                  <span className="text-sm font-medium text-slate-300">
                    {plan.members}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3 text-sm text-slate-500">

                    <CalendarDays
                      size={17}
                      className="text-emerald-400"
                    />

                    <span>
                      Status
                    </span>

                  </div>

                  <span
                    className={`text-sm font-medium ${
                      plan.status === "Active"
                        ? "text-emerald-400"
                        : "text-slate-500"
                    }`}
                  >
                    {plan.status}
                  </span>

                </div>

              </div>

              {/* MEMBERS PROGRESS */}

              <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-xs text-slate-600">
                    Members using plan
                  </span>

                  <span className="text-xs font-medium text-slate-500">
                    {plan.members}
                  </span>

                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">

                  <div
                    className="h-full rounded-full bg-blue-500 transition-all"
                    style={{
                      width: `${Math.min(
                        plan.members,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

              {/* ACTIONS */}

              <div className="mt-6 flex gap-3">

                <button
                  type="button"
                  onClick={() =>
                    openEditModal(plan)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  <Pencil size={16} />

                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deletePlan(plan.id)
                  }
                  className="flex items-center justify-center rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-2.5 text-red-400 transition hover:bg-red-500/10"
                >
                  <Trash2 size={17} />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* =========================================
          EMPTY STATE
      ========================================= */}

      {filteredPlans.length === 0 && (

        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0D131D] py-16 text-center">

          <CreditCard
            size={42}
            className="mx-auto text-slate-700"
          />

          <h3 className="mt-4 text-lg font-semibold text-white">
            No membership plans found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try another search or create a new membership plan.
          </p>

          <button
            type="button"
            onClick={openAddModal}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <Plus size={17} />
            Add Membership
          </button>

        </div>

      )}

      {/* =========================================
          ADD / EDIT MODAL
      ========================================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#0D131D] shadow-2xl shadow-black/50">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                    <CreditCard
                      size={19}
                      className="text-blue-400"
                    />
                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-white">
                      {editingPlan
                        ? "Edit Membership"
                        : "Add Membership"}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {editingPlan
                        ? "Update membership plan details."
                        : "Create a new gym membership plan."}
                    </p>

                  </div>

                </div>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* NAME */}

              <div>

                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Plan Name
                </label>

                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      name: event.target.value,
                    })
                  }
                  placeholder="e.g. Premium"
                  className="w-full rounded-xl border border-white/5 bg-[#111925] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                />

              </div>

              {/* DURATION */}

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Duration
                  </label>

                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.duration}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        duration: Number(
                          event.target.value
                        ),
                      })
                    }
                    className="w-full rounded-xl border border-white/5 bg-[#111925] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Duration Type
                  </label>

                  <select
                    value={formData.durationType}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        durationType:
                          event.target.value as
                            | "Days"
                            | "Months"
                            | "Years",
                      })
                    }
                    className="w-full rounded-xl border border-white/5 bg-[#111925] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                  >

                    <option value="Days">
                      Days
                    </option>

                    <option value="Months">
                      Months
                    </option>

                    <option value="Years">
                      Years
                    </option>

                  </select>

                </div>

              </div>

              {/* PRICE */}

              <div>

                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Price (ETB)
                </label>

                <div className="relative">

                  <Wallet
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                  />

                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        price: event.target.value,
                      })
                    }
                    placeholder="e.g. 2500"
                    className="w-full rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      description:
                        event.target.value,
                    })
                  }
                  placeholder="Describe this membership..."
                  className="w-full resize-none rounded-xl border border-white/5 bg-[#111925] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-white/5 pt-5">

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
                >
                  {editingPlan
                    ? "Save Changes"
                    : "Create Membership"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Memberships;