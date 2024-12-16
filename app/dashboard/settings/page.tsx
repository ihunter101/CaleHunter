import { SettingForms } from "@/app/components/SettingForms";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { notFound } from "next/navigation";

interface iAppsProps {
    fullName: string;
    email: string;
    profileImage: string;
}

  async function getData(id: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            name: true,
            email: true,
            image:true,
        }
    });
    if (!data) {
        return notFound();
    }

    return data;
};

export default  async function Settingsroute({email, fullName, profileImage}:iAppsProps) {
    const session = await requireUser();
  const data = await getData(session.user?.id as string);
    return (
        <SettingForms 
        email={data.email}
        fullName={data.name as string}
        profileImage={data.image as string} />
    );
}