
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateSummary(title: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        `Generate a short, engaging one-sentence summary for a blog post titled: "${title}"`
      );
      const response = await result.response;
      return response.text() || "No summary generated.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Failed to generate summary.";
    }
  }

  async suggestContentOutline(title: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        `Create a brief HTML-formatted outline (using h2 and p tags) for a blog post titled: "${title}"`
      );
      const response = await result.response;
      return response.text() || "<p>No outline generated.</p>";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "<p>Failed to generate outline.</p>";
    }
  }
}

export const geminiService = new GeminiService();
