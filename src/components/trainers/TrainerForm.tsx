
import { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Briefcase,
  Award,
  Calendar,
  UserCheck,
} from "lucide-react";

import type { Trainer } from "../../types";

interface TrainerFormProps {
  onClose: () => void;
  onSave: (newTrainer: Trainer) => void;
}

const TrainerForm = ({
  onClose,
  onSave,
}: TrainerFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] =
    useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState<
    "Active" | "Inactive"
  >("Active");
  const [joinDate, setJoinDate] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !specialization.trim() ||
      !experience ||
      !joinDate
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newTrainer: Trainer = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      specialization: specialization.trim(),
      experience: Number(experience),
      status,
      joinDate,
      avatar: name
        .trim()
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };

    onSave(newTrainer);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 px-6 py-6">

          <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10" />

          <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-white/5" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <X size={20} />
          </button>

          <div className="relative flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
              <User size={25} />
            </div>

            <div>
              <p className="text-sm font-medium text-violet-200">
                Trainer Management
              </p>

              <h2 className="text-2xl font-bold text-white">
                Add New Trainer
              </h2>

              <p className="mt-1 text-sm text-violet-200">
                Create a new trainer profile
              </p>
            </div>

          </div>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[75vh] space-y-6 overflow-y-auto p-6"
        >

          {/* Personal Information */}
          <div>

            <div className="mb-4 flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                <User size={16} />
              </div>

              <h3 className="text-sm font-bold text-slate-800">
                Personal Information
              </h3>

            </div>

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Enter trainer name"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

              </div>
            </div>

            {/* Email + Phone */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="trainer@example.com"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />

                </div>

              </div>

              {/* Phone */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>

                <div className="relative">

                  <Phone
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    placeholder="+251 9XX XXX XXX"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Professional Information */}
          <div>

            <div className="mb-4 flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Briefcase size={16} />
              </div>

              <h3 className="text-sm font-bold text-slate-800">
                Professional Information
              </h3>

            </div>

            {/* Specialization */}
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Specialization
              </label>

              <div className="relative">

                <Briefcase
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={specialization}
                  onChange={(event) =>
                    setSpecialization(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Strength Training"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

              </div>

            </div>

            {/* Experience + Status */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Experience */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Experience
                </label>

                <div className="relative">

                  <Award
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    min="0"
                    value={experience}
                    onChange={(event) =>
                      setExperience(
                        event.target.value
                      )
                    }
                    placeholder="e.g. 5"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />

                </div>

              </div>

              {/* Status */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <div className="relative">

                  <UserCheck
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={status}
                    onChange={(event) =>
                      setStatus(
                        event.target.value as
                          | "Active"
                          | "Inactive"
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>

                </div>

              </div>

            </div>

            {/* Join Date */}
            <div className="mt-4">

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Join Date
              </label>

              <div className="relative">

                <Calendar
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  value={joinDate}
                  onChange={(event) =>
                    setJoinDate(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md"
            >
              Add Trainer
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default TrainerForm;

