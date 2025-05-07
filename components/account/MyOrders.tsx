import { Order } from "@/typings";
import OrderTrack from "./OrderTrack";
import OrdersList from "./OrdersList";

const MyOrders = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* main */}
      <OrdersList />
      {/* end */}
      <div className="col-span-12 md:col-span-5">
        <div className="hidden md:flex">
          <OrderTrack />
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
