import { useState } from 'react';
import { QuestionItem } from '@/components/question-item';
import { Button } from '@/components/ui/button';
import type { GetRoomQuestionsResponse } from '@/http/types/get-room-questions-response';
import { useRoomQuestions } from '@/http/use-room-questions';
import { useToggleQuestionLike } from '@/http/use-toggle-question-like';

type SortMode = 'popular' | 'recent';

type Question = GetRoomQuestionsResponse[number];

const sortModes: Array<{ value: SortMode; label: string }> = [
  { value: 'popular', label: 'Populares' },
  { value: 'recent', label: 'Recentes' },
];

function byPopularity(a: Question, b: Question) {
  return b.likesCount - a.likesCount || b.createdAt.localeCompare(a.createdAt);
}

interface QuestionListProps {
  roomId: string;
}

export function QuestionList({ roomId }: QuestionListProps) {
  const [sortMode, setSortMode] = useState<SortMode>('popular');
  const { data } = useRoomQuestions(roomId);
  const { mutate: toggleLike } = useToggleQuestionLike(roomId);

  const questions =
    sortMode === 'popular' && data ? [...data].sort(byPopularity) : data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>

        <div className="flex gap-1 rounded-lg bg-zinc-900 p-1">
          {sortModes.map(({ value, label }) => (
            <Button
              key={value}
              onClick={() => setSortMode(value)}
              size="sm"
              variant={sortMode === value ? 'secondary' : 'ghost'}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {questions?.map((question) => (
        <QuestionItem
          key={question.id}
          onToggleLike={(liked) =>
            toggleLike({ questionId: question.id, liked })
          }
          question={question}
        />
      ))}
    </div>
  );
}
