import Navbar from "@/components/form/Navbar";
import Sidebar from "@/components/form/Sidebar";
import { Outlet } from "react-router";

export default function ViewFormLayout() {
  return (
    <>
      <Navbar />

      <main className="flex w-full grow bg-[#fefefe]">
        <Sidebar />

        <div className="w-full flex flex-col gap-8 pt-6 pr-9 pb-14 pl-7">
          <Outlet />
        </div>
      </main>
    </>
  );
}
