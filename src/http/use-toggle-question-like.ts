import { useMutation, useQueryClient } from "@tanstack/react-query";
import { voterId } from "@/lib/voter-id";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-response";

type ToggleQuestionLikeRequest = {
  questionId: string;
  liked: boolean;
};

export function useToggleQuestionLike(roomId: string) {
  const queryClient = useQueryClient();
  const queryKey = ["get-questions", roomId];

  return useMutation({
    mutationKey: ["room", roomId, "toggle-question-like"],
    mutationFn: async ({ questionId, liked }: ToggleQuestionLikeRequest) => {
      const response = liked
        ? await fetch(`http://localhost:3333/questions/${questionId}/likes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ voterId }),
          })
        : await fetch(
            `http://localhost:3333/questions/${questionId}/likes/${voterId}`,
            { method: "DELETE" }
          );

      if (!response.ok) {
        throw new Error("Failed to toggle question like");
      }
    },

    async onMutate({ questionId, liked }) {
      await queryClient.cancelQueries({ queryKey });

      const questions =
        queryClient.getQueryData<GetRoomQuestionsResponse>(queryKey);

      queryClient.setQueryData<GetRoomQuestionsResponse>(queryKey, (current) =>
        current?.map((question) =>
          question.id === questionId
            ? {
                ...question,
                likedByMe: liked,
                likesCount: question.likesCount + (liked ? 1 : -1),
              }
            : question
        )
      );

      return { questions };
    },

    onError(_error, _variables, context) {
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        queryKey,
        context?.questions
      );
    },
  });
}
