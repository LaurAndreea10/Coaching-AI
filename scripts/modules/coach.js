export const coachMessages = {
  motivate: [
    '✦ You do not need a perfect day. You need one honest step forward.',
    '✦ Progress is built from tiny actions done again and again.',
    '✦ You are more capable than your current doubt suggests.'
  ],
  calm: [
    '✦ Slow down. Breathe out longer than you breathe in.',
    '✦ You are allowed to rest without losing your progress.',
    '✦ Let this moment be simple. One breath, then the next.'
  ],
  focus: [
    '✦ Choose one next task. Protect it for 25 minutes.',
    '✦ Clarity grows when distractions get smaller.',
    '✦ Finish one thing before starting another.'
  ]
};

export function coachLocalReply(message, state, buildTodayPlan) {
  const lower = message.toLowerCase();
  const hasGoals = state.goals.length > 0;
  const openTasks = state.tasks.filter((task) => !task.done).length;

  if (lower.includes('tired') || lower.includes('energy')) {
    return `✦ You seem low on energy. Reduce today to one meaningful task, one hydration break, and one short reset. ${hasGoals ? `Your nearest goal is: ${state.goals[0].title}.` : ''}`;
  }
  if (lower.includes('anxious') || lower.includes('calm')) {
    return '✦ Slow the pace. Try 4 breaths, relax your shoulders, and choose a task that takes under 10 minutes.';
  }
  if (lower.includes('plan')) {
    return `✦ Here is a simple plan: ${buildTodayPlan()}`;
  }
  if (lower.includes('motivate')) {
    return `✦ Start smaller than you think. You have ${openTasks} open tasks. Pick one and finish only the first useful step.`;
  }
  return `✦ Based on your progress, I suggest keeping it simple today. ${hasGoals ? `Move your goal forward by one small action: ${state.goals[0].title}.` : ''}`;
}

export async function getCoachReply(message, state, buildTodayPlan) {
  if (state.coachApiMode) {
    return 'API mode is enabled. Connect your backend endpoint here to replace this placeholder with a real AI response.';
  }
  return coachLocalReply(message, state, buildTodayPlan);
}
