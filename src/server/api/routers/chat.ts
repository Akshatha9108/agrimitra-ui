import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { model } from "@/lib/ai";
import { botSchema } from "@/zod/schema";
import fetch from 'node-fetch';

export const chatRouter = createTRPCRouter({
    test: publicProcedure.input(botSchema).mutation(async({ input }) => {
        const base64Image = input.file; // Assuming input.file contains the base64 string

    if (base64Image) {
      // Extract the base64 part from the data URL
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
      const file = new File([buffer], 'image.jpg', { type: 'image/jpeg' });

      console.log(file);
      

      // Define the file path and name
    //   const filePath = path.join(__dirname, 'uploads', 'image.jpg');

    //   // Save the file
    //   fs.writeFile(filePath, buffer, (err) => {
    //     if (err) {
    //       console.error('Error saving file:', err);
    //     } else {
    //       console.log('File saved successfully:', filePath);
    //     }
    //   });
    }
        
        return {
            greeting: `Hello`,
        }
    }),
    
    // bot: publicProcedure.input()
})