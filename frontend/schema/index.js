import * as z from "zod"

export const SignupSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  firstName: z.string().min(1, {
    message: "Please enter your first name",
  }),
  lastName: z.string().min(1, {
    message: "Please enter your last name",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  // Make sure the passwords match
  confirmPasswordMatch: z
    .string()
    .min(6)
    .refine((val, ctx) => val === ctx.parent.password, {
      message: "Passwords must match",
    }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(6, {
    message: "Please enter a valid password"
  }),
})


export const MessageSchema = z.object({
  message: z
    .string()
    .min(150, { message: "Message must be at least 150 characters" })
    .refine(
      (text) => {
        // Better approach for English language detection
        try {
          // Check for a high percentage of Latin script characters
          const nonLatinChars = text.replace(/[a-zA-Z0-9\s.,!?'"@#$%^&*()_+\-=\[\]{}|\\:;<>()%]/g, '');
          // Allow some non-Latin characters (like emojis or occasional foreign words)
          const nonLatinRatio = nonLatinChars.length / text.length;
          return nonLatinRatio < 0.15; // Text is probably English if less than 15% non-Latin chars
        } catch (error) {
          return false;
        }
      },
      { message: "Message must be primarily in English" }
    ),
});