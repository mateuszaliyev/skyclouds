import { ChangeEvent, useContext, useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import PersonIcon from "@material-ui/icons/Person";
import SpeedIcon from "@material-ui/icons/Speed";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { Settings, Units, unitsList, User } from "../auth/types";
import { SettingsDialogProps } from "./types";
import Tooltip from "../common/Tooltip";
import { UserContext } from "../auth/UserContextProvider";

const useStyles = makeStyles((theme) => ({
	cancel: {
		color: theme.palette.error.main,
		"&:hover": {
			backgroundColor: `${theme.palette.error.main}${Math.round(
				255 * theme.palette.action.hoverOpacity
			)
				.toString(16)
				.padStart(2, "0")}`,
		},
	},
	capitalize: {
		textTransform: "capitalize",
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
	content: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		marginTop: "1rem",
	},
	textField: {
		alignItems: "center",
		display: "flex",
		gap: "1rem",
	},
	title: {
		backgroundColor: theme.palette.primary.main,
		color: "#fff",
	},
}));

const SettingsDialog = (props: SettingsDialogProps) => {
	const { user, setUser } = useContext(UserContext);
	const [settings, setSettings] = useState<Settings>({
		units: "metric",
	});

	const classes = useStyles();

	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		key: keyof Settings
	) => {
		setSettings((prevSettings) => ({
			...prevSettings,
			[key]: e.target.value as Units,
		}));
	};

	const handleSave = () => {
		setUser(
			(prevUser) =>
				({
					...prevUser,
					...settings,
				} as User)
		);
		props.onClose();
	};

	useEffect(() => {
		if (user) {
			setSettings(user as Settings);
		}
	}, [user]);

	return (
		<Dialog {...props}>
			<DialogTitle className={classes.title} disableTypography>
				<Typography variant="h6">Settings</Typography>
				<Tooltip title="Close">
					<IconButton
						className={classes.closeButton}
						color="inherit"
						onClick={props.onClose}
					>
						<CloseIcon />
					</IconButton>
				</Tooltip>
			</DialogTitle>
			<DialogContent className={classes.content}>
				{user && (
					<>
						<div className={classes.textField}>
							<PersonIcon color="disabled" />
							<TextField
								disabled
								fullWidth
								label="Username"
								value={user.username}
								variant="outlined"
							></TextField>
						</div>
						<div className={classes.textField}>
							<LockIcon color="disabled" />
							<TextField
								disabled
								fullWidth
								label="Password"
								type="password"
								value={user.password}
								variant="outlined"
							></TextField>
						</div>
					</>
				)}
				{settings && (
					<div className={classes.textField}>
						<SpeedIcon />
						<TextField
							className={classes.capitalize}
							fullWidth
							label="Units"
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleChange(e, "units")
							}
							select
							value={settings.units}
							variant="outlined"
						>
							{unitsList.map((unit) => (
								<MenuItem
									className={classes.capitalize}
									key={unit}
									value={unit}
								>
									{unit}
								</MenuItem>
							))}
						</TextField>
					</div>
				)}
			</DialogContent>
			<DialogActions>
				<Button className={classes.cancel} onClick={props.onClose}>
					Cancel
				</Button>
				<Button color="primary" onClick={handleSave}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SettingsDialog;
