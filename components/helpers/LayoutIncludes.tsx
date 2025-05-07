import AddressOtpModal from "../account/helpers/AddressOtpModal";
import CartModal from "../cart/CartModal";
import SideCartContainer from "../cart/SideCartContainer";
import DecorationLayer from "./DecorationLayer";
import Initializer from "./Initializer";
import ScrollHandler from "./ScrollHandler";

const LayoutIncludes = () => {
  return (
    <>
      <Initializer />
      <DecorationLayer />
      <SideCartContainer />
      <CartModal />

      {/* <AddressOtpModal /> */}
      <ScrollHandler />
    </>
  );
};

export default LayoutIncludes;
