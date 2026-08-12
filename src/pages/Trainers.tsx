
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

import TrainerTable from "../components/trainers/TrainerTable";
import TrainerForm from "../components/trainers/TrainerForm";
import TrainerDetails from "../components/trainers/TrainerDetails";
import EditTrainerForm from "../components/trainers/EditTrainerForm";

import { trainers as initialTrainers } from "../data/trainers";
import type { Trainer } from "../types";

const Trainers = () => {
  // =========================================
  // Trainer State
  // =========================================
  const [trainerList, setTrainerList] =
    useState<Trainer[]>(initialTrainers);

  // =========================================
  // Search / Filter State
  // =========================================
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  // =========================================
  // Modal State
  // =========================================
  const [showForm, setShowForm] = useState(false);

  const [selectedTrainer, setSelectedTrainer] =
    useState<Trainer | null>(null);

  const [editingTrainer, setEditingTrainer] =
    useState<Trainer | null>(null);

  // =========================================
  // Filter Trainers
  // =========================================
  const filteredTrainers = useMemo(() => {
    return trainerList.filter((trainer) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        trainer.name
          .toLowerCase()
          .includes(searchValue) ||
        trainer.email
          .toLowerCase()
          .includes(searchValue) ||
        trainer.phone
          .toLowerCase()
          .includes(searchValue) ||
        trainer.specialization
          .toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        filter === "All" ||
        trainer.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [trainerList, search, filter]);

  // =========================================
  // Statistics
  // =========================================
  const activeTrainers = trainerList.filter(
    (trainer) => trainer.status === "Active"
  ).length;

  const inactiveTrainers = trainerList.filter(
    (trainer) => trainer.status === "Inactive"
  ).length;

  // =========================================
  // Add Trainer
  // =========================================
  const handleAddTrainer = (newTrainer: Trainer) => {
    setTrainerList((current) => [
      newTrainer,
      ...current,
    ]);

    setShowForm(false);
  };

  // =========================================
  // Edit Trainer
  // =========================================
  const handleEditTrainer = (
    updatedTrainer: Trainer
  ) => {
    setTrainerList((current) =>
      current.map((trainer) =>
        trainer.id === updatedTrainer.id
          ? updatedTrainer
          : trainer
      )
    );

    setEditingTrainer(null);
  };

  // =========================================
  // Delete Trainer
  // =========================================
  const handleDelete = (id: number) => {
    const trainer = trainerList.find(
      (trainer) => trainer.id === id
    );

    if (!trainer) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${trainer.name}?`
    );

    if (!confirmed) return;

    setTrainerList((current) =>
      current.filter(
        (trainer) => trainer.id !== id
      )
    );

    // Close View modal if this trainer was selected
    if (selectedTrainer?.id === id) {
      setSelectedTrainer(null);
    }

    // Close Edit modal if this trainer was being edited
    if (editingTrainer?.id === id) {
      setEditingTrainer(null);
    }
  };

  return (
    <div className="space-y-8">

      {/* =========================================
          Page Header
      ========================================= */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Trainers
          </h1>

          <p className="mt-1 text-slate-500">
            Manage your gym trainers and their information.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
        >
          <Plus size={19} />
          Add Trainer
        </button>

      </div>

      {/* =========================================
          Statistics
      ========================================= */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Users size={23} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Trainers
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {trainerList.length}
              </p>
            </div>

          </div>
        </div>

        {/* Active */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <UserCheck size={23} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Active Trainers
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {activeTrainers}
              </p>
            </div>

          </div>
        </div>

        {/* Inactive */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <UserX size={23} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Inactive Trainers
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {inactiveTrainers}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* =========================================
          Search and Filter
      ========================================= */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

        {/* Search */}
        <div className="flex w-full items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 md:max-w-md">

          <Search
            size={19}
            className="text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search trainers..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />

        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">

          {(
            ["All", "Active", "Inactive"] as const
          ).map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === item
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* =========================================
          Trainer Table
      ========================================= */}
      <TrainerTable
        trainers={filteredTrainers}
        onView={(trainer) =>
          setSelectedTrainer(trainer)
        }
        onEdit={(trainer) =>
          setEditingTrainer(trainer)
        }
        onDelete={handleDelete}
      />

      {/* =========================================
          Add Trainer
      ========================================= */}
      {showForm && (
        <TrainerForm
          onClose={() => setShowForm(false)}
          onSave={handleAddTrainer}
        />
      )}

      {/* =========================================
          Trainer Details
      ========================================= */}
      {selectedTrainer && (
        <TrainerDetails
          trainer={selectedTrainer}
          onClose={() =>
            setSelectedTrainer(null)
          }
        />
      )}

      {/* =========================================
          Edit Trainer
      ========================================= */}
      {editingTrainer && (
        <EditTrainerForm
          trainer={editingTrainer}
          onClose={() =>
            setEditingTrainer(null)
          }
          onSave={handleEditTrainer}
        />
      )}

    </div>
  );
};

export default Trainers;
