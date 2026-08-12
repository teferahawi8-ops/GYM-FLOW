
import { useState } from "react";
import { X } from "lucide-react";

import type { Trainer } from "../../types";

interface EditTrainerFormProps {
  trainer: Trainer;
  onClose: () => void;
  onSave: (updatedTrainer: Trainer) => void;
}

const EditTrainerForm = ({
  trainer,
  onClose,
  onSave,
}: EditTrainerFormProps) => {
  const [name, setName] = useState(trainer.name);
  const [email, setEmail] = useState(trainer.email);
  const [phone, setPhone] = useState(trainer.phone);

  const [specialization, setSpecialization] =
    useState(trainer.specialization);

  const [experience, setExperience] = useState(
    String(trainer.experience)
  );

  const [status, setStatus] = useState<
    "Active" | "Inactive"
  >(trainer.status);

  const [joinDate, setJoinDate] = useState(
    trainer.joinDate
  );

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

    const updatedTrainer: Trainer = {
      ...trainer,

      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),

      specialization:
        specialization.trim(),

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

    onSave(updatedTrainer);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Edit Trainer
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update trainer information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>

          </div>

          {/* Specialization */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Specialization
            </label>

            <input
              type="text"
              value={specialization}
              onChange={(event) =>
                setSpecialization(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Experience + Status */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Experience (Years)
              </label>

              <input
                type="number"
                min="0"
                value={experience}
                onChange={(event) =>
                  setExperience(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as
                      | "Active"
                      | "Inactive"
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
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

          {/* Join Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Join Date
            </label>

            <input
              type="date"
              value={joinDate}
              onChange={(event) =>
                setJoinDate(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditTrainerForm;

