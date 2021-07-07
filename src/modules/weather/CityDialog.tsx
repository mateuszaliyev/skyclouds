import { ChangeEvent, FormEvent, useContext, useState } from "react";

import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";

import { City, CityDialogProps } from "./types";
import iso31661alpha2 from "./utils/countries";
import search from "./utils/search";
import Tooltip from "../common/Tooltip";
import { User } from "../auth/types";
import { UserContext } from "../auth/UserContextProvider";

const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
	input: {
		flex: 1,
		marginLeft: "1rem",
	},
	paper: {
		display: "flex",
	},
	title: {
		backgroundColor: theme.palette.primary.main,
		color: "#fff",
	},
}));

const CityDialog = (props: CityDialogProps) => {
	const { user, setUser } = useContext(UserContext);
	const [searchResults, setSearchResults] = useState<City[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const classes = useStyles();

	const handleAdd = (city: City) => {
		setUser((prevUser) => {
			if (prevUser) {
				const currentCity: City = prevUser.currentCity
					? prevUser.currentCity
					: city;
				const trackedCities: City[] = [
					...prevUser!.trackedCities!,
					city,
				];
				return {
					...prevUser,
					currentCity,
					trackedCities,
				} as User;
			}
			return prevUser;
		});
		props.onClose();
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (searchQuery.length < 3) {
			return;
		}

		try {
			const results = await search(searchQuery);
			setSearchResults(results);
		} catch (err) {
			return console.error(err);
		}
	};

	return (
		<Dialog {...props}>
			<DialogTitle className={classes.title} disableTypography>
				<Typography variant="h6">Add city</Typography>
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
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<Paper className={classes.paper}>
						<InputBase
							autoFocus
							className={classes.input}
							placeholder="Type at least 3 characters..."
							onChange={handleChange}
						/>
						<Tooltip title="Search">
							<IconButton type="submit">
								<SearchIcon />
							</IconButton>
						</Tooltip>
					</Paper>
				</form>
				{searchResults.length > 0 && (
					<List>
						<ListSubheader disableSticky>Results</ListSubheader>
						{searchResults.map((city: City, index) => (
							<ListItem
								button
								divider={index === searchResults.length - 1}
								key={city.id}
								onClick={() => handleAdd(city)}
							>
								<ListItemText
									primary={city.name}
									secondary={`${
										iso31661alpha2[city.country]
									} (${Math.abs(city.coord.lat)}°${
										city.coord.lat >= 0 ? "N" : "S"
									}, ${Math.abs(city.coord.lon)}°${
										city.coord.lon >= 0 ? "E" : "W"
									})`}
								/>
							</ListItem>
						))}
						{searchResults.length === 200 && (
							<ListItem disabled>
								<ListItemIcon>
									<NotListedLocationIcon fontSize="large" />
								</ListItemIcon>
								<ListItemText
									primary={`Limit of ${searchResults.length} items reached`}
									secondary="Try making your query more precise"
								/>
							</ListItem>
						)}
					</List>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default CityDialog;
