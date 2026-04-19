import { sanitizeText } from './storage.js';

const icons = { urgent: '🔴', normal: '🟡', easy: '🟢' };

export function renderTasks(state, els) {
  const open = state.tasks.filter((task) => !task.done).length;
  els.openTaskBadge.textContent = `${open} open`;

  if (!state.tasks.length) {
    els.taskList.innerHTML = '<div class="task-item" style="grid-template-columns:1fr"><span class="muted">No tasks yet. Add your first one above.</span></div>';
    return;
  }

  els.taskList.innerHTML = state.tasks.map((task, index) => `
    <div class="task-item">
      <button class="check ${task.done ? 'done' : ''}" data-task-index="${index}">${task.done ? '✓' : ''}</button>
      <div class="${task.done ? 'task-done' : ''}">
        <strong>${task.text}</strong>
        <div class="muted">${task.done ? 'Completed' : 'Not completed yet'}</div>
      </div>
      <span class="priority">${icons[task.priority] || icons.normal}</span>
    </div>
  `).join('');
}

export function addTask(state, els) {
  const text = sanitizeText(els.taskInput.value, 90);
  if (text.length < 3) {
    return { ok: false, error: 'Task must contain at least 3 characters.' };
  }

  if (state.tasks.length >= 200) {
    return { ok: false, error: 'Task limit reached (200).' };
  }

  state.tasks.push({ text, priority: els.taskPriority.value, done: false });
  els.taskInput.value = '';
  return { ok: true };
}

export function toggleTask(state, index) {
  const task = state.tasks[index];
  if (!task) return { changed: false, completed: false };
  task.done = !task.done;
  return { changed: true, completed: task.done };
}
