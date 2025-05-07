import { Link } from "@/i18n.config";
import MyImage from "../ui/MyImage";

interface Props {
  size?: string;
}

const Logo = ({ size }: Props) => {
  return (
    <div className="logo shrink-0">
      <Link href="/" className="outline-none">
        <MyImage
          src="/assets/logo/logo.svg"
          width={size == "lg" ? 100 : 90}
          height={40}
          className="object-fit"
        />
      </Link>
    </div>
  );
};

export default Logo;
