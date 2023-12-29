import { WidgetGrid } from "@/components";
export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function Main() {
  return (
    <div className="text-black">
      <h1 className="mt-2 text-3xl">Dashboard</h1>
      <span className="text-1xl">Informacion General</span>
      <WidgetGrid />
    </div>
  );
}
