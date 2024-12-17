"use server";//Validation on the server side

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import {parseWithZod} from "@conform-to/zod"
import { onboardingSchemaValidation, settingSchema } from "./lib/zodSchema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
            image: submission.value.image,//and update the profile pictire
        }
    });
    return redirect("/dashboard")
}

export async function updateAvailabilityAction(formData: FormData) {
    const session = await requireUser();

    //the Object.fromEntries() function is used to convert a FormData
    //object into a JavaScript object where the (arrays first element) keys are the form field names
    //and the (the array second element)values are the form field values
    const rawData = Object.fromEntries(formData.entries());

    //we us the Object.keys() function to get the keys of the rawData object
    //and then use the filter() method to get the keys that start with "id-"
    //this will return an array of keys that start with "id-"
    //then we use the map() method to iterate over the array of keys
    //and for each key, we use the replace() method to remove the "id-" prefix and just have the id of the item 
    //and then we return an object with the id, isActive, fromTime, and toTime properties
    //this object will be used to update the availability in the database
    const availabilityData = Object.keys(rawData).filter((key) => 
        key.startsWith("id-")
    ).map ((key) => {
        const id = key.replace("id-", "");
        return {// we have seven switches and select components for availability so we need to create an object with the isActive, fromTime, and toTime properties maps to one id of the sevent switches and select components
            id: id,
            isActive: rawData[`isActive-${id}`] === "on",
            fromTime: rawData[`fromTime-${id}`] as string,
            toTime: rawData[`toTime-${id}`] as string,
        }
    });

    try {
        //the prisma.$transaction() function is used to execute multiple database operations in a single transaction
        //the prisma.availability.update() function is used to update the availability in the database
        //where the item.id is equal to the id of the availability item
        //and the data is an array of availability items
        await prisma.$transaction(
            availabilityData.map((item) => prisma.availability.update({
                where:{
                    id; item.id,
                },
                data: {
                    isActive: item.isActive,
                    fromTime: item.fromTime,
                    toTime: item.toTime
                }
            }))
        )
        //so the revalidatePath () forces next js to update the data 
        //that has been changed on that specific path as oppose to rerendering 
        //or caching the un updated version
        revalidatePath("/dashboard/availability")
    } catch (error) {
        console.log("something went wrong when trying to update availability", error);
    }
}
