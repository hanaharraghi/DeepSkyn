import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    // 1. Get the key from process.env
    const apiKey = process.env.GEMINI_API_KEY;

    // 2. Validate that the key exists
    if (!apiKey) {
      throw new Error(
        'GEMINI_API_KEY is not defined. Please add it to your .env file.',
      );
    }

    // 3. Now TypeScript knows apiKey is a string
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async analyzeImage(fileBuffer: Buffer, mimeType: string) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Analyze this human face for skincare purposes. 
      Return ONLY a raw JSON object with the following structure:
      {
        "skinType": "string",
        "healthScore": number,
        "skinAge": number,
        "summary": "string",
        "concerns": [{"label": "string", "severity": "Mild/Moderate/High", "description": "string"}],
        "morningRoutine": [{"step": "string", "product": "string", "time": "string"}],
        "eveningRoutine": [{"step": "string", "product": "string", "time": "string"}]
      }
      Be professional, accurate, and concise.
    `;

    const imagePart = {
      inlineData: {
        data: fileBuffer.toString('base64'),
        mimeType,
      },
    };

    try {
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      // Clean the string in case Gemini adds markdown backticks (```json ... ```)
      const cleanJson = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (error) {
      console.error('Gemini Analysis Error:', error);
      throw new Error('Failed to analyze image with AI');
    }
  }
}