import { cloneElement, ReactElement, useContext, useState } from "react";

import AppBar, { AppBarProps } from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FilterDramaTwoToneIcon from "@material-ui/icons/FilterDramaTwoTone";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SettingsIcon from "@material-ui/icons/Settings";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import useTheme from "@material-ui/core/styles/useTheme";

import SettingsDialog from "./SettingsDialog";
import Tooltip from "../common/Tooltip";
import { UserContext } from "../auth/UserContextProvider";

const useStyles = makeStyles((theme: any) => ({
	appBar: {
		color: "#fff",
		maxHeight: "4rem",
		transition: `background ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
	},
	appBarElevated: {
		backdropFilter: "blur(20px) saturate(180%)",
		backgroundColor: `rgba(0, 0, 0, 0.5)`,
	},
	icon: {
		fontSize: "3rem",
	},
	title: {
		userSelect: "none",
	},
	toolbar: {
		gap: "0.5rem",
	},
}));

const ElevationScroll = (props: { children: ReactElement }) => {
	const { children } = props;

	const classes = useStyles();

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: undefined,
	});

	return cloneElement(children, {
		className: trigger
			? `${classes.appBar} ${classes.appBarElevated}`
			: classes.appBar,
	});
};

const Navbar = (props: AppBarProps) => {
	const { setUser } = useContext(UserContext);
	const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

	const classes = useStyles();
	const theme = useTheme();
	const xs = useMediaQuery(theme.breakpoints.up("xs"));

	const handleLogout = () => {
		setUser(null);
	};

	const handleSettings = () => {
		setSettingsDialogOpen(true);
	};

	return (
		<>
			<ElevationScroll>
				<AppBar
					className={classes.appBar}
					color="transparent"
					elevation={0}
					position="fixed"
					{...props}
				>
					<Container disableGutters maxWidth="lg">
						<Toolbar className={classes.toolbar} component="nav">
							<FilterDramaTwoToneIcon className={classes.icon} />
							{xs && (
								<Typography
									className={classes.title}
									component="h1"
									variant="h5"
								>
									{process.env.NEXT_PUBLIC_APP_NAME}
								</Typography>
							)}
							<Tooltip title="Settings">
								<IconButton
									color="inherit"
									onClick={handleSettings}
									style={{ marginLeft: "auto" }}
								>
									<SettingsIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Logout">
								<IconButton
									color="inherit"
									onClick={handleLogout}
								>
									<ExitToAppIcon />
								</IconButton>
							</Tooltip>
						</Toolbar>
					</Container>
				</AppBar>
			</ElevationScroll>
			<SettingsDialog
				fullWidth
				onClose={() => setSettingsDialogOpen(false)}
				open={settingsDialogOpen}
			/>
		</>
	);
};

export default Navbar;
