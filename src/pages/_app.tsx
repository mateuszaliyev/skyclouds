import { useEffect } from "react";
import PropTypes from "prop-types";

import type { AppProps } from "next/app";
import Head from "next/head";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import UserContextProvider from "../modules/auth/UserContextProvider";

import theme from "../styles/theme";
import "../styles/globals.css";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <link
          href="/logo-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link
          href="/logo-512x512.png"
          rel="icon"
          type="image/png"
          sizes="512x512"
        />
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </UserContextProvider>
      </ThemeProvider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
