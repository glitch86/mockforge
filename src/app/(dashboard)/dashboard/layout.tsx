import Appsidebar from "@/components/shared/Appsidebar";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="">
      <Appsidebar></Appsidebar>
      <SidebarInset className="min-w-0">
        <main className="min-w-0">
          <div className="flex justify-between items-center py-3 px-6">
            <SidebarTrigger></SidebarTrigger>
            <div className="flex justify-center gap-4 items-center">
              <ThemeToggle></ThemeToggle>
              <UserButton></UserButton>
            </div>
          </div>
          <div className="h-screen mx-4">
            <Breadcrumbs></Breadcrumbs>
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
