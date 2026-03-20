import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.08),_transparent_28%),_#0e0c0a] text-neutral-50">
      <DashboardHeader />

      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Desktop Sidebar */}
        <div className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 h-[calc(100vh-7rem)]">
            <DashboardSidebar />
          </div>
        </div>

        {/* Content */}
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}