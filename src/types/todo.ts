import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "*必須項目です。",
  }),
  content: z.string().min(1, {
    message: "*必須項目です。",
  }),
});

export type inputType = z.infer<typeof formSchema>;
