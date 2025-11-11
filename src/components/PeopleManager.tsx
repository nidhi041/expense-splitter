import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

function PeopleManager() {
  const { state, dispatch } = useAppContext();
  const { people } = state;

  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage("⚠️ Please enter a name");
      return;
    }
    dispatch({ type: "ADD_PERSON", payload: name });
    setMessage(`✅ Added ${name}`);
    setName("");
    setTimeout(() => setMessage(null), 1500);
  };

  const handleRemovePerson = (id: string, personName: string) => {
    dispatch({ type: "REMOVE_PERSON", payload: id });
    setMessage(`🗑️ Removed ${personName}`);
    setTimeout(() => setMessage(null), 1500);
  };

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
      <h2 className="text-gray-700 mb-4 text-2xl border-b-2 border-gray-200 pb-2">
        👥 Manage People
      </h2>

      <form onSubmit={handleAddPerson} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter person's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-md text-base transition-colors focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded-md text-sm font-medium cursor-pointer transition-all hover:bg-indigo-600 hover:-translate-y-px"
        >
          Add Person
        </button>
      </form>

      {message && (
        <p className="text-sm text-center mb-4 text-green-600 transition-opacity">
          {message}
        </p>
      )}

      <div className="mt-4">
        <h3 className="text-gray-600 my-2 text-lg">
          Current Members ({people.length})
        </h3>
        {people.length === 0 ? (
          <p className="text-center text-gray-400 py-8 italic">
            No people added yet
          </p>
        ) : (
          <ul className="list-none mt-2">
           {people.map((person) => (
  <li
    key={person.id} // ✅ must be ID, not index
    className="flex justify-between items-center p-2 mb-1 bg-gray-50 rounded transition-colors hover:bg-gray-100"
  >
    <span className="font-medium text-gray-800">{person.name}</span>
    <button
      type="button"
      onClick={() => handleRemovePerson(person.id, person.name)}
      className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
    >
      Remove
    </button>
  </li>
))}

          </ul>
        )}
      </div>
    </div>
  );
}

export default PeopleManager;
