"use client";

import { useCallback, useMemo, useState } from "react";
import { questions, quizMeta, topicLabels } from "../data/quizData";

function normalizeAnswer(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function gradeMultiple(selected, correctIds) {
  const s = new Set(selected);
  const c = new Set(correctIds);
  if (s.size !== c.size) return false;
  for (const id of c) {
    if (!s.has(id)) return false;
  }
  return true;
}

function gradeFill(userText, acceptableAnswers) {
  const u = normalizeAnswer(userText);
  if (!u) return false;
  return acceptableAnswers.some((a) => {
    const n = normalizeAnswer(a);
    if (!n) return false;
    return u === n || u.includes(n) || n.includes(u);
  });
}

/** Fisher–Yates shuffle (in-place copy). */
function shuffleArray(items) {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * New attempt: random question order and shuffled option order for each
 * multiple-choice item (correctIds stay tied to stable option ids).
 */
function buildSessionQuestions(seed) {
  const shuffledOrder = shuffleArray(seed);
  return shuffledOrder.map((question) => {
    if (question.type !== "multiple" || !question.options?.length) {
      return question;
    }
    return { ...question, options: shuffleArray(question.options) };
  });
}

export default function PathfinderTrainingQuiz() {
  const [phase, setPhase] = useState("intro"); // intro | quiz | results
  const [index, setIndex] = useState(0);
  /** Shuffled questions + shuffled options for this attempt only */
  const [sessionQuestions, setSessionQuestions] = useState([]);
  /** @type {Record<string, string[] | string>} */
  const [answers, setAnswers] = useState({});

  const totalSteps = sessionQuestions.length;
  const q = sessionQuestions[index];

  const setMultiple = useCallback((qid, optionId, checked) => {
    setAnswers((prev) => {
      const cur = prev[qid];
      const list = Array.isArray(cur) ? [...cur] : [];
      if (checked) {
        if (!list.includes(optionId)) list.push(optionId);
      } else {
        const i = list.indexOf(optionId);
        if (i >= 0) list.splice(i, 1);
      }
      return { ...prev, [qid]: list };
    });
  }, []);

  const setSingle = useCallback((qid, optionId) => {
    setAnswers((prev) => ({ ...prev, [qid]: [optionId] }));
  }, []);

  const setText = useCallback((qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }, []);

  const results = useMemo(() => {
    if (phase !== "results") return null;
    let earned = 0;
    let possible = 0;
    const rows = sessionQuestions.map((question) => {
      if (question.type === "paragraph") {
        return {
          question,
          correct: null,
          userDisplay:
            typeof answers[question.id] === "string"
              ? answers[question.id]
              : "",
          explanation: question.sampleAnswer,
        };
      }
      if (question.type === "fill") {
        possible += 1;
        const userText =
          typeof answers[question.id] === "string" ? answers[question.id] : "";
        const ok = gradeFill(userText, question.acceptableAnswers);
        if (ok) earned += 1;
        return {
          question,
          correct: ok,
          userDisplay: userText || "(no answer)",
          explanation: question.correctDisplay,
        };
      }
      possible += 1;
      const selected = Array.isArray(answers[question.id])
        ? answers[question.id]
        : [];
      const ok = gradeMultiple(selected, question.correctIds);
      if (ok) earned += 1;
      const correctLabels = question.options
        .filter((o) => question.correctIds.includes(o.id))
        .map((o) => o.label);
      const userLabels = question.options
        .filter((o) => selected.includes(o.id))
        .map((o) => o.label);
      return {
        question,
        correct: ok,
        userDisplay: userLabels.length ? userLabels.join("; ") : "(no selection)",
        explanation: correctLabels.join("; "),
      };
    });
    const pct = possible ? Math.round((earned / possible) * 100) : 0;
    return { rows, earned, possible, pct };
  }, [phase, answers, sessionQuestions]);

  const start = () => {
    setSessionQuestions(buildSessionQuestions(questions));
    setAnswers({});
    setIndex(0);
    setPhase("quiz");
  };

  const finish = () => setPhase("results");

  const goNext = () => {
    if (index < totalSteps - 1) setIndex((i) => i + 1);
    else finish();
  };

  const goPrev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  if (phase === "intro") {
    return (
      <div className="mx-auto flex min-h-full max-w-lg flex-1 flex-col px-4 py-8 sm:py-12">
        <header className="mb-8 text-center">
          <p className="text-sm font-medium tracking-wide text-emerald-800 dark:text-emerald-400">
            Staff training review
          </p>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
            {quizMeta.subtitle}
          </p>
        </header>
        <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">
            {questions.length} questions across {Object.keys(topicLabels).length}{" "}
            areas (including Bible texts and Ellen G. White):
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-zinc-600 dark:text-zinc-400">
            {Object.values(topicLabels).map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
        <ul className="mb-8 space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li className="flex gap-2">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              •
            </span>
            One-answer questions use a single choice; multi-select questions
            tell you to choose every correct option.
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              •
            </span>
            Short fill-ins — wording can be flexible; match the idea closely.
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              •
            </span>
            Two short paragraph items are not scored; compare with sample ideas
            after submit.
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              •
            </span>
            Each new attempt shuffles question order and mixes answer choices
            so the quiz does not repeat the same sequence.
          </li>
        </ul>
        <button
          type="button"
          onClick={start}
          className="mt-auto min-h-12 rounded-xl bg-emerald-700 px-4 py-3 text-base font-medium text-white shadow-sm transition hover:bg-emerald-800 active:scale-[0.99] dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          Start quiz
        </button>
      </div>
    );
  }

  if (phase === "results" && results) {
    return (
      <div className="mx-auto flex min-h-full max-w-2xl flex-1 flex-col px-4 py-8 sm:py-10">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Your results
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Auto-graded score:{" "}
            <span className="font-semibold text-emerald-800 dark:text-emerald-400">
              {results.earned} / {results.possible}
            </span>{" "}
            ({results.pct}%)
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
            Paragraph questions are not included in the percentage; review them
            below with the sample responses.
          </p>
        </header>

        <ol className="flex flex-1 flex-col gap-4 pb-8">
          {results.rows.map((row, i) => (
            <li
              key={row.question.id}
              className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Question {i + 1}
                  </span>
                  {row.question.topicId ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-900 dark:bg-emerald-900/35 dark:text-emerald-300">
                      {topicLabels[row.question.topicId]}
                    </span>
                  ) : null}
                </div>
                {row.question.type === "paragraph" ? (
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    Reflection
                  </span>
                ) : row.correct ? (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400">
                    Correct
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
                    Review
                  </span>
                )}
              </div>
              <p className="mt-2 font-medium text-zinc-900 dark:text-zinc-100">
                {row.question.prompt}
              </p>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <span className="text-zinc-500 dark:text-zinc-500">
                    Your answer:{" "}
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                    {row.userDisplay}
                  </span>
                </p>
                <p>
                  <span className="text-zinc-500 dark:text-zinc-500">
                    {row.question.type === "paragraph"
                      ? "Sample answer / key ideas: "
                      : "Correct answer: "}
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                    {row.explanation}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="sticky bottom-0 -mx-4 flex flex-col gap-3 border-t border-zinc-200 bg-[var(--background)]/95 px-4 py-4 backdrop-blur dark:border-zinc-800 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={start}
            className="min-h-12 flex-1 rounded-xl bg-emerald-700 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 sm:max-w-xs"
          >
            New attempt (shuffled)
          </button>
          <button
            type="button"
            onClick={() => {
              setPhase("intro");
              setSessionQuestions([]);
              setAnswers({});
              setIndex(0);
            }}
            className="min-h-12 flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base font-medium text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 sm:max-w-xs"
          >
            Back to start
          </button>
        </div>
      </div>
    );
  }

  const selected = Array.isArray(answers[q.id]) ? answers[q.id] : [];
  const textVal = typeof answers[q.id] === "string" ? answers[q.id] : "";
  const singleSelect =
    q.type === "multiple" && q.correctIds.length === 1;
  const topicLabel = q.topicId ? topicLabels[q.topicId] : null;

  if (!q) {
    return (
      <div className="mx-auto flex min-h-full max-w-lg flex-1 items-center justify-center px-4 py-12 text-zinc-600 dark:text-zinc-400">
        Loading…
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-full max-w-lg flex-1 flex-col px-4 py-6 sm:py-10">
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs font-medium text-zinc-500">
          <span>
            Question {index + 1} of {totalSteps}
          </span>
          <span>{Math.round(((index + 1) / totalSteps) * 100)}%</span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
        >
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-300 dark:bg-emerald-500"
            style={{ width: `${((index + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {topicLabel ? (
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
          {topicLabel}
        </p>
      ) : null}
      <h2 className="text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50 sm:text-xl">
        {q.prompt}
      </h2>
      {q.type === "multiple" ? (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
          {singleSelect
            ? "Select the one best answer."
            : "Select all that apply."}
        </p>
      ) : null}

      {q.type === "multiple" && singleSelect && (
        <fieldset className="mt-6 space-y-3">
          <legend className="sr-only">Answer choices</legend>
          {q.options.map((opt) => {
            const checked = selected.includes(opt.id);
            return (
              <label
                key={opt.id}
                className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${
                  checked
                    ? "border-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/40"
                    : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  checked={checked}
                  onChange={() => setSingle(q.id, opt.id)}
                  className="mt-1 size-5 shrink-0 border-zinc-300 text-emerald-700 focus:ring-emerald-600"
                />
                <span className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {opt.label}
                </span>
              </label>
            );
          })}
        </fieldset>
      )}

      {q.type === "multiple" && !singleSelect && (
        <fieldset className="mt-6 space-y-3">
          <legend className="sr-only">Answer choices</legend>
          {q.options.map((opt) => {
            const checked = selected.includes(opt.id);
            return (
              <label
                key={opt.id}
                className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${
                  checked
                    ? "border-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/40"
                    : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    setMultiple(q.id, opt.id, e.target.checked)
                  }
                  className="mt-1 size-5 shrink-0 rounded border-zinc-300 text-emerald-700 focus:ring-emerald-600"
                />
                <span className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {opt.label}
                </span>
              </label>
            );
          })}
        </fieldset>
      )}

      {q.type === "fill" && (
        <div className="mt-6">
          <label htmlFor={`fill-${q.id}`} className="sr-only">
            Your answer
          </label>
          <input
            id={`fill-${q.id}`}
            type="text"
            value={textVal}
            onChange={(e) => setText(q.id, e.target.value)}
            autoComplete="off"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            placeholder="Type your answer"
          />
        </div>
      )}

      {q.type === "paragraph" && (
        <div className="mt-6">
          <label htmlFor={`para-${q.id}`} className="sr-only">
            Your response
          </label>
          <textarea
            id={`para-${q.id}`}
            value={textVal}
            onChange={(e) => setText(q.id, e.target.value)}
            rows={6}
            className="w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            placeholder="Write a few sentences…"
          />
        </div>
      )}

      <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          className="min-h-12 rounded-xl border border-zinc-300 px-4 py-3 text-base font-medium text-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-600 dark:text-zinc-200"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={goNext}
          className="min-h-12 rounded-xl bg-emerald-700 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-800 active:scale-[0.99] dark:bg-emerald-600 dark:hover:bg-emerald-500 sm:min-w-[8rem]"
        >
          {index === totalSteps - 1 ? "See results" : "Next"}
        </button>
      </div>
    </div>
  );
}
