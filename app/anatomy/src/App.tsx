import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  FlashofferThemeProvider,
  MultipleChoiceQuiz,
  type MultipleChoiceAnswer
} from "flashoffer-react";
import {
  getQuizStats,
  QUIZ_RESULTS_ENDPOINT,
  submitQuizResult,
  type QuizStats
} from "./api/quizResults";

const QUESTION = "Which action best captures the primary role of the trapezius?";

const QUIZ_OPTIONS = [
  {
    id: "scapular-rotation",
    label: "Coordinating scapular rotation for overhead reach",
    description:
      "Pairs with serratus anterior so the glenoid aims upward without pinching " +
      "the acromion."
  },
  {
    id: "elbow-extension",
    label: "Driving elbow extension for powerful strikes",
    description:
      "That job belongs to the triceps brachii along the posterior arm."
  },
  {
    id: "forearm-pronation",
    label: "Turning the forearm palm-down",
    description:
      "Pronator teres and pronator quadratus take the lead here."
  },
  {
    id: "finger-flexion",
    label: "Flexing the digits to grip charcoal and stylus",
    description:
      "Flexor digitorum profundus and superficialis control those gestures."
  }
] as const;

const CORRECT_OPTION_ID = "scapular-rotation";

export function App() {
  const [stats, setStats] = useState<QuizStats>({ correct: 0, incorrect: 0 });
  const [hasSubmission, setHasSubmission] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getQuizStats().then((initialStats) => {
      if (!cancelled) {
        setStats(initialStats);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAnswer = async (answer: MultipleChoiceAnswer) => {
    const updatedStats = await submitQuizResult({
      isCorrect: Boolean(answer.isCorrect)
    });
    setStats(updatedStats);
    setHasSubmission(true);
  };

  return (
    <FlashofferThemeProvider>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          py: { xs: 6, md: 10 },
          background:
            "linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(248,250,252,1) 60%)"
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="stretch">
            <Stack spacing={1} alignItems="flex-start">
              <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
                Trapezius knowledge check
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {"Put the muscle to the test and see how often you land on the right " +
                  "action. We log each attempt through " +
                  `${QUIZ_RESULTS_ENDPOINT} to tally class progress.`}
              </Typography>
            </Stack>

            <MultipleChoiceQuiz
              question={QUESTION}
              options={QUIZ_OPTIONS}
              helperText={
                "Think about how the trapezius steadies the shoulder girdle " +
                "when you reach to sketch above eye level."
              }
              correctOptionId={CORRECT_OPTION_ID}
              explanation={
                "Upper, middle, and lower fibers of the trapezius collaborate to " +
                "stabilize and rotate the scapula, clearing the humeral head for " +
                "overhead motion while keeping the neck poised."
              }
              successMessage={
                "Beautiful observation! You tracked the scapula just like a studio " +
                "mentor would."
              }
              errorMessage={
                "Not quite. Revisit how the scapula glides during a painterly reach " +
                "before trying again."
              }
              onAnswer={handleAnswer}
            />

            {hasSubmission ? (
              <Alert severity="info" variant="outlined">
                <Typography component="span" sx={{ display: "block" }}>
                  Correct replies recorded: <strong>{stats.correct}</strong>
                </Typography>
                <Typography component="span" sx={{ display: "block" }}>
                  Incorrect replies recorded: <strong>{stats.incorrect}</strong>
                </Typography>
              </Alert>
            ) : null}
          </Stack>
        </Container>
      </Box>
    </FlashofferThemeProvider>
  );
}
