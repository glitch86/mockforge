import * as z from "zod";

export const formSchema = z.object({
  username: z.string().min(2, "Username too short"),
  email: z.string().email("Invalid email"),
});