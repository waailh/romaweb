interface Props {
  title: string;
  top?: boolean;
}

const SectionTitle = ({ title, top }: Props) => {
  return (
    <div className="mb-4">
      {top ? (
        <h1 className="font-bold text-2xl md:text-[30px] text-black">
          {title}
        </h1>
      ) : (
        <h2 className="font-bold text-2xl md:text-[30px] text-black">
          {title}
        </h2>
      )}
    </div>
  );
};

export default SectionTitle;
