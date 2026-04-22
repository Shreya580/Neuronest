// NeuroNest Scoring Engine
// Based on START research (Dubey et al., 2024) — social, sensory, motor + M-CHAT-R

// ─── Age-adjusted norms ─────────────────────────────────────────────────────
// Typical taps per 15s by age (motor game baseline)
const MOTOR_NORMS = { 1: 5, 2: 8, 3: 11, 4: 14, 5: 16, 6: 18 };

// Social preference score: % of taps on FACE vs shape (typically >55% face in TD children)
const SOCIAL_THRESHOLD = 0.50; // below = atypical preference

// Sensory: % of taps on SPINNING vs novel stimulus (>60% spinning = atypical fixation)
const SENSORY_THRESHOLD = 0.60;

// ─── Critical M-CHAT-R items (failing these alone raises risk) ───────────────
const CRITICAL_ITEMS = ["name", "point", "eye"];

// ─── Main scoring function ────────────────────────────────────────────────────
export function computeRisk(rawData) {
  const {
    childAge = 3,          // number 1-6
    socialTaps = {},       // { face: N, shape: N }
    sensoryTaps = {},      // { spinning: N, bouncing: N }
    motorScore = 0,        // total taps in 15s
    motorErrors = 0,       // taps outside target zone
    questionAnswers = {},  // { name: 0|1|2, eye: 0|1|2, point: 0|1|2, ... }
  } = rawData;

  const age = Math.max(1, Math.min(6, parseInt(childAge) || 3));

  // ── 1. SOCIAL DOMAIN ────────────────────────────────────────────────────────
  const totalSocial = (socialTaps.face || 0) + (socialTaps.shape || 0);
  const socialPref = totalSocial > 0
    ? (socialTaps.face || 0) / totalSocial
    : 0.5;
  // Higher social preference = better. Score 0-1.
  const socialScore = Math.min(socialPref / SOCIAL_THRESHOLD, 1.0);

  // ── 2. SENSORY DOMAIN ───────────────────────────────────────────────────────
  const totalSensory = (sensoryTaps.spinning || 0) + (sensoryTaps.bouncing || 0);
  const sensoryFix = totalSensory > 0
    ? (sensoryTaps.spinning || 0) / totalSensory
    : 0.3;
  // Lower fixation on spinning = better. Score 0-1.
  const sensoryScore = sensoryFix >= SENSORY_THRESHOLD
    ? Math.max(0, 1 - (sensoryFix - SENSORY_THRESHOLD) / 0.4)
    : 1.0;

  // ── 3. MOTOR DOMAIN ─────────────────────────────────────────────────────────
  const norm = MOTOR_NORMS[age] || 11;
  const motorAccuracy = motorScore > 0
    ? Math.max(0, 1 - motorErrors / motorScore)
    : 0;
  const motorSpeed = Math.min(motorScore / norm, 1.0);
  const motorScore01 = (motorAccuracy * 0.6) + (motorSpeed * 0.4);

  // ── 4. QUESTIONNAIRE DOMAIN (M-CHAT-R based) ────────────────────────────────
  const qKeys = Object.keys(questionAnswers);
  const qMax = qKeys.length * 2;
  const qTotal = qKeys.reduce((sum, k) => sum + (parseInt(questionAnswers[k]) || 0), 0);
  const qScore01 = qMax > 0 ? qTotal / qMax : 0;

  // Critical item check — any 0 on name/point/eye = automatic flag
  const criticalFail = CRITICAL_ITEMS.filter(
    k => questionAnswers[k] !== undefined && parseInt(questionAnswers[k]) === 0
  );

  // ── 5. COMBINED SCORE (weights from START paper: behavioural + parent report) ─
  // Social 25%, Sensory 20%, Motor 25%, Questionnaire 30%
  const combined = (
    socialScore * 0.25 +
    sensoryScore * 0.20 +
    motorScore01 * 0.25 +
    qScore01 * 0.30
  );
  const combinedPct = Math.round(combined * 100);

  // ── 6. RISK CLASSIFICATION ───────────────────────────────────────────────────
  let riskLevel;
  if (criticalFail.length >= 2 || combinedPct < 35) {
    riskLevel = "elevated";
  } else if (criticalFail.length === 1 || combinedPct < 60) {
    riskLevel = "moderate";
  } else {
    riskLevel = "low";
  }

  return {
    riskLevel,
    combinedPct,
    domains: {
      social:    Math.round(socialScore * 100),
      sensory:   Math.round(sensoryScore * 100),
      motor:     Math.round(motorScore01 * 100),
      questionnaire: Math.round(qScore01 * 100),
    },
    criticalFail,
    flags: {
      lowSocialPref: socialPref < SOCIAL_THRESHOLD,
      highSensoryFix: sensoryFix >= SENSORY_THRESHOLD,
      lowMotorAccuracy: motorAccuracy < 0.6,
      criticalItemsFailed: criticalFail,
    },
    raw: { socialPref, sensoryFix, motorAccuracy, motorSpeed, qScore01 },
  };
}

// ─── localStorage save/load helpers ─────────────────────────────────────────
export function saveGameData(key, data) {
  localStorage.setItem(`nn_${key}`, JSON.stringify(data));
}

export function loadGameData(key) {
  try {
    return JSON.parse(localStorage.getItem(`nn_${key}`)) || null;
  } catch { return null; }
}

export function clearAllData() {
  ["social", "sensory", "motor", "questions", "childAge"].forEach(k =>
    localStorage.removeItem(`nn_${k}`)
  );
}