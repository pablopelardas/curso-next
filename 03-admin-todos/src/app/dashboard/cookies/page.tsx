import { cookies } from "next/headers";
import { TabBar } from "../../../components/TabBar/TabBar";
export const metadata = {
  title: "Cookies Page",
  description: "Cookies Page",
};

export default function NamePage() {
  const cookieStore = cookies();
  const cookieTab = cookieStore.get("currentTab")?.value ?? 1;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={+cookieTab} tabOptions={[1, 2, 3, 4, 5]} />
      </div>
    </div>
  );
}
