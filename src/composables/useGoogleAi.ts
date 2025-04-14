import { GoogleGenAI } from "@google/genai";
import { ref } from "vue";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAtmWsntZS9TiSd6UyDgioCBgaru3CpVlc",
});

const useGoogleAI = () => {
  const isLoading = ref(false);

  async function sendToAI(userMessage: string | undefined) {
    if (!userMessage) {
      return {
        isSuccess: false,
        message: "Ingresa un mensaje.",
      };
    }

    isLoading.value = true;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userMessage,
    });
    isLoading.value = false;

    return {
      isSuccess: true,
      response: response.text,
    };
  }

  return {
    sendToAI,
    isLoading,
  };
};

export default useGoogleAI;
