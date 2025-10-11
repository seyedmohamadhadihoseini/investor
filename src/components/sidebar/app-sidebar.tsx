import {
  Sidebar,
} from "@/components/ui/sidebar"
import ContentSidebarComponent from "./content"
import SidebarFooterComponent from "./footer"




export function AppSidebar() {
  return (
    <Sidebar side="right" >
      <ContentSidebarComponent  />
      <SidebarFooterComponent />
    </Sidebar>
  )
}