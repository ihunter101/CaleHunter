import { conformZodMessage } from '@conform-to/zod';
import { z } from 'zod';


export const onboardingSchema = z.object({
      fullName: z.string().min(2).max(150).refine((val) => val.length >= 5, "Full name must be no less than 5 or greater than 150 characters"),
      userName: z.
      string().
      min(2).
      max(150).
      regex(/^[a-zA-Z-0-9]+$/, {
        message: 'Username can only contain letters, numbers, and hyphens',
      })

});

export function onboardingSchemaValidation(options?: {
      isUserNameUnique: () => Promise<boolean>;
}) {
      return z.object({
            userName: z.
            string().
            min(2).
            max(150).
            regex(/^[a-zA-Z-0-9]+$/, {
              message: 'Username can only contain letters, numbers, and hyphens',
            }).pipe(
                  z.string().superRefine((_,ctx) => {
                  if (typeof options?.isUserNameUnique !== "function") {
                        ctx.addIssue({
                              code: "custom",
                              message: conformZodMessage.VALIDATION_UNDEFINED,
                              fatal: true,
                        });
                        return
                  }
                  return options?.isUserNameUnique().then((isUnique) => {
                        if (!isUnique) {
                              ctx.addIssue({
                                    code: "custom",
                                    message: "Username already exists",
                              });
                        }
                  })
            
            }),

      ),
      fullName: z.string().min(2).max(150).refine((val) => val.length >= 5, "Full name must be no less than 5 or greater than 150 characters"),
      })
}

export const settingSchema = z.object({
      fullName: z.string().min(3).max(150),
      profileImage: z.string(),
})