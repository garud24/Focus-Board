const KEY = 'fb.todos.v1';

export function loadTodos() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; }
  catch { return []; }
}
export function saveTodos(todos) {
  localStorage.setItem(KEY, JSON.stringify(todos));
}
export function addTodo(text) {
  const todos = loadTodos();
  todos.push({ text, done: false });
  saveTodos(todos);
}
export function toggleTodo(index) {
  const todos = loadTodos();
  if (!todos[index]) return;
  todos[index].done = !todos[index].done;
  saveTodos(todos);
}
export function clearCompleted() {
  const todos = loadTodos().filter(t => !t.done);
  saveTodos(todos);
}
