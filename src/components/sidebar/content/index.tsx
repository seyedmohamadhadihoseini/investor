"use client"
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import style from "./style.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";



export default function ContentSidebarComponent() {
    const routePath = usePathname().replace("/panel/","")
    
    


    const pathList = [{ title: "اشخاص", href: "persons" }, { title: "قراردادها", href: "contracts" },
    { title: "تاریخچه سود", href: "profits" }, { title: "جدول پورسانت ها", href: "percents" }].map(item => {
        return <SidebarMenuItem key={item.href} className={`${style.itembar} ${routePath == item.href ? style.active : ""}`}>
            <SidebarMenuButton asChild>
                <Link style={{cursor:"pointer"}} href={`/panel/${item.href}`}>
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
