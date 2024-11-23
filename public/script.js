// const apiUrl = "https://to-do-list-production-5729.up.railway.app/api/tasks";
// const apiUrl = "https://to-do-list-production-5729.up.railway.app/api/tasks";
// const apiUrl = "http://localhost:3000/api/tasks";

// Mostrar mensaje de error en la UI
function showError(message) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
  setTimeout(() => errorDiv.classList.add("hidden"), 3000);
}

// Función genérica para manejar errores HTTP
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    showError(error.message || "Error desconocido");
    throw new Error(response.statusText);
  }
  return response.json();
}

// Eliminar una tarea
async function deleteTask(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    await handleResponse(response);
    fetchTasks();
  } catch (error) {
    showError("No se pudo eliminar la tarea.");
  }
}

// Actualizar una tarea
async function updateTask(id, updates) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    await handleResponse(response);
    fetchTasks();
  } catch (error) {
    showError("No se pudo actualizar la tarea.");
  }
}

// Obtener y renderizar las tareas
async function fetchTasks() {
  try {
    const response = await fetch(apiUrl);
    const tasks = await handleResponse(response);

    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.description;
      if (task.completed) li.style.textDecoration = "line-through";

      // Checkbox para marcar como completado
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.style.marginRight = "10px";
      checkbox.addEventListener("change", async () => {
        await updateTask(task._id, { completed: checkbox.checked });
      });

      // Botón de eliminar
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.style.marginLeft = "10px";
      deleteButton.addEventListener("click", async () => {
        await deleteTask(task._id);
      });

      // Botón de editar
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.style.marginLeft = "10px";
      editButton.addEventListener("click", () => {
        const taskInput = document.getElementById("task-input");
        taskInput.value = task.description;
        taskInput.focus();

        document.getElementById("task-form").onsubmit = async (e) => {
          e.preventDefault();
          await updateTask(task._id, { description: taskInput.value });
          taskInput.value = "";
          document.getElementById("task-form").onsubmit = defaultSubmit;
        };
      });

      li.prepend(checkbox);
      li.appendChild(deleteButton);
      li.appendChild(editButton);
      taskList.appendChild(li);
    });
  } catch (error) {
    showError("No se pudieron cargar las tareas.");
  }
}

// Crear una nueva tarea
const defaultSubmit = async (e) => {
  e.preventDefault();
  const input = document.getElementById("task-input");
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: input.value }),
    });
    await handleResponse(response);
    input.value = "";
    fetchTasks();
  } catch (error) {
    showError("No se pudo crear la tarea.");
  }
};

document.getElementById("task-form").onsubmit = defaultSubmit;

// Inicializar lista de tareas
fetchTasks();
