"use client"
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import style from "./style.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { usePersonData } from "@/hooks/use-person";



export default function ContentSidebarComponent() {
    const pathname = usePathname()
    const person = usePersonData();
    const routePath = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);




    const pathList = [{ title: "سرمایه گذاری", href: "invest" }, { title: "معرف", href: "refferal" },{title:"اطلاعات",href:"information"}].map(item => {
        return <SidebarMenuItem key={item.href} className={`${style.itembar} ${routePath == item.href ? style.active : ""}`}>
            <SidebarMenuButton asChild>
                <Link style={{ cursor: "pointer" }} href={`/panel/${person.person.nationalId}/${item.href}`}>
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    });


    return (
        <SidebarContent >
            <SidebarGroup >
                <SidebarGroupLabel>جداول</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {pathList}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

        </SidebarContent>
    );
}
