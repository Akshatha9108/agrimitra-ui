import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { fileManager, model } from "@/lib/ai";
import { botSchema } from "@/zod/schema";
import path from "path";
import fs from "fs";

let chat = model.startChat();

export const chatRouter = createTRPCRouter({
  test: publicProcedure.input(botSchema).mutation(async ({ input }) => {
    if (input.id === 1) {
      // conversation start

      chat = model.startChat();
    }

    if (input.file) {
      //add file to conversation
      const base64Data = input.file.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const file = new File([buffer], "image.jpg", { type: "image/jpeg" });

      const filePath = path.join(".","uploads", "gemini_input.jpg");

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

      const botResponse = await model.generateContent([
        `${input.text}. Please provide response in ${input.language}`,
        {
            // fileData: {
            //     fileUri: uploadResult.file.uri,
            //     mimeType: uploadResult.file.mimeType,
            // }
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

    const botResponse = await chat.sendMessage(`${input.text}. Please provide response in ${input.language}`,);

    const response = botResponse.response.text();

    return {
      response: response,
    };
  }),
});
