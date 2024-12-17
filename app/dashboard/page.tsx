
import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";
import { EmptyState } from "../components/emptyState";

async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {//find the user where the id matches the id thats passed in getData()
            id: userId,
        },
        select: {
            userName: true,
            eventType: {
                select: {
                    id: true,
                    isactive: true,
                    url: true,
                    duration: true,
                }
            }
        },

        if (!data) {
            return notFound();
        }
        return data;
    }
export default async function DashboardPage  () {
    const session = await requireUser();
    '
    //fetchin the data on the front end 
    const data = await getData(session.user?.id as string);

    return (
        <>
        {data.eventType.length === 0 ?(//the empty state properties here map to the interface in empatyState.tsx
            <EmptyState title="No event types" 
                        description="You have not created any event types bu clikcing the button below"
                        buttonText="Add Event Type"
                        href="/dashboard/new"
                        />
        ):(
            <p>we have event types</p>
        )
        )}
        </>
    );

}