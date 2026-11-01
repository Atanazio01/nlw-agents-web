import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "./types/create-question-request";
import type { CreateQuestionResponse } from "./types/create-question-response";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-response";

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();
  const queryKey = ["get-questions", roomId];

  return useMutation({
    mutationKey: ["room", roomId, "create-question"],
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create question");
      }

      const result: CreateQuestionResponse = await response.json();
      return result;
    },

    async onMutate({ question }) {
      await queryClient.cancelQueries({ queryKey });

      const questions =
        queryClient.getQueryData<GetRoomQuestionsResponse>(queryKey);

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        likesCount: 0,
        likedByMe: false,
        isGeneratingAnswer: true,
      };

      queryClient.setQueryData<GetRoomQuestionsResponse>(queryKey, [
        newQuestion,
        ...(questions ?? []),
      ]);

      return { newQuestion, questions };
    },

    onSuccess(data, _variables, context) {
      queryClient.setQueryData<GetRoomQuestionsResponse>(queryKey, (questions) =>
        questions?.map((question) =>
          question.id === context.newQuestion.id
            ? {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false,
              }
            : question
        )
      );
    },

    onError(_error, _variables, context) {
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        queryKey,
        context?.questions
      );
    },
  });
}
