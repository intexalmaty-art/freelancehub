import { GoogleGenAI } from "@google/genai";
import { specialists, categories } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `Вы — ИИ-ассистент биржи фриланса FreelanceHub. 
Ваша цель — помогать клиентам находить подходящих специалистов.

Доступные категории: ${categories.map(c => c.name).join(", ")}.
Доступные специалисты (база данных):
${specialists.map(s => `- ${s.name}: ${s.role}. Навыки: ${s.tags.join(", ")}. Описание: ${s.description}. Рейтинг: ${s.rating}. Город: ${s.city}.`).join("\n")}

Инструкции:
1. Если пользователь ищет специалиста, проанализируйте его запрос и предложите наиболее подходящих людей из нашей базы.
2. Объясняйте, почему именно эти специалисты подходят.
3. Если в базе нет точного совпадения, предложите наиболее близких по навыкам или посоветуйте категорию.
4. Отвечайте вежливо, профессионально и кратко. Используйте форматирование (жирный текст, списки).
5. Всегда пишите на русском языке.
6. Если пользователь просто здоровается, расскажите кратко чем можете помочь.`;

export async function chatWithAI(message: string, history: { role: 'user' | 'model', parts: [{ text: string }] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return response.text || "Извините, я не смог обработать ваш запрос. Попробуйте еще раз.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Произошла ошибка при общении с ИИ. Пожалуйста, проверьте подключение.";
  }
}
