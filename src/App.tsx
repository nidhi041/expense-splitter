import React from "react";
import { AppProvider } from "./context/AppContext";
import PeopleManager from "./components/PeopleManager";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BalanceView from "./components/BalanceView";

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <header className="bg-white/10 backdrop-blur-md p-6 text-center border-b border-white/20">
          <h1 className="text-white text-4xl font-bold drop-shadow-lg">
            💰 Expense Splitter
          </h1>
        </header>

        <main className="p-8">
          <div className="max-w-7xl mx-auto flex gap-8 flex-wrap justify-center">
            <div className="w-full md:w-[45%] min-w-[350px]">
              <PeopleManager />
              <ExpenseForm />
            </div>

            <div className="w-full md:w-[45%] min-w-[350px]">
              <BalanceView />
              <ExpenseList />
            </div>
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
