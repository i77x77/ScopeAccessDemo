// app/layout.tsx

import HomeLayout from "../components/HomeLayout";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <HomeLayout>{children}</HomeLayout>
        </Providers>
      </body>
    </html>
  );
}
