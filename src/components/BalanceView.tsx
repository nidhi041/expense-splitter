import React, { useMemo } from "react";
import { useAppContext } from "../context/AppContext";

// Utility to format currency
const formatAmount = (value: number) =>
  `$${Math.abs(value).toFixed(2)}`;

function BalanceView() {
  const { state } = useAppContext();
  const { people, expenses } = state;

  // --- Calculate Balances ---
  const { balances, totalSpending, settlements } = useMemo(() => {
    const balances: Record<string, number> = {};
    people.forEach((p) => (balances[p.id] = 0));

    let total = 0;

    for (const exp of expenses) {
      const amount = exp.amount;
      total += amount;

      // The payer gets credited for the full expense
      balances[exp.paidBy] += amount;

      // Equal split
      if (exp.splitType === "equal") {
        const share = amount / exp.splitBetween.length;
        exp.splitBetween.forEach((pid) => {
          balances[pid] -= share;
        });
      }

      // Custom split
      if (exp.splitType === "custom" && exp.customSplits) {
        exp.customSplits.forEach((s) => {
          balances[s.personId] -= s.amount;
        });
      }
    }

    // --- Simplify Debts ---
    const debtors: { id: string; amount: number }[] = [];
    const creditors: { id: string; amount: number }[] = [];

    for (const id in balances) {
      const balance = balances[id];
      if (balance < -0.01) debtors.push({ id, amount: -balance });
      if (balance > 0.01) creditors.push({ id, amount: balance });
    }

    const settlements: { from: string; to: string; amount: number }[] = [];

    let i = 0,
      j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const amount = Math.min(debtor.amount, creditor.amount);
      settlements.push({ from: debtor.id, to: creditor.id, amount });

      debtor.amount -= amount;
      creditor.amount -= amount;

      if (debtor.amount < 0.01) i++;
      if (creditor.amount < 0.01) j++;
    }

    return { balances, totalSpending: total, settlements };
  }, [people, expenses]);

  // --- Helper to get name by ID ---
  const getName = (id: string) =>
    people.find((p) => p.id === id)?.name || "Unknown";

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
      <h2 className="text-gray-700 mb-4 text-2xl border-b-2 border-gray-200 pb-2">
        💰 Balances
      </h2>

      {/* Total Spending */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg mb-6">
        <span>Total Group Spending:</span>
        <strong className="text-2xl">{formatAmount(totalSpending)}</strong>
      </div>

      {/* Individual Balances */}
      <div className="mb-6">
        <h3 className="text-gray-600 my-2 text-lg">Individual Balances</h3>
        {people.map((person) => {
          const balance = balances[person.id] || 0;
          const status =
            balance > 0.01
              ? "is owed"
              : balance < -0.01
              ? "owes"
              : "is settled";
          return (
            <div
              key={person.id}
              className="flex justify-between items-center px-3 py-3 mb-2 rounded-md bg-gray-100 border border-gray-300"
            >
              <span className="font-medium text-gray-800">{person.name}</span>
              <span className="flex items-center gap-2">
                <span
                  className={
                    balance > 0
                      ? "text-green-600"
                      : balance < 0
                      ? "text-red-600"
                      : "text-gray-600"
                  }
                >
                  {status}
                </span>
                <strong
                  className={
                    balance > 0
                      ? "text-green-700"
                      : balance < 0
                      ? "text-red-700"
                      : "text-gray-600"
                  }
                >
                  {formatAmount(balance)}
                </strong>
              </span>
            </div>
          );
        })}
      </div>

      {/* Settlements */}
      <div className="bg-green-50 rounded-lg p-4 text-green-900 font-medium">
        {settlements.length === 0 ? (
          <p className="text-center">✅ All balances are settled!</p>
        ) : (
          <>
            <p className="mb-2">Suggested Settlements:</p>
            {settlements.map((s, i) => (
              <p key={i}>
                💵 {getName(s.from)} pays {getName(s.to)}{" "}
                {formatAmount(s.amount)}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default BalanceView;
