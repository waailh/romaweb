"use client";

import { axiosWithAuth } from "@/lib/auth/axios/axios";
import { useRouter } from "next/navigation";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL;

const TestSocial = () => {
  // const axios = axiosWithAuth();
  const router = useRouter();
  const handleSocial = () => {
    router.push(`${backendHost}/auth/social/google`);
  };
  return (
    <div>
      <button
        onClick={() => handleSocial()}
        className="bg-white text-black px-4 py-1 rounded-md border border-red-400"
      >
        continue with google
      </button>
    </div>
  );
};

export default TestSocial;
