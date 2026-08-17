import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  UserRound,
  Mail,
  Phone,
  Dumbbell,
  CalendarDays,
  Award,
} from "lucide-react";

interface Trainer {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  status: "Active" | "Inactive";
  joinDate: string;
  avatar: string;
}

const initialTrainers: Trainer[] = [
  {
    id: 1,
    name: "Abebe Kebede",
    email: "abebe@example.com",
    phone: "+251 911 234 567",
    specialization: "Strength Training",
    experience: 6,
    status: "Active",
    joinDate: "2023-01-15",
    avatar: "AK",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    email: "sara@example.com",
    phone: "+251 922 345 678",
    specialization: "Yoga & Flexibility",
    experience: 4,
    status: "Active",
    joinDate: "2024-02-10",
    avatar: "SA",
  },
  {
    id: 3,
    name: "Daniel Abraham",
    email: "daniel@example.com",
    phone: "+251 933 456 789",
    specialization: "Personal Training",
    experience: 8,
    status: "Active",
    joinDate: "2022-06-20",
    avatar: "DA",
  },
  {
    id: 4,
    name: "Marta Bekele",
    email: "marta@example.com",
    phone: "+251 944 567 890",
    specialization: "Cardio Training",
    experience: 3,
    status: "Inactive",
    joinDate: "2024-08-05",
    avatar: "MB",
  },
  {
    id: 5,
    name: "Liya Worku",
    email: "liya@example.com",
    phone: "+251 955 678 901",
    specialization: "Nutrition & Fitness",
    experience: 5,
    status: "Active",
    joinDate: "2023-09-12",
    avatar: "LW",
  },
];

const Trainers = () => {
  /* =========================================
     TRAINER DATA
  ========================================= */

  const [trainers, setTrainers] = useState<Trainer[]>(() => {
    const savedTrainers =
      localStorage.getItem("gym_trainers");

    if (savedTrainers) {
      try {
        return JSON.parse(savedTrainers) as Trainer[];
      } catch {
        return initialTrainers;
      }
    }

    return initialTrainers;
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

  const [editingTrainer, setEditingTrainer] =
    useState<Trainer | null>(null);

  /* =========================================
     FORM
  ========================================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: 1,
    joinDate: "",
  });

  /* =========================================
     SAVE TO LOCAL STORAGE
  ========================================= */

  useEffect(() => {
    localStorage.setItem(
      "gym_trainers",
      JSON.stringify(trainers)
    );
  }, [trainers]);

  /* =========================================
     FILTER TRAINERS
  ========================================= */

  const filteredTrainers = useMemo(() => {
    return trainers.filter((trainer) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        trainer.name
          .toLowerCase()
          .includes(searchValue) ||
        trainer.email
          .toLowerCase()
          .includes(searchValue) ||
        trainer.specialization
          .toLowerCase()
          .includes(searchValue) ||
        trainer.phone
          .toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        filter === "All" ||
        trainer.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [trainers, search, filter]);

  /* =========================================
     STATISTICS
  ========================================= */

  const activeTrainers = trainers.filter(
    (trainer) => trainer.status === "Active"
  ).length;

  const inactiveTrainers = trainers.filter(
    (trainer) => trainer.status === "Inactive"
  ).length;

  const totalExperience = trainers.reduce(
    (total, trainer) =>
      total + trainer.experience,
    0
  );

  const averageExperience =
    trainers.length > 0
      ? (
          totalExperience / trainers.length
        ).toFixed(1)
      : "0";

  /* =========================================
     OPEN ADD MODAL
  ========================================= */

  const openAddModal = () => {
    setEditingTrainer(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      experience: 1,
      joinDate: "",
    });

    setShowModal(true);
  };

  /* =========================================
     OPEN EDIT MODAL
  ========================================= */

  const openEditModal = (trainer: Trainer) => {
    setEditingTrainer(trainer);

    setFormData({
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone,
      specialization:
        trainer.specialization,
      experience: trainer.experience,
      joinDate: trainer.joinDate,
    });

    setShowModal(true);
  };

  /* =========================================
     CLOSE MODAL
  ========================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingTrainer(null);
  };

  /* =========================================
     GENERATE AVATAR
  ========================================= */

  const generateAvatar = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
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
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.specialization.trim() ||
      !formData.joinDate
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.experience < 0) {
      alert(
        "Experience cannot be negative."
      );
      return;
    }

    /* EDIT TRAINER */

    if (editingTrainer) {
      setTrainers((currentTrainers) =>
        currentTrainers.map((trainer) =>
          trainer.id === editingTrainer.id
            ? {
                ...trainer,
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                specialization:
                  formData.specialization.trim(),
                experience:
                  Number(formData.experience),
                joinDate: formData.joinDate,
                avatar: generateAvatar(
                  formData.name
                ),
              }
            : trainer
        )
      );

      closeModal();
      return;
    }

    /* ADD TRAINER */

    const newTrainer: Trainer = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      specialization:
        formData.specialization.trim(),
      experience:
        Number(formData.experience),
      status: "Active",
      joinDate: formData.joinDate,
      avatar: generateAvatar(
        formData.name
      ),
    };

    setTrainers((currentTrainers) => [
      newTrainer,
      ...currentTrainers,
    ]);

    closeModal();
  };

  /* =========================================
     DELETE TRAINER
  ========================================= */

  const deleteTrainer = (id: number) => {
    const trainer = trainers.find(
      (item) => item.id === id
    );

    if (!trainer) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${trainer.name}?`
    );

    if (!confirmed) return;

    setTrainers((currentTrainers) =>
      currentTrainers.filter(
        (item) => item.id !== id
      )
    );
  };

  /* =========================================
     TOGGLE STATUS
  ========================================= */

  const toggleStatus = (id: number) => {
    setTrainers((currentTrainers) =>
      currentTrainers.map((trainer) =>
        trainer.id === id
          ? {
              ...trainer,
              status:
                trainer.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : trainer
      )
    );
  };

  /* =========================================
     FORMAT DATE
  ========================================= */

  const formatDate = (date: string) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
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
              <Dumbbell
                size={21}
                className="text-blue-400"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold tracking-tight text-white">
                Trainers
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your gym trainers and fitness coaches.
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

          Add Trainer
        </button>

      </div>

      {/* =========================================
          STATISTICS
      ========================================= */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL TRAINERS */}

        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] p-5 transition hover:-translate-y-1 hover:border-blue-500/20">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-500/5 blur-3xl" />

          <div className="relative flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Trainers
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {trainers.length}
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Dumbbell size={21} />
            </div>

          </div>

          <div className="mt-5 h-px bg-white/5" />

          <p className="mt-3 text-xs text-slate-600">
            All registered trainers
          </p>

        </div>

        {/* ACTIVE */}

        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] p-5 transition hover:-translate-y-1 hover:border-emerald-500/20">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-500/5 blur-3xl" />

          <div className="relative flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Active Trainers
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {activeTrainers}
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={21} />
            </div>

          </div>

          <div className="mt-5 h-px bg-white/5" />

          <p className="mt-3 text-xs text-slate-600">
            Currently available trainers
          </p>

        </div>

        {/* INACTIVE */}

        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] p-5 transition hover:-translate-y-1 hover:border-red-500/20">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-500/5 blur-3xl" />

          <div className="relative flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Inactive Trainers
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {inactiveTrainers}
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <XCircle size={21} />
            </div>

          </div>

          <div className="mt-5 h-px bg-white/5" />

          <p className="mt-3 text-xs text-slate-600">
            Currently unavailable trainers
          </p>

        </div>

        {/* EXPERIENCE */}

        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] p-5 transition hover:-translate-y-1 hover:border-violet-500/20">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet-500/5 blur-3xl" />

          <div className="relative flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Avg. Experience
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {averageExperience}

                <span className="ml-1 text-sm font-medium text-slate-500">
                  yrs
                </span>

              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <Award size={21} />
            </div>

          </div>

          <div className="mt-5 h-px bg-white/5" />

          <p className="mt-3 text-xs text-slate-600">
            Average trainer experience
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
              placeholder="Search trainers..."
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
              {filteredTrainers.length}
            </span>

            {" "}of{" "}

            <span className="font-medium text-slate-400">
              {trainers.length}
            </span>

            {" "}trainers

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
          TRAINER CARDS
      ========================================= */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {filteredTrainers.map((trainer) => (

          <div
            key={trainer.id}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D131D] transition duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5"
          >

            {/* TOP ACCENT */}

            <div
              className={`h-1 ${
                trainer.status === "Active"
                  ? "bg-blue-500"
                  : "bg-slate-600"
              }`}
            />

            <div className="p-6">

              {/* HEADER */}

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/10 text-sm font-bold text-blue-400 ring-1 ring-blue-500/10">
                    {trainer.avatar}
                  </div>

                  <div>

                    <h2 className="font-bold text-white">
                      {trainer.name}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {trainer.specialization}
                    </p>

                  </div>

                </div>

                {/* STATUS */}

                <button
                  type="button"
                  onClick={() =>
                    toggleStatus(trainer.id)
                  }
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    trainer.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20"
                  }`}
                >

                  {trainer.status === "Active" ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    <XCircle size={13} />
                  )}

                  {trainer.status}

                </button>

              </div>

              {/* SPECIALIZATION */}

              <div className="mt-6 rounded-xl border border-blue-500/10 bg-blue-500/[0.03] p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                    <Dumbbell
                      size={17}
                      className="text-blue-400"
                    />
                  </div>

                  <div>

                    <p className="text-[11px] text-slate-600">
                      Specialization
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-300">
                      {trainer.specialization}
                    </p>

                  </div>

                </div>

              </div>

              {/* DETAILS */}

              <div className="mt-5 space-y-3 border-t border-white/5 pt-5">

                <div className="flex items-center gap-3">

                  <Mail
                    size={16}
                    className="text-slate-600"
                  />

                  <span className="truncate text-sm text-slate-500">
                    {trainer.email}
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Phone
                    size={16}
                    className="text-slate-600"
                  />

                  <span className="text-sm text-slate-500">
                    {trainer.phone}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <Award
                      size={16}
                      className="text-violet-400"
                    />

                    <span className="text-sm text-slate-500">
                      Experience
                    </span>

                  </div>

                  <span className="text-sm font-medium text-slate-300">
                    {trainer.experience}{" "}
                    {trainer.experience === 1
                      ? "year"
                      : "years"}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <CalendarDays
                      size={16}
                      className="text-emerald-400"
                    />

                    <span className="text-sm text-slate-500">
                      Joined
                    </span>

                  </div>

                  <span className="text-sm font-medium text-slate-300">
                    {formatDate(
                      trainer.joinDate
                    )}
                  </span>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="mt-6 flex gap-3">

                <button
                  type="button"
                  onClick={() =>
                    openEditModal(trainer)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  <Pencil size={16} />

                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteTrainer(trainer.id)
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

      {filteredTrainers.length === 0 && (

        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0D131D] py-16 text-center">

          <UserRound
            size={42}
            className="mx-auto text-slate-700"
          />

          <h3 className="mt-4 text-lg font-semibold text-white">
            No trainers found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try another search or add a new trainer.
          </p>

          <button
            type="button"
            onClick={openAddModal}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <Plus size={17} />

            Add Trainer
          </button>

        </div>

      )}

      {/* =========================================
          ADD / EDIT MODAL
      ========================================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0D131D] shadow-2xl shadow-black/50">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                  <UserRound
                    size={19}
                    className="text-blue-400"
                  />
                </div>

                <div>

                  <h2 className="text-lg font-bold text-white">
                    {editingTrainer
                      ? "Edit Trainer"
                      : "Add Trainer"}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {editingTrainer
                      ? "Update trainer information."
                      : "Add a new trainer to your gym."}
                  </p>

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
                  Full Name
                </label>

                <div className="relative">

                  <UserRound
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                  />

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
                    placeholder="Enter trainer name"
                    className="w-full rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              {/* EMAIL + PHONE */}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Email
                  </label>

                  <div className="relative">

                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          email: event.target.value,
                        })
                      }
                      placeholder="trainer@example.com"
                      className="w-full rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Phone
                  </label>

                  <div className="relative">

                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          phone: event.target.value,
                        })
                      }
                      placeholder="+251 9XX XXX XXX"
                      className="w-full rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

              </div>

              {/* SPECIALIZATION */}

              <div>

                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Specialization
                </label>

                <div className="relative">

                  <Dumbbell
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                  />

                  <input
                    type="text"
                    required
                    value={
                      formData.specialization
                    }
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        specialization:
                          event.target.value,
                      })
                    }
                    placeholder="e.g. Strength Training"
                    className="w-full rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              {/* EXPERIENCE + JOIN DATE */}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Experience (Years)
                  </label>

                  <div className="relative">

                    <Award
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type="number"
                      min="0"
                      required
                      value={
                        formData.experience
                      }
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          experience:
                            Number(
                              event.target.value
                            ),
                        })
                      }
                      className="w-full rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Join Date
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type="date"
                      required
                      value={
                        formData.joinDate
                      }
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          joinDate:
                            event.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-white/5 bg-[#111925] py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

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
                  {editingTrainer
                    ? "Save Changes"
                    : "Add Trainer"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Trainers;