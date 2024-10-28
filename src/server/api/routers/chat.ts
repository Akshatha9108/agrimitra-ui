import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { fileManager, model } from "@/lib/ai";
import { botSchema } from "@/zod/schema";
import path from "path";
import fs from "fs";

// Store chat sessions by user/session ID
const chatSessions = new Map();

export const chatRouter = createTRPCRouter({
  test: publicProcedure.input(botSchema).mutation(async ({ input }) => {
    // Get or create chat session
    if (input.id === 1) {
      // Start new chat session
      const newChat = model.startChat();
      chatSessions.set("default", newChat); // Using "default" as session ID for now
    }

    // Get current chat session
    const currentChat = chatSessions.get("default");
    if (!currentChat) {
      throw new Error("Chat session not found");
    }

    if (input.file) {
      //add file to conversation
      const base64Data = input.file.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const file = new File([buffer], "image.jpg", { type: "image/jpeg" });

      const filePath = path.join(".", "uploads", "gemini_input.jpg");

      // Save the file
      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          console.error("Error saving file:", err);
        } else {
          console.log("File saved successfully:", filePath);
        }
      });

      const uploadResult = await fileManager.uploadFile(filePath, {
        mimeType: file.type,
        displayName: "image input from user based on plants",
      });

      const botResponse = await currentChat.sendMessage([
        `${input.text}. Please provide response in ${input.language}`,
        {
            inlineData: {
                data: buffer.toString("base64"),
                mimeType: file.type,
            }
        }
      ]);

      const response = botResponse.response.text();

      return {
        response: response,
      }
    }

    const botResponse = await currentChat.sendMessage(`${input.text}. Please provide response in ${input.language}`);

    const response = botResponse.response.text();

    return {
      response: response,
    };
  }),
});
