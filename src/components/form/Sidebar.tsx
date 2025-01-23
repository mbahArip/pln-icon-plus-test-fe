import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

export default function Sidebar() {
  return (
    <div
      className="w-[72px] bg-white px-[15px] pt-5 pb-6 flex flex-col items-center gap-3"
      style={{
        boxShadow: "4px 0px 20px #6A6A6A1A",
      }}
    >
      <Button fill="ghost" size="icon">
        <Icon name="House" />
      </Button>
      <Button size="icon">
        <Icon name="File" />
      </Button>
    </div>
  );
}
