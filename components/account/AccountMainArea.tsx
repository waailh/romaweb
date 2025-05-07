"use client";

import { useAccountTabs } from "@/store/account/account_tabs";
import MyOrders from "./MyOrders";
import MyAddresses from "./MyAddresses";
import AccountDetails from "./AccountDetails";
import { useSearchParams } from "next/navigation";

const AccountMainArea = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("mode");
  // const { tab } = useAccountTabs();

  let component;
  switch (tab) {
    case "orders":
      component = <MyOrders />;
      break;
    case "addresses":
      component = <MyAddresses />;
      break;

    default:
      component = <AccountDetails />;
      break;
  }
  return <div className="md:flex-1  md:p-4 md:min-h-[500px] ">{component}</div>;
};

export default AccountMainArea;
