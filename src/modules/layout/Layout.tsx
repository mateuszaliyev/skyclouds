import { ReactNode } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Footer from "./Footer";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme: any) => ({
	main: {
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
	},
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
		width: "100%",
	},
}));

const Layout = (props: { children?: ReactNode }) => {
	const { children } = props;

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Navbar />
			<main className={classes.main}>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
