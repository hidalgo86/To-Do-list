const apiUrl = 'http://localhost:3000/api/tasks';

async function fetchTasks() {
  const response = await fetch(apiUrl);
  const tasks = await response.json();
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.description;
    if (task.completed) li.style.textDecoration = 'line-through';
    taskList.appendChild(li);
  });
}

document.getElementById('task-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('task-input');
  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: input.value }),
  });
  input.value = '';
  fetchTasks();
});

fetchTasks();
