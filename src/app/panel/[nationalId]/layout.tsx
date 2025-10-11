import SideBarDashboards from "@/components/sidebar";
import { PersonDataProvider } from "@/hooks/use-person";
import prisma from "@/services/prisma";
import { SetPersonIdCookies } from "./server";






export default async function PanelLayout({ children, params }:
    {
        children: React.ReactNode,
        params: Promise<{ nationalId: string }>

    }) {
    const { nationalId } = await params;
    const person = await prisma.person.findUnique({ where: { nationalId } });
    if (!person) {
        return <div></div>
    }
    
    return (
        <PersonDataProvider person={person}>
            <SideBarDashboards >
            <div>
                {children}
            </div>
            </SideBarDashboards>
        </PersonDataProvider>
    );
}