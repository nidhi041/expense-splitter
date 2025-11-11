import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useAppContext } from "../context/AppContext";
import { Expense, PersonID } from "../types";

function ExpenseForm() {
  const { state, dispatch } = useAppContext();
  const { people } = state;

  // --- Form State ---
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(people[0]?.id || "");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [splitType, setSplitType] = useState<"equal" | "custom">("equal");
  const [splitBetween, setSplitBetween] = useState<PersonID[]>(people.map((p) => p.id));
  const [customAmounts, setCustomAmounts] = useState<Record<PersonID, string>>({});
  const [message, setMessage] = useState<string | null>(null);

  // --- Helper to toggle inclusion ---
  const toggleSplitMember = (id: PersonID) => {
    setSplitBetween((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // --- Handle submit ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amt = parseFloat(amount);
    if (!description.trim() || isNaN(amt) || amt <= 0 || !paidBy) {
      setMessage("⚠️ Please fill all fields correctly");
      setTimeout(() => setMessage(null), 1500);
      return;
    }

    // Prepare custom splits if needed
    let customSplits: Expense["customSplits"];
    if (splitType === "custom") {
      const totalCustom = splitBetween.reduce(
        (sum, pid) => sum + (parseFloat(customAmounts[pid] || "0") || 0),
        0
      );
      if (Math.abs(totalCustom - amt) > 0.01) {
        setMessage("⚠️ Custom amounts must equal total expense");
        setTimeout(() => setMessage(null), 1500);
        return;
      }
      customSplits = splitBetween.map((pid) => ({
        personId: pid,
        amount: parseFloat(customAmounts[pid]) || 0,
      }));
    }

    const expense: Expense = {
      id: nanoid(),
      description: description.trim(),
      amount: amt,
      paidBy,
      date: new Date(date).toISOString(),
      splitBetween,
      splitType,
      customSplits,
    };

    dispatch({ type: "ADD_EXPENSE", payload: expense });

    // Reset form
    setDescription("");
    setAmount("");
    setPaidBy(people[0]?.id || "");
    setDate(new Date().toISOString().slice(0, 10));
    setSplitType("equal");
    setSplitBetween(people.map((p) => p.id));
    setCustomAmounts({});
    setMessage("✅ Expense added!");
    setTimeout(() => setMessage(null), 1500);
  };

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
      <h2 className="text-gray-700 mb-4 text-2xl border-b-2 border-gray-200 pb-2">
        💸 Add Expense
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-1 text-gray-700 font-medium text-sm"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="What was the expense for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-md text-base focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Amount + Date */}
        <div className="flex gap-4">
          <div className="flex-1 mb-4">
            <label
              htmlFor="amount"
              className="block mb-1 text-gray-700 font-medium text-sm"
            >
              Amount ($)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-md text-base focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex-1 mb-4">
            <label
              htmlFor="date"
              className="block mb-1 text-gray-700 font-medium text-sm"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-md text-base focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Paid By */}
        <div className="mb-4">
          <label
            htmlFor="paidBy"
            className="block mb-1 text-gray-700 font-medium text-sm"
          >
            Paid By
          </label>
          <select
            id="paidBy"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-md text-base focus:outline-none focus:border-indigo-500"
          >
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        {/* Split Type */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Split Type
          </label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer px-1 py-1 rounded transition-colors hover:bg-gray-50">
              <input
                type="radio"
                value="equal"
                checked={splitType === "equal"}
                onChange={() => setSplitType("equal")}
                name="splitType"
                className="cursor-pointer"
              />
              <span>Equal Split</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer px-1 py-1 rounded transition-colors hover:bg-gray-50">
              <input
                type="radio"
                value="custom"
                checked={splitType === "custom"}
                onChange={() => setSplitType("custom")}
                name="splitType"
                className="cursor-pointer"
              />
              <span>Custom Amounts</span>
            </label>
          </div>
        </div>

        {/* Split Between */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Split Between
          </label>
          <div className="flex flex-col gap-2">
            {people.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded mb-1"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={splitBetween.includes(person.id)}
                    onChange={() => toggleSplitMember(person.id)}
                    className="cursor-pointer"
                  />
                  <span>{person.name}</span>
                </label>

                {splitType === "custom" && splitBetween.includes(person.id) && (
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={customAmounts[person.id] || ""}
                    onChange={(e) =>
                      setCustomAmounts({
                        ...customAmounts,
                        [person.id]: e.target.value,
                      })
                    }
                    className="w-24 px-2 py-1 border-2 border-gray-200 rounded text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md text-sm font-medium cursor-pointer transition-all hover:bg-indigo-600 hover:-translate-y-px flex items-center justify-center gap-1"
        >
          Add Expense
        </button>
      </form>

      {message && (
        <p className="text-sm text-center text-green-600 mt-3 transition-opacity">
          {message}
        </p>
      )}
    </div>
  );
}

export default ExpenseForm;
