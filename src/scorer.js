/**
 * @param {import('./checkers/index.js').CheckerResult[]} results
 * @returns {{ score: number, grade: 'A'|'B'|'C'|'D'|'F', label: string }}
 */
export function calculateScore(results) {
  const withWeight = results.filter((r) => r.status !== 'skip' && r.weight > 0);
  const totalWeight = withWeight.reduce((sum, r) => sum + r.weight, 0);
  if (totalWeight === 0) {
    return { score: 0, grade: 'F', label: 'Critical' };
  }
  const weightedSum = withWeight.reduce((sum, r) => sum + r.score * r.weight, 0);
  const score = Math.round(weightedSum / totalWeight);
  const clamped = Math.max(0, Math.min(100, score));

  let grade = 'F';
  let label = 'Critical';
  if (clamped >= 90) {
    grade = 'A';
    label = 'Excellent';
  } else if (clamped >= 75) {
    grade = 'B';
    label = 'Good';
  } else if (clamped >= 60) {
    grade = 'C';
    label = 'Fair';
  } else if (clamped >= 45) {
    grade = 'D';
    label = 'Poor';
  }

  return { score: clamped, grade, label };
}
