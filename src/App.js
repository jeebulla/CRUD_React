import logo from "./logo.svg";
import "./App.css";

function App() {
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
            id="todo_input"
          />
          <button
            onclick="create_Todo(event)"
            className="bg-green-300 text-slate-800 py-2 px-4 rounded-md m-2"
            id="add_todo_btn"
          >
            Add&nbsp;Task
          </button>
          <button
            onclick="updateTodo(event)"
            className="hidden bg-yellow-300 text-slate-800 py-2 px-4 rounded-md m-2"
            id="update_todo_btn"
          >
            Update&nbsp;Task
          </button>
        </form>
        <span id="form_message" className="hidden block text-left p-2" />
        <div id="task_log" className="bg-green-50 rounded-md p-2" />
      </main>
    </div>
  );
}

export default App;
