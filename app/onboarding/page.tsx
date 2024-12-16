"use client";

import { Button } from "@/components/ui/button";
import { Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { OnboardingAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { OnboardingSchema } from "../lib/zodSchema";
import { SubmitButton } from "../components/SumbitButton";

export default function OnboardingRoute() {
    const [lastResult, action] = useFormState(OnboardingAction, undefined);

    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}) {
            return parseWithZod(formData, {
                schema: OnboardingSchema,
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Cale<span className="text-primary">Hunter</span></CardTitle>
                    <CardDescription>We Need the following inoformation to set up your profile!</CardDescription>
                </CardHeader>
               <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <CardContent className="flex flex-col gap-y-5">
                            <div className="grid gap-y-2">
                                <Label>FullName</Label>
                                <Input 
                                name={fields.fullName.name} 
                                defaultValue={fields.fullName.initialValue} 
                                key={fields.fullName.key}
                                placeholder="CaleHunter"/>
                            </div>

                            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>

                            <div className="grid gap-y-2">
                                <Label>Username</Label>
                                <div className="flex rounded-md">
                                    <span className="
                                    inline-flex items-center px-3 rounded-l-md 
                                    border-r-0 border-muted bg-muted 
                                    text-muted-foreground text-sm">CaleHunter.com/</span>
                                    <Input 
                                    placeholder="example-user-1" 
                                    className="rounded-l-none" 
                                    name={fields.userName.name}
                                    key={fields.userName.key}
                                    defaultValue={fields.userName.initialValue}/>
                                </div>

                                 <p className="text-red-500 text-sm">{fields.userName.errors}</p>

                            </div>
                        </CardContent>
                        <CardFooter className="w-full"> 
                          <SubmitButton text="Submit" className="w-full" />
                        </CardFooter>
               </form>
            </Card>
        </div>
    )
}