import Appsidebar from "@/components/shared/Appsidebar";
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
      <SidebarInset className="">
        <main>
          <div className="flex justify-between items-center py-3 px-6">
            <SidebarTrigger></SidebarTrigger>
            <div className="flex justify-center gap-4 items-center">
              <ThemeToggle></ThemeToggle>
              <UserButton></UserButton>
            </div>
          </div>
          <div className="h-screen">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
