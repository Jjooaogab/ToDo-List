import { z } from "zod";

export const CheckSchema = z.object({
  checked: z.boolean().default(false).optional()
})