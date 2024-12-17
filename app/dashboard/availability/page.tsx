import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { notFound } from "next/navigation";
import { times } from "../../lib/times";
import { SubmitButton } from "@/app/components/SumbitButton";


async function getData(userId: string) {
    const data = await prisma.availability.findMany({
        where: {
            userId: userId,
        },
    });

    if (!data) {
        return notFound();
    }
    return data;
}
export default async function AvailabilityRoute() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>
                    In this section, you can manage your availability!
                </CardDescription>
            </CardHeader>
            <form>
                <CardContent className="flex flex-col gap-y-4">
                    {data.map((item) => (
                        <div key={item.id}//key needs to be unique and its used with id since the id is unique
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4">
                            <div className="flex flex-col gap-x-3">
                                <Switch defaultChecked={item.isActive}/> {/*the default check is set to is active which maps to the prisma availability module which contains an is active prop*/}
                                <p>{item.day}</p>
                            </div>
                            <Select defaultValue={item.fromTime}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="From time">

                                    </SelectValue>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {times.map((time) => (
                                            <SelectItem /**we need a value for select time**/
                                            value={time.time}
                                            key={time.id}>
                                                {time.time}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select defaultValue={item.tillTime}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Till time">

                                    </SelectValue>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {times.map((time) => (
                                            <SelectItem /**we need a value for select time**/
                                            value={time.time}
                                            key={time.id}>
                                                {time.time}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <SubmitButton text='Save changes' />
                </CardFooter>
            </form>
        </Card>
    )
}