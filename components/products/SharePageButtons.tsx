"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import WhatsappIcon from "@/public/assets/icons/social/black/wa.svg";
import XIcon from "@/public/assets/icons/social/black/x.svg";
import FacebookIcon from "@/public/assets/icons/social/black/fb.svg";
import ClipBoardIcon from "@/public/assets/icons/social/black/clipboard.svg";
import { useTranslations } from "next-intl";

const SharePageButtons = () => {
  const t = useTranslations("Product");

  const pathname = usePathname();
  const [copySuccess, setCopySuccess] = useState("");

  const currentUrl =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      "_blank"
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch(() => {
        setCopySuccess("Failed to copy");
        setTimeout(() => setCopySuccess(""), 2000);
      });
  };

  return (
    <div className="py-2">
      <label className="block mb-2">{t("share")}</label>
      <div className="flex space-s-4">
        <button
          onClick={shareOnWhatsApp}
          className="p-2 text-black bg-white border rounded hover:shadow transition"
        >
          <WhatsappIcon />
        </button>
        <button
          onClick={shareOnTwitter}
          className="p-2 text-black bg-white border rounded hover:shadow transition"
        >
          <XIcon />
        </button>
        <button
          onClick={shareOnFacebook}
          className="p-2 text-black bg-white border rounded hover:shadow transition"
        >
          <FacebookIcon />
        </button>
        <button
          onClick={copyToClipboard}
          className="p-2 text-black bg-white border rounded hover:shadow transition"
        >
          <ClipBoardIcon />
        </button>
      </div>
      {copySuccess && (
        <span className="text-sm text-green-500 mt-2">{copySuccess}</span>
      )}
    </div>
  );
};

export default SharePageButtons;
