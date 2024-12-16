import { redirect } from "next/navigation";
import { auth } from "./auth";

/**
 * If the user is not logged in, redirects to the root path.
 * Otherwise, returns the session.
 */
export async function requireUser() {
    const session = await auth();

    if (!session?.user){
        return redirect("/")
    }

    return session;
}