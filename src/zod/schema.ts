import { z } from "zod";

export const botSchema = z.object({
    language: z.string().default("english"),
    id: z.number().default(0),
    text: z.string().default(""),
    file: z.string().nullable().default(null),
})

// export const botSchema = z.any()