import { useAddresses } from "@/store/account/addresses";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";
import ViewAddresses from "./ViewAddresses";
import AddressOtpModal from "./helpers/AddressOtpModal";

interface Props {
  guest?: boolean;
}

const MyAddressesInner = ({ guest }: Props) => {
  const { state } = useAddresses();

  let component;

  switch (state) {
    case "add":
      component = <AddAddress guest={guest} />;
      break;
    case "edit":
      component = <EditAddress />;
      break;

    default:
      component = <ViewAddresses />;
      break;
  }

  return (
    <>
      {component}
      <AddressOtpModal />
    </>
  );
};

export default MyAddressesInner;
