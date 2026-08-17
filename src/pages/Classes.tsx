import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  CalendarDays,
  Clock,
  Users,
  UserRound,
  MapPin,
  Edit,
  Trash2,
  X,
  Dumbbell,
} from "lucide-react";

interface Trainer {
  id: number | string;
  name?: string;
  fullName?: string;
}

interface Member {
  id: number | string;
  name?: string;
  fullName?: string;
}

interface GymClass {
  id: number;
  name: string;
  trainerId: number | string | null;
  trainerName: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  room: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  enrolledMembers: Array<number | string>;
}

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

const Classes = () => {
  /* ================================
     MEMBERS
  ================================= */

  const [members] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem("gym_members");

      if (!saved) return [];

      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  /* ================================
     TRAINERS
  ================================= */

  const [trainers] = useState<Trainer[]>(() => {
    try {
      const saved = localStorage.getItem("gym_trainers");

      if (!saved) return [];

      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  /* ================================
     CLASSES
  ================================= */

  const [classes, setClasses] = useState<GymClass[]>(() => {
    try {
      const saved = localStorage.getItem("gym_classes");

      if (!saved) return [];

      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  /* ================================
     STATES
  ================================= */

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingClass, setEditingClass] =
    useState<GymClass | null>(null);

  const [showMembersModal, setShowMembersModal] =
    useState(false);

  const [selectedClass, setSelectedClass] =
    useState<GymClass | null>(null);

  const [memberSearch, setMemberSearch] = useState("");

  /* ================================
     FORM
  ================================= */

  const [formData, setFormData] = useState({
    name: "",
    trainerId: "",
    date: getToday(),
    startTime: "08:00",
    endTime: "09:00",
    capacity: "20",
    room: "",
    status: "Scheduled",
  });

  /* ================================
     SAVE
  ================================= */

  const saveClasses = (newClasses: GymClass[]) => {
    setClasses(newClasses);

    localStorage.setItem(
      "gym_classes",
      JSON.stringify(newClasses)
    );
  };

  /* ================================
     HELPERS
  ================================= */

  const getTrainerName = (trainer: Trainer) => {
    return trainer.name || trainer.fullName || "Unknown Trainer";
  };

  const getMemberName = (member: Member) => {
    return member.name || member.fullName || "Unknown Member";
  };

  /* ================================
     FILTER
  ================================= */

  const filteredClasses = useMemo(() => {
    return classes.filter((gymClass) =>
      gymClass.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [classes, search]);

  const filteredMembers = members.filter((member) =>
    getMemberName(member)
      .toLowerCase()
      .includes(memberSearch.toLowerCase())
  );

  /* ================================
     STATISTICS
  ================================= */

  const scheduledCount = classes.filter(
    (gymClass) => gymClass.status === "Scheduled"
  ).length;

  const completedCount = classes.filter(
    (gymClass) => gymClass.status === "Completed"
  ).length;

  const totalCapacity = classes.reduce(
    (total, gymClass) => total + gymClass.capacity,
    0
  );

  /* ================================
     OPEN ADD MODAL
  ================================= */

  const openAddModal = () => {
    setEditingClass(null);

    setFormData({
      name: "",
      trainerId: "",
      date: getToday(),
      startTime: "08:00",
      endTime: "09:00",
      capacity: "20",
      room: "",
      status: "Scheduled",
    });

    setShowModal(true);
  };

  /* ================================
     OPEN EDIT MODAL
  ================================= */

  const openEditModal = (gymClass: GymClass) => {
    setEditingClass(gymClass);

    setFormData({
      name: gymClass.name,
      trainerId: gymClass.trainerId
        ? String(gymClass.trainerId)
        : "",
      date: gymClass.date,
      startTime: gymClass.startTime,
      endTime: gymClass.endTime,
      capacity: String(gymClass.capacity),
      room: gymClass.room,
      status: gymClass.status,
    });

    setShowModal(true);
  };

  /* ================================
     SAVE CLASS
  ================================= */

  const handleSaveClass = () => {
    if (!formData.name.trim()) {
      alert("Please enter a class name.");
      return;
    }

    if (!formData.date) {
      alert("Please select a date.");
      return;
    }

    if (!formData.startTime || !formData.endTime) {
      alert("Please select the class time.");
      return;
    }

    if (!formData.capacity || Number(formData.capacity) <= 0) {
      alert("Please enter a valid capacity.");
      return;
    }

    const selectedTrainer = trainers.find(
      (trainer) =>
        String(trainer.id) === formData.trainerId
    );

    const trainerName = selectedTrainer
      ? getTrainerName(selectedTrainer)
      : "No Trainer Assigned";

    /* EDIT */
    if (editingClass) {
      const updatedClasses = classes.map((gymClass) => {
        if (gymClass.id !== editingClass.id) {
          return gymClass;
        }

        return {
          ...gymClass,
          name: formData.name,
          trainerId: selectedTrainer?.id || null,
          trainerName,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
          capacity: Number(formData.capacity),
          room: formData.room,
          status:
            formData.status as GymClass["status"],
        };
      });

      saveClasses(updatedClasses);
    }

    /* ADD */
    else {
      const newClass: GymClass = {
        id: Date.now(),
        name: formData.name,
        trainerId: selectedTrainer?.id || null,
        trainerName,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        capacity: Number(formData.capacity),
        room: formData.room,
        status:
          formData.status as GymClass["status"],
        enrolledMembers: [],
      };

      saveClasses([...classes, newClass]);
    }

    setShowModal(false);
    setEditingClass(null);
  };

  /* ================================
     DELETE
  ================================= */

  const deleteClass = (classId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmed) return;

    const updatedClasses = classes.filter(
      (gymClass) => gymClass.id !== classId
    );

    saveClasses(updatedClasses);
  };

  /* ================================
     OPEN MEMBERS
  ================================= */

  const openMembersModal = (gymClass: GymClass) => {
    setSelectedClass(gymClass);
    setMemberSearch("");
    setShowMembersModal(true);
  };

  /* ================================
     ENROLL / REMOVE MEMBER
  ================================= */

  const toggleMember = (memberId: number | string) => {
    if (!selectedClass) return;

    const isEnrolled =
      selectedClass.enrolledMembers.includes(memberId);

    if (!isEnrolled) {
      if (
        selectedClass.enrolledMembers.length >=
        selectedClass.capacity
      ) {
        alert("This class is already full.");
        return;
      }
    }

    const updatedMembers = isEnrolled
      ? selectedClass.enrolledMembers.filter(
          (id) => id !== memberId
        )
      : [...selectedClass.enrolledMembers, memberId];

    const updatedClass = {
      ...selectedClass,
      enrolledMembers: updatedMembers,
    };

    const updatedClasses = classes.map((gymClass) =>
      gymClass.id === selectedClass.id
        ? updatedClass
        : gymClass
    );

    saveClasses(updatedClasses);

    setSelectedClass(updatedClass);
  };

  /* ================================
     RENDER
  ================================= */

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ================================
          HEADER
      ================================= */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-sm font-medium text-violet-600">
            Gym Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Classes
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Schedule and manage gym classes.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
        >
          <Plus size={19} />
          Add Class
        </button>

      </div>

      {/* ================================
          STATISTICS
      ================================= */}

      <div className="mb-8 grid gap-4 md:grid-cols-3">

        {/* SCHEDULED */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Scheduled Classes
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {scheduledCount}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <CalendarDays size={21} />
            </div>

          </div>

        </div>

        {/* COMPLETED */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Completed Classes
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {completedCount}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <Dumbbell size={21} />
            </div>

          </div>

        </div>

        {/* CAPACITY */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Capacity
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalCapacity}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Users size={21} />
            </div>

          </div>

        </div>

      </div>

      {/* ================================
          SEARCH
      ================================= */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="relative">

          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search classes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />

        </div>

      </div>

      {/* ================================
          CLASS TABLE
      ================================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 px-6 py-5">

          <h2 className="font-semibold text-slate-900">
            Class Schedule
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your gym's scheduled classes.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead>

              <tr className="border-b border-slate-100 bg-slate-50">

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Trainer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Schedule
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Room
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Capacity
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredClasses.map((gymClass) => (

                <tr
                  key={gymClass.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >

                  {/* CLASS */}

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                        <Dumbbell size={19} />
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-900">
                          {gymClass.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          ID: {gymClass.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* TRAINER */}

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <UserRound
                        size={16}
                        className="text-slate-400"
                      />

                      {gymClass.trainerName}

                    </div>

                  </td>

                  {/* SCHEDULE */}

                  <td className="px-6 py-4">

                    <div>

                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">

                        <CalendarDays
                          size={15}
                          className="text-violet-500"
                        />

                        {gymClass.date}

                      </div>

                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">

                        <Clock size={14} />

                        {gymClass.startTime} -{" "}
                        {gymClass.endTime}

                      </div>

                    </div>

                  </td>

                  {/* ROOM */}

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <MapPin
                        size={15}
                        className="text-slate-400"
                      />

                      {gymClass.room || "Not assigned"}

                    </div>

                  </td>

                  {/* CAPACITY */}

                  <td className="px-6 py-4">

                    <button
                      type="button"
                      onClick={() =>
                        openMembersModal(gymClass)
                      }
                      className="group text-left"
                    >

                      <p className="text-sm font-semibold text-slate-900">
                        {gymClass.enrolledMembers.length} /{" "}
                        {gymClass.capacity}
                      </p>

                      <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className="h-full rounded-full bg-violet-500"
                          style={{
                            width: `${Math.min(
                              (gymClass.enrolledMembers
                                .length /
                                gymClass.capacity) *
                                100,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </button>

                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        gymClass.status ===
                        "Scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : gymClass.status ===
                            "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {gymClass.status}
                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          openMembersModal(gymClass)
                        }
                        className="rounded-lg p-2 text-slate-400 hover:bg-violet-50 hover:text-violet-600"
                        title="Manage members"
                      >
                        <Users size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(gymClass)
                        }
                        className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                        title="Edit class"
                      >
                        <Edit size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteClass(gymClass.id)
                        }
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                        title="Delete class"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* EMPTY */}

        {filteredClasses.length === 0 && (

          <div className="px-6 py-16 text-center">

            <CalendarDays
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No classes found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Create your first gym class.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Add Class
            </button>

          </div>

        )}

      </div>

      {/* =====================================================
          ADD / EDIT CLASS MODAL
      ====================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  {editingClass
                    ? "Edit Class"
                    : "Create Class"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingClass
                    ? "Update class information."
                    : "Create a new gym class."}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <div className="space-y-5 p-6">

              {/* CLASS NAME */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Class Name
                </label>

                <input
                  type="text"
                  placeholder="Example: Morning Yoga"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
                />

              </div>

              {/* TRAINER */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Trainer
                </label>

                <select
                  value={formData.trainerId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      trainerId: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
                >

                  <option value="">
                    No Trainer Assigned
                  </option>

                  {trainers.map((trainer) => (

                    <option
                      key={trainer.id}
                      value={trainer.id}
                    >
                      {getTrainerName(trainer)}
                    </option>

                  ))}

                </select>

                {trainers.length === 0 && (
                  <p className="mt-2 text-xs text-orange-500">
                    No trainers found. You can assign a trainer later.
                  </p>
                )}

              </div>

              {/* DATE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Date
                </label>

                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
                />

              </div>

              {/* TIME */}

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Start Time
                  </label>

                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startTime: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    End Time
                  </label>

                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endTime: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
                  />

                </div>

              </div>

              {/* CAPACITY */}

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Capacity
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
                  />

                </div>

                {/* ROOM */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Room
                  </label>

                  <input
                    type="text"
                    placeholder="Room A"
                    value={formData.room}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        room: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
                  />

                </div>

              </div>

              {/* STATUS */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
                >

                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Cancelled</option>

                </select>

              </div>

              {/* BUTTONS */}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveClass}
                  className="flex-1 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  {editingClass
                    ? "Update Class"
                    : "Create Class"}
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          MANAGE MEMBERS MODAL
      ====================================================== */}

      {showMembersModal && selectedClass && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Class Members
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedClass.name}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowMembersModal(false)
                }
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6">

              {/* CAPACITY */}

              <div className="mb-4 rounded-xl bg-violet-50 p-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm font-medium text-violet-700">
                    Class Capacity
                  </span>

                  <span className="text-sm font-bold text-violet-700">
                    {selectedClass.enrolledMembers.length} /{" "}
                    {selectedClass.capacity}
                  </span>

                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-violet-100">

                  <div
                    className="h-full rounded-full bg-violet-600"
                    style={{
                      width: `${Math.min(
                        (selectedClass
                          .enrolledMembers.length /
                          selectedClass.capacity) *
                          100,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

              {/* SEARCH */}

              <div className="relative mb-4">

                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search members..."
                  value={memberSearch}
                  onChange={(e) =>
                    setMemberSearch(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-violet-500"
                />

              </div>

              {/* MEMBERS */}

              <div className="max-h-72 space-y-2 overflow-y-auto">

                {filteredMembers.map((member) => {

                  const enrolled =
                    selectedClass.enrolledMembers.includes(
                      member.id
                    );

                  return (

                    <button
                      key={member.id}
                      type="button"
                      onClick={() =>
                        toggleMember(member.id)
                      }
                      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                        enrolled
                          ? "border-green-200 bg-green-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600">
                          {getMemberName(member)
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <p className="text-sm font-semibold text-slate-900">
                            {getMemberName(member)}
                          </p>

                          <p className="text-xs text-slate-400">
                            Member ID: {member.id}
                          </p>

                        </div>

                      </div>

                      {enrolled ? (

                        <span className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                          Enrolled
                        </span>

                      ) : (

                        <span className="rounded-lg bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700">
                          Add
                        </span>

                      )}

                    </button>

                  );
                })}

                {filteredMembers.length === 0 && (

                  <div className="py-10 text-center">

                    <Users
                      size={36}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-medium text-slate-700">
                      No members found
                    </p>

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Classes;