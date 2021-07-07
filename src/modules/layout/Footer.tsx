import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles((theme) => ({
	root: {
		alignItems: "center",
		// background:
		// 	"linear-gradient(90deg, rgb(33, 150, 243), rgb(0, 44, 118))",
		// color: "#fff",
		display: "flex",
		height: "4rem",
		justifyContent: "space-between",
		width: "100%",
	},
}));

const Footer = () => {
	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up("md"));
	const classes = useStyles();
	return (
		<>
			<Divider variant="middle" />
			<footer className={classes.root}>
				<Container maxWidth="lg">
					<Typography
						align={md ? "left" : "center"}
						color="textSecondary"
					>
						Mateusz Aliyev &copy; {new Date().getFullYear()}
					</Typography>
				</Container>
			</footer>
		</>
	);
};

export default Footer;
