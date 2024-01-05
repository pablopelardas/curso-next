// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { Sidebar } from "@/components";
import { TopMenu } from "@/components/TopMenu/TopMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {/* Main Layout content - Contenido principal del Layout */}
      <div className="ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen bg-gray-50">
        <TopMenu />

        <div className="px-6 pt-6 bg-white rounded p-2 pb-5 m-2">{children}</div>
      </div>
    </>
  );
}
