import { GoogleGenAI, Modality } from "@google/genai";
import type { ImageState } from "../types";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI(AIzaSyAgkcOEvket13u72_a8bq7Gd_dxz_CEIRY);

export async function editImageWithGemini(
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    } else {
      console.error("Gemini API response did not contain image data:", response);
      throw new Error("No image data returned from API.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to edit image. Please check the console for details.");
  }
}

export async function fuseImagesWithGemini(
  baseImage1: ImageState,
  baseImage2: ImageState,
  prompt: string
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
           {
            text: prompt,
          },
          {
            inlineData: {
              data: baseImage1.base64,
              mimeType: baseImage1.mimeType,
            },
          },
          {
            inlineData: {
              data: baseImage2.base64,
              mimeType: baseImage2.mimeType,
            },
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    } else {
      console.error("Gemini API response did not contain image data:", response);
      throw new Error("No image data returned from API.");
    }
  } catch (error) {
    console.error("Error calling Gemini API for image fusion:", error);
    throw new Error("Failed to fuse images. Please check the console for details.");
  }
}
