import { useEffect, useRef, useState } from 'react';

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

const chunkDurationInMs = 5000;

type RecordingSession = {
  stream: MediaStream;
  recorder: MediaRecorder;
  chunkTimer: ReturnType<typeof setInterval>;
  clockTimer: ReturnType<typeof setInterval>;
};

function endSession(session: RecordingSession) {
  clearInterval(session.chunkTimer);
  clearInterval(session.clockTimer);

  if (session.recorder.state !== 'inactive') {
    session.recorder.stop();
  }

  for (const track of session.stream.getTracks()) {
    track.stop();
  }
}

export function useAudioRecorder(onChunk: (audio: Blob) => void) {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const session = useRef<RecordingSession | null>(null);

  useEffect(
    () => () => {
      if (session.current) {
        endSession(session.current);
      }
    },
    []
  );

  async function start() {
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação');
      return;
    }

    const stream = await navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100,
        },
      })
      .catch(() => null);

    if (!stream) {
      alert('Não foi possível acessar o microfone');
      return;
    }

    function createRecorder(audio: MediaStream) {
      const recorder = new MediaRecorder(audio, {
        mimeType: 'audio/webm',
        audioBitsPerSecond: 64_000,
      });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          onChunk(event.data);
        }
      };

      recorder.start();
      return recorder;
    }

    const current: RecordingSession = {
      stream,
      recorder: createRecorder(stream),
      chunkTimer: setInterval(() => {
        current.recorder.stop();
        current.recorder = createRecorder(stream);
      }, chunkDurationInMs),
      clockTimer: setInterval(() => {
        setElapsedSeconds((seconds) => seconds + 1);
      }, 1000),
    };

    session.current = current;
    setIsRecording(true);
  }

  function stop() {
    if (session.current) {
      endSession(session.current);
      session.current = null;
    }

    setIsRecording(false);
  }

  return { isRecording, elapsedSeconds, start, stop };
}
