const defaults = {
  appTitle: 'CoachingAI Health Companion',
  goals: [],
  coachHistory: [],
  coachApiMode: false,
  name: 'Alex',
  xp: 0,
  level: 1,
  rituals: 0,
  tasksDone: 0,
  games: 0,
  streak: 0,
  theme: 'light',
  font: 'normal',
  reducedMotion: false,
  simplified: false,
  largeTouch: false,
  tasks: [],
  history: {},
  reminders: []
};

export const sanitizeText = (value, maxLen = 120) =>
  String(value || '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLen);

export function loadState() {
  return {
    appTitle: localStorage.getItem('coach_app_title') || defaults.appTitle,
    goals: JSON.parse(localStorage.getItem('coach_goals') || '[]'),
    coachHistory: JSON.parse(localStorage.getItem('coach_history_chat') || '[]'),
    coachApiMode: localStorage.getItem('coach_api_mode') === 'true',
    name: localStorage.getItem('coach_name') || defaults.name,
    xp: Number(localStorage.getItem('coach_xp') || 0),
    level: Number(localStorage.getItem('coach_level') || 1),
    rituals: Number(localStorage.getItem('coach_rituals') || 0),
    tasksDone: Number(localStorage.getItem('coach_tasks_done') || 0),
    games: Number(localStorage.getItem('coach_games') || 0),
    streak: Number(localStorage.getItem('coach_streak') || 0),
    theme: localStorage.getItem('coach_theme') || defaults.theme,
    font: localStorage.getItem('coach_font') || defaults.font,
    reducedMotion: localStorage.getItem('coach_motion') === 'reduce',
    simplified: localStorage.getItem('coach_simple') === 'true',
    largeTouch: localStorage.getItem('coach_touch') === 'true',
    tasks: JSON.parse(localStorage.getItem('coach_tasks') || '[]'),
    history: JSON.parse(localStorage.getItem('coach_history') || '{}'),
    reminders: JSON.parse(localStorage.getItem('coach_reminders') || '[]')
  };
}

export function saveState(state) {
  localStorage.setItem('coach_app_title', state.appTitle);
  localStorage.setItem('coach_goals', JSON.stringify(state.goals));
  localStorage.setItem('coach_history_chat', JSON.stringify(state.coachHistory));
  localStorage.setItem('coach_api_mode', String(state.coachApiMode));
  localStorage.setItem('coach_name', state.name);
  localStorage.setItem('coach_xp', state.xp);
  localStorage.setItem('coach_level', state.level);
  localStorage.setItem('coach_rituals', state.rituals);
  localStorage.setItem('coach_tasks_done', state.tasksDone);
  localStorage.setItem('coach_games', state.games);
  localStorage.setItem('coach_streak', state.streak);
  localStorage.setItem('coach_theme', state.theme);
  localStorage.setItem('coach_font', state.font);
  localStorage.setItem('coach_motion', state.reducedMotion ? 'reduce' : 'normal');
  localStorage.setItem('coach_simple', String(state.simplified));
  localStorage.setItem('coach_touch', String(state.largeTouch));
  localStorage.setItem('coach_tasks', JSON.stringify(state.tasks));
  localStorage.setItem('coach_history', JSON.stringify(state.history));
  localStorage.setItem('coach_reminders', JSON.stringify(state.reminders));
}

export function normalizeImportedState(input) {
  if (!input || typeof input !== 'object') {
    throw new Error('Invalid JSON payload.');
  }

  return {
    ...defaults,
    ...input,
    appTitle: sanitizeText(input.appTitle || defaults.appTitle, 60),
    name: sanitizeText(input.name || defaults.name, 30),
    tasks: Array.isArray(input.tasks) ? input.tasks.slice(0, 200) : [],
    goals: Array.isArray(input.goals) ? input.goals.slice(0, 100) : [],
    reminders: Array.isArray(input.reminders) ? input.reminders.slice(0, 100) : [],
    history: input.history && typeof input.history === 'object' ? input.history : {}
  };
}
