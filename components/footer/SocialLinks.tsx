import { Link } from "@/i18n.config";
import MyImage from "../ui/MyImage";

const socis = [
  {
    name: "",
    link: "https://www.facebook.com/AromaOpticalsHomeofLenses/?ref=bookmarks",
    img: "/assets/icons/social/fb.svg",
  },
  {
    name: "",
    link: "https://twitter.com/OpticalsRoma",
    img: "/assets/icons/social/tw.svg",
  },
  {
    name: "",
    link: "https://www.instagram.com/roma_opticals/",
    img: "/assets/icons/social/ig.svg",
  },
  {
    name: "",
    link: "https://api.whatsapp.com/send?phone=971564948368",
    img: "/assets/icons/social/wa.svg",
  },
  {
    name: "",
    link: "https://www.youtube.com/channel/UC0kygLm5B7XgjFd0y3eM_Xg",
    img: "/assets/icons/social/yt.svg",
  },
];

const SocialLinks = () => {
  return (
    <div className="md:mt-4 flex items-center space-s-2">
      {socis.map((one, i) => (
        <Link key={i} href={one.link}>
          <MyImage
            src={one.img}
            alt=""
            width={25}
            height={25}
            className="transition-all ease-in-out duration-500 hover:translate-y-[-3px]"
          />
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
