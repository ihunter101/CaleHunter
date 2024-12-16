import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    console.log("Received call back from Nylas")
    const session = await requireUser();// ensure only authenticated users are able to access this route 

    const url = new URL(req.url as string);// get the url of the request

    const code = url.searchParams.get("code");// get the code from the url

    if(!code){
        return Response.json("Hey, we didn't get a code", {
            status: 400,
        })
    }
    try {
        const response = await nylas.auth.exchangeCodeForToken({
            clientSecret: nylasConfig.apiKey,
            clientId: nylasConfig.clientId,
            redirectUri: nylasConfig.redirectUri,
            code: code
        })// exchange the code for an access token

      const { grantId, email } = response ;

      await prisma.user.update({
        where: {
            id: session.user?.id as string,
        },
        data:{
            grantId: grantId,
            grantEmail: email,
        }
      })

    } catch (error) {
        console.log("Error something went wrong", error)
    }
    redirect("/dashboard")
}