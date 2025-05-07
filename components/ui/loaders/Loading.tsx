import MyImage from "../MyImage";
import ArrowRepeatIcon from "@/public/assets/icons/arrow-repeat.svg";

interface Props {
  message?: string;
}

const Loading = ({ message }: Props) => {
  return (
    <div className="my-4 p-2 flex flex-col justify-center items-center">
      <ArrowRepeatIcon className="animate-spin mb-4" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default Loading;
