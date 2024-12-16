import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VideoGif from "@/public/work-is-almost-over-happy.gif"
import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OnboardingRouteTwo(){
    return (
        <div className="min-h-screen w-screen flex items-center justify-center ">
            <Card>
                <CardHeader>
                    <CardTitle>You're almost Done!</CardTitle>
                    <CardDescription>
                        Now, we have to collect your callender to your account.
                    </CardDescription>
                    <Image src={VideoGif} alt="Almost finished" className="w-full roounded-lg"/>
                </CardHeader>

                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/api/auth">
                        <CalendarCheck2 className="size-4 mr-4" />
                        Connect calendar to your account</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}