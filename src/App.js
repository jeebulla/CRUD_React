import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getLocalStorage, setLocalStorage } from "./local_storage";
import { TodoLoader } from "./components/TodoLoader";
import { TodoLists } from "./components/TodoLists";

const todo_ls_name = process.env.REACT_APP_TODO_LOCAL_STORAGE_NAME;

function App() {
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [todos, setTodos] = useState([]);
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
      const todos = getLocalStorage(todo_ls_name);

      const new_todos = [...todos, newTodo];
      setLocalStorage(todo_ls_name, new_todos);
      setTodoInput("");
      fetch_todo();
    } catch (error) {
      setFormError(error.message);
    }
  };
  const sort_ls_Todos = (todo_db) => {
    return todo_db.sort((a, b) =>
      a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0
    );
  };
  const fetch_todo = function () {
    const _todos = getLocalStorage(todo_ls_name);
    const sortedTodos = sort_ls_Todos(_todos);
    setTodos(sortedTodos);

    setTimeout(() => {
      setLoadingTodos(false);
    }, 5000);
  };

  useEffect(() => {
    fetch_todo();
  }, []);

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
        {!loadingTodos && todos.length === 0 && (
          <p className="text-center text-sm my-1">
            No Todos yet. Your Todo will appear here...
          </p>
        )}
        <section className="bg-green-50 rounded-md py-2">
          {loadingTodos ? (
            <>
              <TodoLoader />
              <TodoLoader />
              <TodoLoader />
            </>
          ) : (
            <>
              {todos.map(({ title, id, created_at }) => {
                return (
                  <TodoLists
                    title={title}
                    id={id}
                    created_at={created_at}
                    key={id}
                  />
                );
              })}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
