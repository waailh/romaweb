"use client";

import StarFiller from "@/components/ui/StarFiller";
import { axiosWithAuth } from "@/lib/auth/axios/axios";
import { ifEmpty } from "@/lib/utils";
import { useGlobalModals } from "@/store/helpers/modals";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id: number;
}

const AddReviewModal = ({ id }: Props) => {
  const { addRevModal, setAddRevModal } = useGlobalModals();
  const [rate, setRate] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const t = useTranslations("Product");
  const tet = useTranslations("ErrorToast");
  const tst = useTranslations("SuccessToast");

  const closeModal = () => {
    setAddRevModal(false);
  };

  const submitReview = () => {
    if (!ifEmpty(comment) && rate > 0) {
      if (comment.length > 120) toast.error(tet("toolong"));

      const axios = axiosWithAuth();

      axios
        .post(`/reviews/submit`, { product_id: id, rating: 4, comment })
        .then((res) => {
          console.log(res);
          if (res.data.result) {
            toast.success(tst("succaddd"));
            setAddRevModal(false);
          } else {
            toast.error(tet("cantrev"));
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(tet("err"));
        });
    } else {
      toast.error(tet("emptyflds"));
    }
  };

  return (
    <div>
      <div>
        <Dialog
          open={addRevModal}
          as="div"
          className="relative z-layer-5-1 !pointer-events-auto focus:outline-none"
          onClose={() => closeModal()}
        >
          <div className="fixed inset-0 z-layer-5-1 w-screen overflow-y-auto bg-black/20">
            <div className="flex min-h-full items-center justify-center p-2 md:p-4">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                // transition={{ duration: 0.3 }}
                className="w-full max-w-[400px] rounded-xl bg-white p-4 md:p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <DialogTitle
                    as="h4"
                    className="text-xl font-semibold text-black"
                  >
                    {t("addrev")}
                  </DialogTitle>
                  <button onClick={() => closeModal()}>
                    <XMarkIcon className="size-4" />
                  </button>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-s-2 justify-between">
                    <StarFiller setRate={setRate} />
                    <div>({rate})</div>
                  </div>

                  <div className="">
                    <textarea
                      rows={4}
                      className="outline-none w-full border px-2 py-1 rounded transition duration-300 focus:bg-primary/10"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="mt-3 w-full">
                  <button
                    onClick={() => submitReview()}
                    className="w-full mt-1 bg-primary text-center rounded text-white px-6 py-1 text-sm"
                  >
                    {t("submt")}
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default AddReviewModal;
