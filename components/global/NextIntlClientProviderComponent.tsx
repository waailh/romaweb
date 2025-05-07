import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const NextIntlClientProviderComponent = async ({ children }: Props) => {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default NextIntlClientProviderComponent;
