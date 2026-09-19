// Node test script to verify session logic
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/questions.json'), 'utf8'));

function shuffle(array) {
  const res = [...array];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

let sessionHistory = [];

function generateSession() {
  const prev1Ids = new Set(sessionHistory.length >= 1 ? sessionHistory[sessionHistory.length - 1] : []);
  const prev2Ids = new Set(sessionHistory.length >= 2 ? sessionHistory[sessionHistory.length - 2] : []);

  const eligiblePrev2 = [...prev2Ids].filter(id => !prev1Ids.has(id));
  const fresh = raw.filter(q => !prev1Ids.has(q.id) && !prev2Ids.has(q.id));

  const pickedFromPrev2 = shuffle(eligiblePrev2).slice(0, Math.min(2, eligiblePrev2.length));
  const combined = shuffle([...pickedFromPrev2, ...fresh.map(q => q.id)]);

  return combined;
}

console.log('--- Running 100 simulated consecutive sessions ---');
let totalViolations = 0;

for (let s = 1; s <= 100; s++) {
  const queue = generateSession();
  // Simulate player answering between 12 and 25 questions in 60 seconds
  const answeredCount = Math.floor(Math.random() * 14) + 12;
  const answered = queue.slice(0, answeredCount);

  // Check 1: uniqueness within session
  const uniqueSet = new Set(answered);
  if (uniqueSet.size !== answered.length) {
    console.error(`Session ${s}: Duplicate questions within session!`);
    totalViolations++;
  }

  // Check 2: overlap with previous session (s - 1)
  if (sessionHistory.length >= 1) {
    const prev1 = sessionHistory[sessionHistory.length - 1];
    const prev1Set = new Set(prev1);
    const overlapPrev1 = answered.filter(id => prev1Set.has(id));
    if (overlapPrev1.length > 0) {
      console.error(`Session ${s}: Overlap with session ${s-1}! Found ${overlapPrev1.length} questions:`, overlapPrev1);
      totalViolations++;
    }
  }

  // Check 3: overlap with session 2 steps ago (s - 2)
  if (sessionHistory.length >= 2) {
    const prev2 = sessionHistory[sessionHistory.length - 2];
    const prev2Set = new Set(prev2);
    const overlapPrev2 = answered.filter(id => prev2Set.has(id));
    if (overlapPrev2.length > 2) {
      console.error(`Session ${s}: Overlap with session ${s-2} exceeded 2! Found ${overlapPrev2.length} questions:`, overlapPrev2);
      totalViolations++;
    }
  }

  // Record completed session
  sessionHistory.push(answered);
  if (sessionHistory.length > 2) {
    sessionHistory = sessionHistory.slice(-2);
  }
}

if (totalViolations === 0) {
  console.log('SUCCESS: All 100 sessions passed strict constraints without a single violation!');
} else {
  console.error(`FAILED: ${totalViolations} violations found!`);
  process.exit(1);
}
