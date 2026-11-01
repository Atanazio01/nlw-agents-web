import { useMutation } from "@tanstack/react-query";

export function useUploadAudio(roomId: string) {
  return useMutation({
    mutationFn: async (audio: Blob) => {
      const formData = new FormData();
      formData.append("file", audio, "audio.webm");

      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/audio`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload audio");
      }
    },
  });
}
