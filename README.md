
#  Expense Splitter — Final Submission

A complete **React + TypeScript** application that helps groups of people track shared expenses, calculate who owes whom, and simplify settlements automatically.  
Built with **Context + Reducer** for global state management and styled using **TailwindCSS** for a modern, responsive UI.

---

##  Getting Started

###  Installation & Setup

```bash
# 1️ Install dependencies
npm install

# 2️ (Required) Install date formatting utility
npm install date-fns

# 3️ Run the app locally
npm run dev
````

Then open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

###  (Optional) Run Tests

A simple test has been included using **Vitest**.

```bash
npm test
```

 Expected output:

```
 renders Expense Splitter header
```

---

##  Overview

**Expense Splitter** allows users to:

*  Manage group members (add/remove people)
* Record shared expenses (equal or custom splits)
*  View all expenses in history
*  See live balances and suggested settlements

All components stay synchronized through **Context-based global state** — no refresh needed.

---

##  Implementation Details

###  Tech Stack

| Feature              | Technology               |
| -------------------- | ------------------------ |
| **Framework**        | React + TypeScript       |
| **Styling**          | Tailwind CSS             |
| **State Management** | Context API + useReducer |
| **ID Generation**    | nanoid                   |
| **Date Formatting**  | date-fns                 |
| **Testing**          | Vitest + Testing Library |

---

###  Architecture & Data Flow

#### Global State Structure

```ts
{
  people: Person[];
  expenses: Expense[];
}
```

#### Actions

* `ADD_PERSON`
* `REMOVE_PERSON`
* `ADD_EXPENSE`
* `REMOVE_EXPENSE`

#### Data Flow

* Adding/removing people instantly updates dropdowns and lists.
* Adding/deleting an expense updates the balance view dynamically.
* All calculations are derived from a single shared state.

---

##  Core Functionalities

### 1️. People Management

* Add new people dynamically
* Prevent duplicates and empty names
* Remove people (also removes related expenses)
* Real-time update of all connected components
* Success/error feedback after actions

---

### 2. Expense Management

* Record expenses with:

  * Description
  * Amount
  * Paid By (dropdown)
  * Date
  * Split Between (checkbox list)
  * Split Type: Equal or Custom
* **Equal Split:** divides total evenly
* **Custom Split:** allows per-person input with validation
* **Validation:** ensures sum of custom amounts = total
* Expense list displays:

  * Payer
  * Date (formatted)
  * Split type
  * Participants
* Delete expenses dynamically
* Displays total count of expenses

---

### 3️. Balance Calculation & Settlement

* Calculate:

  * Total paid per person
  * Total owed per person
  * Net balance (positive = owed, negative = owes)
* Show **Total Group Spending**
* Simplify debts into minimal transactions:

  * Example:
     *Bob pays Alice $25.00*
* Show “All balances are settled!” when even

---

##  User Experience

* Responsive layout (mobile, tablet, desktop)
* Clean, minimal Tailwind design
* Instant feedback on add/delete actions
* Clear custom split validation messages
* Smooth hover transitions and card-based UI

---

##  Project Structure

```
src/
├── components/
│   ├── PeopleManager.tsx    # Add/remove group members
│   ├── ExpenseForm.tsx      # Add new expenses
│   ├── ExpenseList.tsx      # Display/delete expenses
│   └── BalanceView.tsx      # Calculate and show balances
├── context/
│   └── AppContext.tsx       # Context + Reducer logic
├── types.ts                 # TypeScript interfaces
├── initialData.ts           # Initial seed data
├── App.tsx                  # Main layout
└── main.tsx                 # Entry point
```

---

##  Architecture Decisions

| Aspect               | Choice                                   |
| -------------------- | ---------------------------------------- |
| **State Management** | Context API + useReducer                 |
| **Styling**          | Tailwind CSS                             |
| **Date Formatting**  | date-fns                                 |
| **Validation**       | Custom form validation for splits        |
| **Type Safety**      | Strongly typed interfaces                |
| **Computation**      | Greedy algorithm for minimal settlements |

---

##  Assumptions

* Each expense must include at least one participant.
* Custom splits must total exactly the entered expense amount.
* Removing a person removes all expenses linked to them.
* All calculations auto-update after any action.

---

##  Future Improvements

* Persist state in `localStorage`
* Add visual charts (pie/bar) for expenses
* Support multiple groups or trips
* Export settlements as PDF report

---

##  Project Completion Checklist

* [x] Add/remove people
* [x] Add/delete expenses
* [x] Equal and custom split handling
* [x] Real-time balance updates
* [x] Settlement simplification
* [x] Fully responsive UI
* [x] TypeScript + Tailwind integrated
* [x] Basic test passing (`npm test`)
* [x] No console errors or warnings

---

##  Development Approach

1. Implemented **PeopleManager** with live add/remove state updates.
2. Created **AppContext** with Reducer for global synchronization.
3. Built **ExpenseForm** for adding equal/custom splits with validation.
4. Added **ExpenseList** for displaying and deleting expenses.
5. Implemented **BalanceView** for totals, per-person balances, and settlements.
6. Styled the app using TailwindCSS for responsiveness.
7. Added a simple test (`App.test.tsx`) with Vitest for header rendering.

---

##  Run Locally

```bash
git clone <your_repo_link>
cd expense-splitter-challenge
npm install
npm install date-fns
npm run dev
```

Then open **[http://localhost:5173](http://localhost:5173)** in your browser 🎉

---

## Example Output

**Scenario:**

* Alice pays $60 for Dinner
* Bob pays $40 for Taxi
* Both shared equally

**Balances:**

* Alice: +$10 (is owed)
* Bob: -$10 (owes)

**Suggested Settlement:**
 *Bob pays Alice $10.00*

---

##  Developer Notes

This project demonstrates:

* Clean, modular architecture
* Real-time state synchronization
* Practical implementation of Context API with Reducer
* TypeScript best practices
* Responsive UI and clear UX
* Accurate expense computation and debt simplification

---

** Developed by:** *Nidhi Namdev*
**Challenge:** Expense Splitter Coding Challenge 2025
**Time Taken:** Under 2 hours ⏱️
**Tech Stack:** React + TypeScript + TailwindCSS + Context API + Vitest

````

---

