"use client";

import { 
        Card, 
        CardContent, 
        CardDescription, 
        CardFooter, 
        CardHeader, 
        CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SumbitButton";
import { SettingsActions } from "../actions";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingSchema } from "../lib/zodSchema";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "sonner";
import Image from "next/image";

interface iAppsProps {
    fullName: string;
    email: string;
    profileImage: string;
}



export function SettingForms({ fullName, email, profileImage }: iAppsProps) {
    const [lastResult, action] = useFormState(SettingsActions, undefined);
    const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}) {
            return parseWithZod(formData, {
                schema: settingSchema,
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    /**
     * Handles the deletion of a profile image
     * 
     * Resets the profile image state to an empty string
     */
    const handleDeleteImage = () => {
        setCurrentProfileImage("");
    }

    return (
        <Card>
        <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your account Settings.</CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
            <CardContent className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <Label>Full Name</Label>
                    <Input 
                    name={fields.fullName.name}
                    key={fields.fullName.key}
                    defaultValue={fullName}
                    placeholder="CaleHunter"/>
                    <p className="text-red-500 text-sm">{fields.fullName.errors}</p>

                </div>

                <div className="flex flex-col gap-y-2">
                    <Label>Email</Label>
                    <Input 
                    disabled
                    defaultValue={email}
                    placeholder="test@test.com" />
                </div>

                <div className="grid gap-y-5">
                    <Label>Profile Image</Label>
                    <input 
                    type="hidden"  
                    name={fields.profileImage.name}
                    key={fields.profileImage.key}
                    value={currentProfileImage} />
                    {currentProfileImage? (
                        <div className="relative size-16">
                            <Image
                                src= {currentProfileImage} 
                                alt="Profile Image"
                                width={300} 
                                height={300}
                                className="size-16 rounded-lg"/>

                            <Button 
                            onClick={handleDeleteImage}
                            variant="destructive" //destructive makes the button red
                            size="icon"
                            type="button" //this button needs to be type button or else the button will submit the form 
                            className=" absolute -top-3 -right-3"> 
                                <X  className="size-4"/>
                            </Button>
                        </div>
                        ): (
                           <UploadDropzone 
                           onClientUploadComplete={(res) => {
                            setCurrentProfileImage(res[0].url);
                            toast.success("profile image has been uploaded")
                           }} 
                           onUploadError={(error) => {console.log("Something went wrong with the upload", error);
                            toast.error(error.message);
                           }}
                           endpoint={"imageUploader"}/>
                        )}
                        <p className="text-red-500 text-sm">{fields.profileImage.errors}</p>
                </div>
            </CardContent>
            <CardFooter>
              <SubmitButton text="Save changes"/>
            </CardFooter>
        </form>
    </Card>
    )
}