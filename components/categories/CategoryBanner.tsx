import { useParams } from "next/navigation";
import MyImage from "../ui/MyImage";
import OpacityAnimator from "../animators/OpacityAnimator";
import DownOpacityAnimator from "../animators/DownOpacityLogoAnimator";

interface Props {
  img: string;
  ar_img: string;
  alt: string;
}

const CategoryBanner = ({ img, ar_img, alt }: Props) => {
  const { lang } = useParams();

  return (
    <>
      {img && (
        <DownOpacityAnimator>
          <div className="relative w-full aspect-[5/2] rounded-md overflow-hidden">
            <MyImage
              alt={alt}
              src={lang == "ar" ? ar_img : img}
              className="object-cover rounded-md"
              fill
            />
          </div>
        </DownOpacityAnimator>
      )}
    </>
  );
};

export default CategoryBanner;
