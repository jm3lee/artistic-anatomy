export interface QuizStats {
  correct: number;
  incorrect: number;
}

export interface QuizResultPayload {
  isCorrect: boolean;
}

export const QUIZ_RESULTS_ENDPOINT = "/api/quiz-results";

const defaultStats: QuizStats = { correct: 0, incorrect: 0 };
let memoryStats: QuizStats = { ...defaultStats };

const STORAGE_KEY = "trapezius-quiz-results";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function loadFromStorage(): QuizStats | null {
  if (!isBrowser()) {
    return null;
  }
  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (!rawValue) {
    return null;
  }
  try {
    const parsed = JSON.parse(rawValue) as QuizStats;
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof parsed.correct === "number" &&
      typeof parsed.incorrect === "number"
    ) {
      return parsed;
    }
  } catch (error) {
    console.warn("Unable to parse stored quiz stats", error);
  }
  return null;
}

function persistToStorage(stats: QuizStats): void {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function readStats(): QuizStats {
  const stored = loadFromStorage();
  if (stored) {
    memoryStats = stored;
    return stored;
  }
  return { ...memoryStats };
}

function writeStats(stats: QuizStats): QuizStats {
  memoryStats = { ...stats };
  persistToStorage(memoryStats);
  return memoryStats;
}

export async function getQuizStats(): Promise<QuizStats> {
  return readStats();
}

export async function submitQuizResult(payload: QuizResultPayload): Promise<QuizStats> {
  const nextStats = { ...readStats() };
  if (payload.isCorrect) {
    nextStats.correct += 1;
  } else {
    nextStats.incorrect += 1;
  }
  return writeStats(nextStats);
}
