import { QuestionItem } from '@/components/question-item';
import { useRoomQuestions } from '@/http/use-room-questions';

interface QuestionListProps {
  roomId: string;
}

export function QuestionList({ roomId }: QuestionListProps) {
  const { data } = useRoomQuestions(roomId);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-2xl text-foreground">
        Perguntas & Respostas
      </h2>

      {data?.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
}
