"use server";//Validation on the server side

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import {parseWithZod} from "@conform-to/zod"
import { onboardingSchemaValidation } from "./lib/zodSchema";
import { redirect } from "next/navigation";

export  async function OnboardingAction(prevState: any, formData: FormData){// the prevState is the previous state of the form needed for the useform in page.tsx onboarding route
     const session = await requireUser();//get the user whose session is currently valid 
    //checking our form data against our zod schema 
    const submission = await parseWithZod(formData, { 
        schema: onboardingSchemaValidation({
            async isUserNameUnique(){
                const existingUserName = await prisma.user.findUnique({
                    where: {
                        userName: formData.get("userName") as string,
                    }
                });
                    return !existingUserName;
            },
        }),
        async: true
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where:{
            id: session.user?.id,
        },
        data: {
            userName: submission.value.userName,
            name: submission.value.fullName
        }
    })

    return redirect("/onboarding/grant-id")
}