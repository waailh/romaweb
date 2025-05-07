import Link from "next/link";
import MyImage from "../ui/MyImage";

const wa = "+971564948368";

const WhatsAppButton = () => {
  return (
    <Link href={`https://wa.me/${wa}`}>
      <MyImage
        src="/assets/icons/social/wa.svg"
        alt=""
        width={50}
        height={50}
        className="transition-all ease-in-out duration-500 hover:translate-y-[-3px]"
      />
    </Link>
  );
};

export default WhatsAppButton;
