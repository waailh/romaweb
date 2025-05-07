"use client";

import { useCartsStore } from "@/store/products/carts";
// import { useCarts } from "@/store/products/cart";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  mini: boolean;
  att: {
    id: string;
    name: string;
    ar_name: string;
    values: string[];
  };
}

const GeneralAttributeHandler = ({
  mini,
  att: { id, name, ar_name, values },
}: Props) => {
  const { lang } = useParams();

  const [active, setActive] = useState<number>(0);
  const { setChoiceAtt } = useCartsStore();

  useEffect(() => {
    setChoiceAtt(mini ? "modal" : "main", { id: Number(id), value: values[0] });
  }, []);

  const setVal = (val: string, i: number) => {
    setActive(i);
    setChoiceAtt(mini ? "modal" : "main", { id: Number(id), value: val });
  };

  return (
    <div>
      <h6 className="mb-2">{lang == "ar" ? ar_name : name}</h6>
      <div className="flex space-s-2 items-center max-w-full overflow-x-scroll hide-scrollbar">
        {values.map((one, i) => (
          <button
            key={i}
            onClick={() => setVal(one, i)}
            className={`px-2 py-1 rounded text-sm border ${
              active == i ? "border-primary text-primary" : ""
            } `}
          >
            {one}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GeneralAttributeHandler;
