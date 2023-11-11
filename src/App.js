import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { getLocalStorage, setLocalStorage } from "./local_storage";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [formError, setFormError] = useState(null);

  const create_Todo = function (e) {
    e.preventDefault();
    try {
      if (!todoInput) {
        setFormError({
          isError: true,
          errorMessage: "Please enter a valid todo title",
        });
        setTimeout(() => {
          setFormError(null);
        }, 3000);
      }
      const newTodo = {
        title: todoInput,
        id: uuidv4(),
        created_at: Date.now(),
      };
      const todo_ls_name = process.env.REACT_APP_TODO_LOCAL_STORAGE_NAME;
      const todos = getLocalStorage(todo_ls_name);

      const new_todos = [...todos, newTodo];
      setLocalStorage(todo_ls_name, new_todos);
      // resetInput();
      // fetch_todoist();
    } catch (error) {
      // showError(error.message);
    }
  };

  return (
    <div>
      <header className="px-5 py-4 max-w-lg mx-auto">
        <h2 className="text-center my-4 border-b-2 font-bold text-2xl text-slate-500">
          <span className="text-green-300 text-3xl">Petels</span> TODOIST
        </h2>
      </header>
      <main className="my-4 max-w-lg mx-auto p-2">
        <form className="flex flex-col sm:flex-row justify-between">
          <input
            type="text"
            name="user-input"
            placeholder="What are you doing today?"
            className="border py-2 px-4 m-2 sm:w-[80%] rounded-md"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button
            onClick={create_Todo}
            className="bg-green-300 text-slate-800 py-2 px-4 rounded-md m-2"
            id="add_todo_btn"
          >
            Add&nbsp;Task
          </button>
          <button
            // onclick="updateTodo(event)"
            className="hidden bg-yellow-300 text-slate-800 py-2 px-4 rounded-md m-2"
            id="update_todo_btn"
          >
            Update&nbsp;Task
          </button>
        </form>
        {formError?.isError && (
          <span className="text-left p-2 text-sm text-red-400">
            {formError.errorMessage}
          </span>
        )}
        <div id="task_log" className="bg-green-50 rounded-md p-2" />
      </main>
    </div>
  );
}

export default App;
