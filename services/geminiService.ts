import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODEL_NAME = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `
Eres un asistente experto en Generación de Datos de Prueba (TDM - Test Data Management). 
Tu objetivo es generar datos sintéticos realistas y coherentes en formato JSON estándar (RFC 8259).

REGLAS ESTRICTAS:
1. SIEMPRE debes responder con un array de objetos JSON válido.
2. Usa comillas dobles (") para todas las claves y valores de cadena.
3. NO incluyas comentarios (// o /* */) dentro del JSON.
4. NO uses comas al final del último elemento de un array u objeto (trailing commas).
5. El idioma de los datos generados debe ser ESPAÑOL.
6. NO incluyas markdown (\`\`\`json), bloques de código, ni texto adicional fuera del JSON. Devuelve SOLO el JSON crudo.
`;

const cleanResponse = (text: string): string => {
  if (!text) return "[]";
  let cleaned = text.trim();
  // Remove markdown code blocks if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(json)?/i, "").replace(/```$/, "");
  }
  return cleaned.trim();
};

export const generateDataFromPrompt = async (prompt: string): Promise<any[]> => {
  try {
    const fullPrompt = `
    Genera datos sintéticos basados en la siguiente petición: "${prompt}".
    Asegúrate de devolver ÚNICAMENTE un array JSON crudo y válido.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const text = response.text || "[]";
    const cleanedText = cleanResponse(text);
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating data from prompt:", error);
    throw new Error("No se pudo interpretar la respuesta como JSON válido. Intenta simplificar la instrucción.");
  }
};

export const generateDataFromFields = async (fields: string[], count: number): Promise<any[]> => {
  try {
    const fieldList = fields.join(', ');
    const fullPrompt = `
    Genera exactamente ${count} registros de datos sintéticos.
    Los objetos deben tener las siguientes propiedades (campos): ${fieldList}.
    Los datos deben parecer reales y variados.
    Devuelve un array JSON crudo.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const text = response.text || "[]";
    const cleanedText = cleanResponse(text);
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating data from fields:", error);
    throw new Error("Error al procesar los datos generados. Por favor intenta de nuevo.");
  }
};