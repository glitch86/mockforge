import Appsidebar from "@/components/shared/Appsidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Appsidebar></Appsidebar>
      <SidebarInset>
        <header>
          <SidebarTrigger></SidebarTrigger>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
