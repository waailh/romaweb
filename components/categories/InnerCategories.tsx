"use client";

import { Category } from "@/typings";
import MyImage from "../ui/MyImage";
import { Link } from "@/i18n.config";
import { useParams } from "next/navigation";
import Draggable from "../helpers/Draggable";

interface Props {
  cats: Category[];
}

const InnerCategories = ({ cats }: Props) => {
  const { lang } = useParams();
  return (
    <div className="my-4 w-full ">
      <Draggable>
        <div className="w-fit mx-auto flex space-s-2 items-start">
          {cats &&
            cats.map((one, i) => (
              <Link
                href={`/category/${one.slug}`}
                key={i}
                className="shrink-0 text-center flex flex-col items-center justify-center w-16 md:w-20"
              >
                <div className="size-16 md:size-20 rounded relative">
                  <MyImage src={one.icon} className="object-cover" fill />
                </div>
                <p
                  className="w-full text-xs font-bold mt-1 line-clamp-2"
                  title={one.name}
                >
                  {lang == "ar" ? one.ar_name : one.name}
                </p>
              </Link>
            ))}
        </div>
      </Draggable>
    </div>
  );
};

export default InnerCategories;
