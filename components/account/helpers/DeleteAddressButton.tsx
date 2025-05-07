import { axiosWithAuth } from "@/lib/auth/axios/axios";
import { useAddresses } from "@/store/account/addresses";
import { useCartsStore } from "@/store/products/carts";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id: number;
}

const DeleteAddressButton = ({ id }: Props) => {
  const { removeAddress, setAddresses } = useAddresses();

  const [loading, setLoading] = useState(false);
  const { triggerCart } = useCartsStore();

  const t = useTranslations("Account");
  const tst = useTranslations("SuccessToast");

  const handleDelete = () => {
    const axios = axiosWithAuth();
    setLoading(true);
    axios
      .get(`/user/shipping/delete/${id}`)
      .then((res) => {
        console.log("res: ", res);
        if (res.data.result) {
          removeAddress(id);
          toast.success(tst("succremov"));
          setAddresses(res.data.addresses);
        }
        setLoading(false);
        triggerCart(); // refetch summary
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <button
      disabled={loading}
      onClick={() => handleDelete()}
      className="text-red-600 text-sm flex items-center space-s-2 px-2"
    >
      <TrashIcon className="size-4" />
      <span>{t("deladrs")}</span>
      {loading && (
        <span>
          <ArrowPathIcon className="animate-spin size-4" />
        </span>
      )}
    </button>
  );
};

export default DeleteAddressButton;
