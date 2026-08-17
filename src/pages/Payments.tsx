import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Wallet,
  CheckCircle2,
  Clock,
  Trash2,
  X,
  User,
  CreditCard,
  Banknote,
  Smartphone,
} from "lucide-react";

interface Member {
  id: number | string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

interface Payment {
  id: number;
  memberId: number | string;
  memberName: string;
  amount: number;
  date: string;
  method: "Cash" | "Bank Transfer" | "Mobile Money" | "Card";
  status: "Paid" | "Pending";
  description: string;
}

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

const Payments = () => {
  const [members] = useState<Member[]>(() => {
    try {
      const savedMembers = localStorage.getItem("gym_members");

      if (!savedMembers) {
        return [];
      }

      return JSON.parse(savedMembers);
    } catch {
      return [];
    }
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    try {
      const savedPayments =
        localStorage.getItem("gym_payments");

      if (!savedPayments) {
        return [];
      }

      return JSON.parse(savedPayments);
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [memberSearch, setMemberSearch] = useState("");

  const [formData, setFormData] = useState({
    memberId: "",
    amount: "",
    method: "Cash",
    description: "Membership Payment",
    date: getToday(),
    status: "Paid",
  });

  const savePayments = (newPayments: Payment[]) => {
    setPayments(newPayments);

    localStorage.setItem(
      "gym_payments",
      JSON.stringify(newPayments)
    );
  };

  const getMemberName = (member: Member) => {
    return member.name || member.fullName || "Unknown Member";
  };

  const totalRevenue = useMemo(() => {
    return payments
      .filter((payment) => payment.status === "Paid")
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  const todayRevenue = useMemo(() => {
    return payments
      .filter(
        (payment) =>
          payment.date === getToday() &&
          payment.status === "Paid"
      )
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  const pendingAmount = useMemo(() => {
    return payments
      .filter((payment) => payment.status === "Pending")
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  const filteredPayments = payments.filter((payment) =>
    payment.memberName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredMembers = members.filter((member) =>
    getMemberName(member)
      .toLowerCase()
      .includes(memberSearch.toLowerCase())
  );

  const handleAddPayment = () => {
    if (!formData.memberId) {
      alert("Please select a member.");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    const selectedMember = members.find(
      (member) => String(member.id) === formData.memberId
    );

    if (!selectedMember) {
      alert("Member not found.");
      return;
    }

    const newPayment: Payment = {
      id: Date.now(),
      memberId: selectedMember.id,
      memberName: getMemberName(selectedMember),
      amount: Number(formData.amount),
      date: formData.date,
      method: formData.method as Payment["method"],
      status: formData.status as Payment["status"],
      description: formData.description,
    };

    savePayments([...payments, newPayment]);

    setFormData({
      memberId: "",
      amount: "",
      method: "Cash",
      description: "Membership Payment",
      date: getToday(),
      status: "Paid",
    });

    setMemberSearch("");
    setShowModal(false);
  };

  const deletePayment = (paymentId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmed) return;

    const updatedPayments = payments.filter(
      (payment) => payment.id !== paymentId
    );

    savePayments(updatedPayments);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getMethodIcon = (method: Payment["method"]) => {
    if (method === "Cash") {
      return <Banknote size={16} />;
    }

    if (method === "Mobile Money") {
      return <Smartphone size={16} />;
    }

    return <CreditCard size={16} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-sm font-medium text-violet-600">
            Gym Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Payments
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage membership payments and gym revenue.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
        >
          <Plus size={19} />
          Record Payment
        </button>

      </div>

      {/* STATISTICS */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">

        {/* TOTAL REVENUE */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Revenue
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatAmount(totalRevenue)} ETB
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Wallet size={21} />
            </div>

          </div>

        </div>

        {/* TODAY */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Today's Revenue
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatAmount(todayRevenue)} ETB
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <CheckCircle2 size={21} />
            </div>

          </div>

        </div>

        {/* PENDING */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Pending Payments
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatAmount(pendingAmount)} ETB
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Clock size={21} />
            </div>

          </div>

        </div>

      </div>

      {/* SEARCH */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="relative">

          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search payment by member name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />

        </div>

      </div>

      {/* PAYMENT TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 px-6 py-5">

          <h2 className="font-semibold text-slate-900">
            Payment History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage gym payment transactions.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>

              <tr className="border-b border-slate-100 bg-slate-50">

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Member
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Method
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredPayments.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >

                  {/* MEMBER */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-600">
                        {payment.memberName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-900">
                          {payment.memberName}
                        </p>

                        <p className="text-xs text-slate-400">
                          {payment.description}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-4">

                    <span className="text-sm font-bold text-slate-900">
                      {formatAmount(payment.amount)} ETB
                    </span>

                  </td>

                  {/* METHOD */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      {getMethodIcon(payment.method)}
                      {payment.method}
                    </div>

                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {payment.date}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >

                      {payment.status === "Paid" ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        <Clock size={13} />
                      )}

                      {payment.status}

                    </span>

                  </td>

                  {/* DELETE */}
                  <td className="px-6 py-4 text-right">

                    <button
                      type="button"
                      onClick={() =>
                        deletePayment(payment.id)
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      title="Delete payment"
                    >
                      <Trash2 size={17} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* EMPTY */}
        {filteredPayments.length === 0 && (

          <div className="px-6 py-16 text-center">

            <Wallet
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No payments found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Start by recording a payment from a member.
            </p>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Record Payment
            </button>

          </div>

        )}

      </div>

      {/* ADD PAYMENT MODAL */}
      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Record Payment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new member payment.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            <div className="space-y-5 p-6">

              {/* MEMBER */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Member
                </label>

                <div className="relative mb-2">

                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search member..."
                    value={memberSearch}
                    onChange={(e) =>
                      setMemberSearch(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-violet-500"
                  />

                </div>

                <div className="max-h-36 space-y-2 overflow-y-auto">

                  {filteredMembers.map((member) => {

                    const selected =
                      String(member.id) ===
                      formData.memberId;

                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            memberId: String(
                              member.id
                            ),
                          })
                        }
                        className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                          selected
                            ? "border-violet-500 bg-violet-50"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >

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
                            {member.email ||
                              member.phone ||
                              "Gym Member"}
                          </p>

                        </div>

                      </button>
                    );
                  })}

                </div>

                {members.length === 0 && (
                  <p className="mt-2 text-xs text-red-500">
                    No members found. Add members first.
                  </p>
                )}

              </div>

              {/* AMOUNT */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Amount (ETB)
                </label>

                <div className="relative">

                  <Banknote
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    min="0"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amount: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />

                </div>

              </div>

              {/* METHOD */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Payment Method
                </label>

                <select
                  value={formData.method}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      method: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
                >

                  <option>Cash</option>
                  <option>Bank Transfer</option>
                  <option>Mobile Money</option>
                  <option>Card</option>

                </select>

              </div>

              {/* DATE */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Payment Date
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

              {/* STATUS */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Payment Status
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

                  <option>Paid</option>
                  <option>Pending</option>

                </select>

              </div>

              {/* DESCRIPTION */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
                />

              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleAddPayment}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  <Plus size={17} />
                  Save Payment
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Payments;