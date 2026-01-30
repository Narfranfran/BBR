import Sidebar from "@/components/Layout/Sidebar";
import Header from "@/components/Layout/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <Header />
      {/* Main Content Area - Pushed right by sidebar and down by header */}
      <main className="sm:ml-64 pt-16 min-h-screen">
        {children}
      </main>
    </>
  );
}
