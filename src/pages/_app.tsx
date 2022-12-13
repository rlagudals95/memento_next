import "../styles/global.css";

import type { AppProps } from "next/app";
import SimpleBottomNavigation from "@/components.tsx/SimpleBottomNavigationBottomNavigation";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    <SimpleBottomNavigation />
  </>
);

export default MyApp;
