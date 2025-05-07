import MenuIcon from "@/public/assets/icons/burger.svg";
import { useGlobals } from "@/store/global/globals";

const MobileNavExpandToggler = () => {
  const { setMobileNav } = useGlobals();
  return (
    <button className="" onClick={() => setMobileNav(true)}>
      <MenuIcon />
    </button>
  );
};

export default MobileNavExpandToggler;
