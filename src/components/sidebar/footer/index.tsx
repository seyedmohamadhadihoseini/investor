"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { usePersonData } from "@/hooks/use-person";
import { ChevronUp, User2 } from "lucide-react";

export default function SidebarFooterComponent() {
    const person = usePersonData()
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton className="cursor-pointer">
                                <User2 /> {person.person.FullName}
                                <ChevronUp className="mr-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="top"
                            className="w-[16rem] bg-amber-500 text-center"
                            
                        >
                            <DropdownMenuItem dir="rtl"  className="text-center cursor-pointer bg-red-500" onClick={()=>{
                                window.location.href = "/"
                            }}>
                                <span>خروج</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
}