
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"

import style from "./style.module.css"
export default function SideBarDashboards({ children }: {  children: React.ReactNode }) {
    
    return (
        <SidebarProvider >            
            <AppSidebar />
            <main className={style.main} >
                <SidebarTrigger />
                <div className={style.child}>
                {children}
                </div>
            </main>
        </SidebarProvider>
    )
}