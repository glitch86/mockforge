import Appsidebar from "@/components/shared/Appsidebar";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";
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
    <SidebarProvider className="">
      <Appsidebar></Appsidebar>
      <SidebarInset className="">
        <main >
          <SidebarTrigger></SidebarTrigger>
          <ThemeToggle></ThemeToggle>
          <div className="h-screen">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
