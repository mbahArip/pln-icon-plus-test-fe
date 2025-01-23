import PLNLogo from "@/assets/pln.png";
import UserImage from "@/assets/user.png";
import { Icon } from "@/components/Icon";

export default function Navbar() {
  return (
    <nav className="px-6 py-2 inline-flex items-center justify-between bg-gradient-to-r from-[#18a2Ba] to-[#296377] w-full">
      <div className="flex items-center gap-5">
        <img src={PLNLogo} alt="logo" className="w-[38px] h-[52px]" />
        <h1 className="text-base text-white font-bold leading-snug tracking-[0.25%]">iMeeting</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-[42px] h-[42px] flex items-center justify-center bg-transparent rounded-lg hover:bg-white/10 transition">
          <Icon name="Bell" className="size-[18px] stroke-white" />
        </button>
        <img src={UserImage} alt="User Avatar" className="size-10 rounded-full" />
        <button className="h-[42px] w-fit px-3 flex items-center gap-3 bg-transparent rounded-lg hover:bg-white/10 transition">
          <span className="font-semibold text-sm leading-5 tracking-[0.25%] text-white">John Doe</span>
          <Icon name="ChevronDown" className="size-[18px] stroke-white" />
        </button>
      </div>
    </nav>
  );
}
