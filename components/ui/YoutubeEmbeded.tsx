"use client";

interface Props {
  url: string;
}

const YoutubeEmbeded = ({ url }: Props) => {
  const id = url.split("=")[1];
  return (
    <div className="relative w-full h-full">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

export default YoutubeEmbeded;
