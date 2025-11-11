import { nanoid } from "nanoid";
import { Person, Expense } from "./types";

export const initialPeople: Person[] = [
  { id: nanoid(), name: "Alice" },
  { id: nanoid(), name: "Bob" },
  { id: nanoid(), name: "Charlie" },
];

export const initialExpenses: Expense[] = [];
