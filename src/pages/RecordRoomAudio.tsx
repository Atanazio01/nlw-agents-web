import { ArrowLeft, Mic, Pause } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { QuestionList } from '@/components/question-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { useUploadAudio } from '@/http/use-upload-audio';

type RoomParams = {
  roomId: string;
};

function formatElapsed(totalSeconds: number) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return <LessonRecorder roomId={params.roomId} />;
}

function LessonRecorder({ roomId }: { roomId: string }) {
  const { mutate: uploadAudio } = useUploadAudio(roomId);
  const { isRecording, elapsedSeconds, start, stop } =
    useAudioRecorder(uploadAudio);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4">
            <Link to={`/room/${roomId}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Voltar para a sala
              </Button>
            </Link>
          </div>
          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Gravação da aula
          </h1>
          <p className="text-muted-foreground">
            Enquanto a gravação estiver ativa, sua fala é usada pela IA para
            responder as perguntas da sala.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={
                  isRecording
                    ? 'size-3 animate-pulse rounded-full bg-red-500'
                    : 'size-3 rounded-full bg-zinc-600'
                }
              />
              <span className="font-medium">
                {isRecording ? 'Gravando' : 'Pausado'}
              </span>
              <span className="font-mono text-muted-foreground">
                {formatElapsed(elapsedSeconds)}
              </span>
            </div>

            {isRecording ? (
              <Button onClick={stop} variant="secondary">
                <Pause className="mr-2 size-4" />
                Pausar gravação
              </Button>
            ) : (
              <Button onClick={start}>
                <Mic className="mr-2 size-4" />
                Gravar áudio
              </Button>
            )}
          </CardContent>
        </Card>

        <QuestionList roomId={roomId} />
      </div>
    </div>
  );
}
