import { z } from "zod";

export const formSchema = z.object({
  content: z.string().min(1,"*必須項目です"),
});

export type inputType = z.infer<typeof formSchema>;
