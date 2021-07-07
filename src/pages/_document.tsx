import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import { ServerStyleSheets } from "@material-ui/core/styles";

import theme from "../styles/theme";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						href="https://fonts.googleapis.com"
						rel="preconnect"
					/>
					<link
						crossOrigin="true"
						href="https://fonts.gstatic.com"
						rel="preconnect"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600&display=swap"
						rel="stylesheet"
					/>
					<meta
						content={theme.palette.primary.main}
						name="theme-color"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async (ctx) => {
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		styles: [
			...React.Children.toArray(initialProps.styles),
			sheets.getStyleElement(),
		],
	};
};
