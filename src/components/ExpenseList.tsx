import React from "react";
import { useAppContext } from "../context/AppContext";
import { format } from "date-fns";

function ExpenseList() {
  const { state, dispatch } = useAppContext();
  const { expenses, people } = state;

  // Helper to get person name by ID
  const getPersonName = (id: string) => {
    const person = people.find((p) => p.id === id);
    return person ? person.name : "Unknown";
  };

  // Delete expense
  const handleDelete = (id: string) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: id });
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
        <h2 className="text-gray-700 mb-4 text-2xl border-b-2 border-gray-200 pb-2">
          📝 Expense History
        </h2>
        <p className="text-center text-gray-400 py-8 italic">
          No expenses yet. Add one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
      <h2 className="text-gray-700 mb-4 text-2xl border-b-2 border-gray-200 pb-2">
        📝 Expense History ({expenses.length})
      </h2>

      <div className="space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-4 flex justify-between items-start flex-wrap gap-2">
              <div>
                <h4 className="text-gray-800 text-lg font-semibold">
                  {expense.description}
                </h4>
                <div className="text-gray-600 text-sm">
                  {format(new Date(expense.date), "PP")} · Paid by{" "}
                  {getPersonName(expense.paidBy)} · ${expense.amount.toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => handleDelete(expense.id)}
                className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>

            <div className="px-4 pb-3 text-gray-600 text-sm">
              <p>
                Split Type:{" "}
                <span className="font-medium">{expense.splitType.toUpperCase()}</span>
              </p>
              <p>
                Shared Between:{" "}
                {expense.splitBetween
                  .map((pid) => getPersonName(pid))
                  .join(", ")}
              </p>
              {expense.splitType === "custom" && expense.customSplits && (
                <div className="mt-1 text-gray-500 text-sm">
                  {expense.customSplits.map((s) => (
                    <div key={s.personId}>
                      {getPersonName(s.personId)} owes ${s.amount.toFixed(2)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
