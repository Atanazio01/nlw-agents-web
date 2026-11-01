import { useIsMutating, useQuery } from "@tanstack/react-query";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-response";

const refetchIntervalInMs = 3000;

export function useRoomQuestions(roomId: string) {
  // polling would overwrite optimistic updates while they are in flight
  const hasPendingMutation =
    useIsMutating({ mutationKey: ["room", roomId] }) > 0;

  return useQuery({
    queryKey: ["get-questions", roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`
      );
      const result: GetRoomQuestionsResponse = await response.json();

      return result;
    },
    refetchInterval: hasPendingMutation ? false : refetchIntervalInMs,
  });
}
