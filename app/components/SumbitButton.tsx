"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import GoogleLogo from '../../public/google.svg'
import Image from "next/image";
import { Loader, Loader2 } from "lucide-react";
import GitHubLogo from '../../public/github.svg'
import { cn } from "@/lib/utils";

interface iAppProps{
    text:string;
    variant?: 
    "link"
    | "default" 
    | "destructive" 
    | "outline" 
    | "secondary" 
    | "ghost" 
    | null 
    | undefined;

    className?: string
}

export function SubmitButton({ text, variant, className }:iAppProps) {
    const {pending} = useFormStatus()

    return (
        <>
        {pending ? (
            <Button 
            disabled
            variant="outline"
            className={cn("w-fit", className)}>
                <Loader2 className=" size-4 mr-2 animate-spin" />Please Wait
            </Button>
        ): (
            <Button
            type="submit"
            variant={variant}
            className={cn("w-fit", className)}
            >Submit
            </Button>
        )}
        </>
    )
}



/**
 * A component that renders a Google authentication button.
 * Displays a loading spinner and "Please wait" text when the form is in a pending state.
 * Otherwise, shows a button with a Google logo and "Sign in with Google" text.
 */
export function GoogleAuthButton() {
   const {pending} = useFormStatus()

   return(
    <>
    {pending ? (
        <Button disabled variant="outline" className="w-full">
            <Loader className=" size-4 mr-2 animate-spin" />Please wait 
        </Button>
    ): (
        <Button variant="outline" className="w-full">
            <Image src={GoogleLogo} alt="Google Logo" className="size-4 mr-2"/>
            Sign in with Google
        </Button>
    )}
    </>
   );
}
export function GitHubAuthButton() {
   const {pending} = useFormStatus()

   return(
    <>
    {pending ? (
        <Button disabled variant="outline" className="w-full">
            <Loader className=" size-4 mr-2 animate-spin" />Please wait 
        </Button>
    ): (
        <Button variant="outline" className="w-full">
            <Image src={GitHubLogo} alt="GitHub Logo" className="size-4 mr-2"/>
            Sign in with GitHub
        </Button>
    )}
    </>
   );
}