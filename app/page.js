import Image from "next/image";
import { quizMeta } from "./data/quizData";
import PathfinderTrainingQuiz from "./components/PathfinderTrainingQuiz";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="shrink-0 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <Image
            src="/logo.png"
            alt="Master Guide emblem"
            width={48}
            height={48}
            priority
            className="h-12 w-12 shrink-0 object-contain"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
              {quizMeta.title}
            </p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              Seventh-day Adventist youth ministries
            </p>
          </div>
        </div>
      </header>
      <PathfinderTrainingQuiz />
    </div>
  );
}
