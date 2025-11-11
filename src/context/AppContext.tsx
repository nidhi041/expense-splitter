import React, { createContext, useReducer, useContext } from "react";
import { nanoid } from "nanoid";
import { Person, Expense } from "../types";
import { initialPeople, initialExpenses } from "../initialData";

interface AppState {
  people: Person[];
  expenses: Expense[];
}

type Action =
  | { type: "ADD_PERSON"; payload: string }
  | { type: "REMOVE_PERSON"; payload: string }
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "REMOVE_EXPENSE"; payload: string };

const initialState: AppState = {
  people: initialPeople,
  expenses: initialExpenses,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_PERSON": {
  const newName = action.payload?.trim();
  if (!newName) return state;

  // Safe check — ignore any invalid entries
  if (
    state.people.some(
      (p) => typeof p?.name === "string" && p.name.toLowerCase() === newName.toLowerCase()
    )
  ) {
    return state;
  }

  const newPerson: Person = { id: nanoid(), name: newName };
  return { ...state, people: [...state.people, newPerson] };
}


    case "REMOVE_PERSON":
      return {
        people: state.people.filter((p) => p.id !== action.payload),
        expenses: state.expenses.filter(
          (e) => e.paidBy !== action.payload && !e.splitBetween.includes(action.payload)
        ),
      };

    case "ADD_EXPENSE":
      return { ...state, expenses: [action.payload, ...state.expenses] };

    case "REMOVE_EXPENSE":
      return { ...state, expenses: state.expenses.filter((e) => e.id !== action.payload) };

    default:
      return state;
  }
}

const AppContext = createContext<
  | {
      state: AppState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};
