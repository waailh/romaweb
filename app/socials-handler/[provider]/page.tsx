import InnerSocialsHandler from "@/components/static-pages/InnerSocialsHandler";
import { Metadata } from "next";
interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const title = `Logging in | الدخول`;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

interface Props {
  params: {
    provider: string;
  };
}

const SocialsAuthCallbackHandler = ({ params: { provider } }: Props) => {
  return <InnerSocialsHandler />;
};

export default SocialsAuthCallbackHandler;
