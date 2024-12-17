"use server";//Validation on the server side

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import {parseWithZod} from "@conform-to/zod"
import { onboardingSchemaValidation, settingSchema } from "./lib/zodSchema";
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
            name: submission.value.fullName,
            availability: {
                createMany:{
                    data: [
                        {
                            day: "Monday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Tuesday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Wednesday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Thursday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Friday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Saturday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        },
                        {
                            day: "Sunday",
                            fromTime: "08:00",
                            tillTime: "18:00",
                        }
                    ],
                },
            },
        }
    })

    return redirect("/onboarding/grant-id")
}

export async function SettingsActions(prevState: any, formData: FormData){
    const session = await requireUser();

    const submission = await parseWithZod(formData, {
        schema: settingSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    //
    const user = await prisma.user.update({
        where: {
            id: session.user?.id,//this tells the program what user to update
        },
        data: {
            name: submission.value.fullName,//we want to update the name
            image: submission.value.profileImage,//and update the profile pictire
        }
    });
    return redirect("/dashboard")
}