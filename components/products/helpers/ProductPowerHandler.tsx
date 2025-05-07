"use client";

import { useGlobalModals } from "@/store/helpers/modals";
// import { useCarts } from "@/store/products/cart";
import { useCartsStore } from "@/store/products/carts";
import { useModalPower } from "@/store/products/modalpower";
import { usePower } from "@/store/products/power";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Props {
  att: {
    id: string;
    name: string;
    ar_name: string;
    values: string[];
  };

  inner?: boolean;
  mini: boolean;
}

const ProductPowerHandler = ({ mini, inner, att: { values: vals } }: Props) => {
  const t = useTranslations("Products");
  const tp = useTranslations("Product");

  const opts = vals.includes("00:00") ? ["without", "with"] : ["with"];

  const modalPowerState = useModalPower();
  const powerState = usePower();

  const { mode, setMode, setOtherChoicePower } = mini
    ? modalPowerState
    : powerState;

  const { powerModal, setPowerModal } = useGlobalModals();
  const { setChoiceAtt, resetChoice } = useCartsStore();

  useEffect(() => {
    setMode(opts[0]);
    // setChoiceAtt(mini ? "modal" : "main",{ id: 1, value: "00:00" });

    if (opts[0] == "with") {
      setPowerModal(true);
    } else {
      setOtherChoicePower(null);
      resetChoice(mini ? "modal" : "main");
      setChoiceAtt(mini ? "modal" : "main", { id: 1, value: "00:00" });
    }

    return () => setPowerModal(false);
  }, []);

  const handleModeChange = (val: string) => {
    setMode(val);
    if (val == "with") {
      setPowerModal(true);
    }
    if (val == "without") {
      setOtherChoicePower(null);
      resetChoice(mini ? "modal" : "main");
      setChoiceAtt(mini ? "modal" : "main", { id: 1, value: "00:00" });
    }
  };

  return (
    <div>
      <div className="">
        <label htmlFor="" className="">
          {tp("pow")}
        </label>
        <div className="">
          <RadioGroup
            value={mode}
            onChange={handleModeChange}
            aria-label=""
            className="mt-2 flex flex-col space-y-2"
          >
            {opts.map((one, i) => (
              <Field key={i} className="flex items-center gap-2">
                <Radio
                  value={one}
                  className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-primary"
                >
                  <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                </Radio>
                <Label className="w-full">
                  <div className="w-full flex items-center justify-between">
                    <div className="">
                      {one == "with" ? t("withPow") : t("withoutPow")}
                    </div>
                    {one == "with" && (
                      <button
                        onClick={() => setPowerModal(true)}
                        className="border-b text-sm"
                      >
                        {t("chng")}
                      </button>
                    )}
                  </div>
                </Label>
              </Field>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default ProductPowerHandler;
