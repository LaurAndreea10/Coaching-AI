import { sanitizeText } from './storage.js';

export function renderGoals(state, targetEl) {
  if (!targetEl) return;

  if (!state.goals.length) {
    targetEl.innerHTML = '<div class="task-item" style="grid-template-columns:1fr"><span class="muted">No goals yet. Add your first goal above.</span></div>';
    return;
  }

  targetEl.innerHTML = state.goals.map((goal, index) => {
    const pct = Math.min(100, Math.round((goal.progress / goal.target) * 100));
    return `<div class="task-item" style="grid-template-columns:minmax(0,1fr) auto;align-items:start"><div><strong>${goal.title}</strong><div class="muted" style="margin-top:6px">${goal.category} · ${goal.progress}/${goal.target} ${goal.unit}</div><div class="progress-track" style="margin-top:10px"><div class="progress-fill" style="width:${pct}%"></div></div></div><div style="display:grid;gap:8px"><button class="ghost-btn" data-goal-plus="${index}">+1</button><button class="ghost-btn" data-goal-remove="${index}">Remove</button></div></div>`;
  }).join('');
}

export function buildGoalFromInputs() {
  const title = sanitizeText(document.getElementById('goalTitle')?.value, 80);
  const category = document.getElementById('goalCategory')?.value || 'health';
  const target = Math.max(1, Number(document.getElementById('goalTarget')?.value || 1));
  const unit = sanitizeText(document.getElementById('goalUnit')?.value || 'steps', 20);

  if (title.length < 3) {
    return { ok: false, error: 'Goal title must have at least 3 characters.' };
  }

  return { ok: true, goal: { title, category, target, unit, progress: 0 } };
}
