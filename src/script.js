const API_URL = "http://localhost:3001/tasks";

// Get logged-in user (assuming stored in localStorage after login)
const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
const currentUserId = storedUser?.id || 1; // fallback to 1 for testing

// Load tasks
async function loadTasks() {
  const res = await fetch(`${API_URL}/${currentUserId}`);
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    // Show input if editing
    if (task.isEditing) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.id = `edit-${task.id}`;

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.onclick = () => saveEdit(task.id);

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.onclick = () => loadTasks();

      li.appendChild(input);
      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);
    } else {
      li.textContent = task.text + (task.completed ? " ✅" : "");

      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Undo" : "Complete";
      completeBtn.onclick = () => toggleTask(task.id, !task.completed);

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => startEdit(task.id);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteTask(task.id);

      li.appendChild(completeBtn);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    }

    list.appendChild(li);
  });
}

// Add a new task
async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  await fetch(`${API_URL}/${currentUserId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: input.value,
      completed: false,
    }),
  });

  input.value = "";
  loadTasks();
}

// Toggle task completion
async function toggleTask(id, completed) {
  await fetch(`${API_URL}/${currentUserId}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  loadTasks();
}

// Delete a task
async function deleteTask(id) {
  await fetch(`${API_URL}/${currentUserId}/${id}`, { method: "DELETE" });
  loadTasks();
}

// Start editing a task
function startEdit(id) {
  const listItems = document.querySelectorAll("#taskList li");
  listItems.forEach(li => {
    li.dataset.editing = false;
  });

  // Mark this task as editing
  loadTasks().then(() => {
    const tasks = JSON.parse(localStorage.getItem("tasksCache")) || [];
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isEditing: true } : task
    );
    localStorage.setItem("tasksCache", JSON.stringify(updatedTasks));
    renderFromCache(updatedTasks);
  });
}

// Save edited text
async function saveEdit(id) {
  const input = document.getElementById(`edit-${id}`);
  if (!input || !input.value.trim()) return;

  await fetch(`${API_URL}/${currentUserId}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value }),
  });
  loadTasks();
}

// Helper to render from cache (to show input instantly)
function renderFromCache(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.isEditing) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.id = `edit-${task.id}`;

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.onclick = () => saveEdit(task.id);

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.onclick = () => loadTasks();

      li.appendChild(input);
      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);
    } else {
      li.textContent = task.text + (task.completed ? " ✅" : "");
    }
    list.appendChild(li);
  });
}

loadTasks();
