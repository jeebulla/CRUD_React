export const getLocalStorage = (name) => {
  if (!name) {
    throw new Error("Local storage " + name + " is missing...");
  }
  return JSON.parse(localStorage.getItem(name)) || [];
};

export const setLocalStorage = (name, new_todo) => {
  if (!name) {
    throw new Error("Local storage " + name + " is missing...");
  }
  if (!new_todo) {
    throw new Error("Local storage " + new_todo + " is missing...");
  }
  return localStorage.setItem(name, JSON.stringify(new_todo));
};
