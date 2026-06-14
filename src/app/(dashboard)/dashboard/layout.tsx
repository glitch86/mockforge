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
    <SidebarProvider className="">
      <Appsidebar></Appsidebar>
      <SidebarInset>
        <main className="pt-3">
          <SidebarTrigger></SidebarTrigger>
          <div>{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
