import { z } from "zod";

export const regions = ["The Coast", "The Tea Hills", "The Old Cities", "The Wild South"] as const;
// Budget bands are per person, excluding international flights, with no gaps. Confirm figures with the studio.
export const budgets = ["Under £3,000", "£3,000 to £5,000", "£5,000 to £8,000", "£8,000 and above", "Not sure yet"] as const;

export const stepSchemas = [
  z.object({ where: z.array(z.string()).min(1, "Pick at least one place, or choose 'Not sure yet'.") }),
  z.object({ month: z.string().min(1, "Choose a month."), nights: z.string().min(1, "Choose a rough length.") }),
  z.object({
    adults: z.coerce.number().int().min(1, "At least one adult.").max(20),
    children: z.coerce.number().int().min(0).max(20),
    pace: z.string().min(1, "Choose a pace."),
  }),
  z.object({ budget: z.string().min(1, "Choose a range.") }),
  z.object({
    name: z.string().trim().min(2, "Tell us your name."),
    email: z.string().trim().email("That email doesn't look right."),
    phone: z.string().trim().optional(),
    message: z.string().trim().max(2000).optional(),
  }),
];

export const enquirySchema = z.object({
  where: z.array(z.string()).min(1),
  month: z.string().min(1),
  nights: z.string().min(1),
  adults: z.coerce.number().int().min(1).max(20),
  children: z.coerce.number().int().min(0).max(20),
  pace: z.string().min(1),
  budget: z.string().min(1),
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  message: z.string().trim().max(2000).optional(),
});

export type Enquiry = z.infer<typeof enquirySchema>;
