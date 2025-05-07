import { axiosWithAuth } from "@/lib/auth/axios/axios";
import { useGlobals } from "@/store/global/globals";
import { useCartsStore } from "@/store/products/carts";
import { useTranslations } from "next-intl";
import { MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import DownOpacityAnimator from "../animators/DownOpacityLogoAnimator";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useFetchCart } from "../hooks/useFetchCart";

const UsePoints = () => {
  const { cart, triggerCart } = useCartsStore();
  const { user } = useGlobals();

  const t = useTranslations("Checkout");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const [points, setPoints] = useState<number>(0);

  const axios = axiosWithAuth();

  const handleUsePoints = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!points) return toast.error(tet("emptyflds"));

    const tId = toast.loading(tet("plswait"));
    axios
      .post(`/use-points`, { points })
      .then((res) => {
        if (res.data.result) {
          triggerCart();
          toast.success(tst("succpoints"), { id: tId });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(tet("err"), { id: tId });
      });
  };

  const removePoints = () => {
    axios
      .post(`/remove-points`)
      .then((res) => {
        // console.log(res);

        if (res.data.result) {
          triggerCart();
          toast.success(tst("succremov"));
        } else {
          toast.error(tet("fyld"));
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(tet("fyld"));
      });
  };

  return (
    <div className="mb-2">
      <div className="border rounded p-2">
        <h6>{t("ponts")}</h6>
        <form className="flex items-center space-s-3 text-sm" action="">
          <input
            // value={points}
            placeholder={`${t("max")}: ${user?.points}`}
            onChange={(e) => setPoints(Number(e.target.value))}
            type="number"
            className="border rounded border-black bg-transparent px-2 py-1 outline-none w-full focus:bg-black/10 duration-300"
          />
          <button
            onClick={(e) => handleUsePoints(e)}
            className="border rounded bg-black border-black text-white px-2 py-1"
          >
            {t("use")}
          </button>
        </form>

        {/* points message */}
        {cart?.summary && (
          <div className="mt-1">
            <DownOpacityAnimator>
              <div
                className={`px-2 py-1 rounded w-full flex items-center space-s-2 ${
                  cart?.summary.points_used
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-xs"
                }`}
              >
                {cart?.summary.points_used ? (
                  <CheckBadgeIcon className="text-green-600 size-5" />
                ) : (
                  <ExclamationCircleIcon className="size-5" />
                )}
                <div className="flex-1 flex flex-col space-y-2 md:flex-row md:flex-y-0 md:justify-between md:space-s-2 shrink-0 text-sm">
                  <p className="">
                    {cart?.summary.points_used
                      ? `${cart?.summary.points_discount * 10} ${t(
                          "ponts"
                        )} ${t("isusd")}`
                      : t("nopoi")}
                  </p>
                </div>

                {cart?.summary.points_used && (
                  <button
                    onClick={() => removePoints()}
                    className="text-xs px-1 py-[1px] shrink-0 rounded bg-green-50 flex items-center border space-s-2 w-fit"
                  >
                    <XMarkIcon className="size-3" />
                    <span>{t("remv")}</span>
                  </button>
                )}
              </div>
            </DownOpacityAnimator>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsePoints;
