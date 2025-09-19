import SideBarDashboards from "@/components/sidebar";




export default function PanelLayout({ children }: { children: React.ReactElement }) {

    return (
            <SideBarDashboards>
                <div>
                    {children}
                </div>
            </SideBarDashboards>
        
    );
}