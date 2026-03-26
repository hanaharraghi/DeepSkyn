<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
=======
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
>>>>>>> 575955a (backend v2.2)
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
<<<<<<< HEAD
    // 1. Get the key from process.env
    const apiKey = process.env.GEMINI_API_KEY;

    // 2. Validate that the key exists
    if (!apiKey) {
      throw new Error(
=======
    const apiKey = process.env.GEMINI_API_KEY;

    console.log('Initializing GeminiService...');
    console.log('GEMINI_API_KEY exists:', !!apiKey);

    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing in environment variables');
      throw new InternalServerErrorException(
>>>>>>> 575955a (backend v2.2)
        'GEMINI_API_KEY is not defined. Please add it to your .env file.',
      );
    }

<<<<<<< HEAD
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
=======
    this.genAI = new GoogleGenerativeAI(apiKey);
    console.log('GeminiService initialized successfully');
  }

  async analyzeImage(fileBuffer: Buffer, mimeType: string) {
    console.log('--- analyzeImage started ---');
    console.log('Mime type:', mimeType);
    console.log('Buffer size:', fileBuffer?.length || 0);

    if (!fileBuffer || fileBuffer.length === 0) {
      throw new HttpException(
        { message: 'Empty image buffer received' },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // IMPORTANT:
      // gemini-1.5-flash is shut down.
      // Use a current model instead.
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
      });

      const prompt = `
Analyze this human face for skincare purposes.

Return ONLY a valid raw JSON object with this exact structure:
{
  "skinType": "string",
  "healthScore": number,
  "skinAge": number,
  "summary": "string",
  "concerns": [
    {
      "label": "string",
      "severity": "Mild/Moderate/High",
      "description": "string"
    }
  ],
  "morningRoutine": [
    {
      "step": "string",
      "product": "string",
      "time": "string"
    }
  ],
  "eveningRoutine": [
    {
      "step": "string",
      "product": "string",
      "time": "string"
    }
  ]
}

Rules:
- Do not add markdown
- Do not add explanation text
- Do not wrap the JSON in triple backticks
- Return only the JSON object
`;

      const imagePart = {
        inlineData: {
          data: fileBuffer.toString('base64'),
          mimeType,
        },
      };

      console.log('Sending request to Gemini...');

>>>>>>> 575955a (backend v2.2)
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

<<<<<<< HEAD
      // Clean the string in case Gemini adds markdown backticks (```json ... ```)
      const cleanJson = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (error) {
      console.error('Gemini Analysis Error:', error);
      throw new Error('Failed to analyze image with AI');
=======
      console.log('Gemini raw response:');
      console.log(text);

      const cleanJson = text.replace(/```json|```/gi, '').trim();

      console.log('Cleaned Gemini response:');
      console.log(cleanJson);

      try {
        const parsed = JSON.parse(cleanJson);
        console.log('JSON parsed successfully');
        return parsed;
      } catch (parseError: any) {
        console.error('JSON parse failed:', parseError?.message || parseError);

        throw new HttpException(
          {
            message: 'Gemini returned invalid JSON',
            rawResponse: text,
            parseError: parseError?.message || 'Unknown parse error',
          },
          HttpStatus.BAD_GATEWAY,
        );
      }
    } catch (error: any) {
      console.error('Gemini Analysis Error:', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          message: 'Failed to analyze image with AI',
          details: error?.message || 'Unknown Gemini error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
>>>>>>> 575955a (backend v2.2)
    }
  }
}