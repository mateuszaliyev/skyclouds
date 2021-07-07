import { useContext, useEffect, useState } from "react";

import AddLocationIcon from "@material-ui/icons/AddLocation";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

import { City, CityCardProps, CurrentWeather } from "./types";
import CityDialog from "./CityDialog";
import iso31661alpha2 from "./utils/countries";
import { toImperial, toMetric } from "./utils/temperature";
import { User } from "../auth/types";
import { UserContext } from "../auth/UserContextProvider";
import WeatherIcon from "./WeatherIcon";

const useStyles = makeStyles((theme) => ({
	actions: {
		justifyContent: "flex-end",
		marginTop: "auto",
	},
	add: {
		color: "rgba(0, 0, 0, 0.5)",
		display: "grid",
		fontSize: "4rem",
		height: "100%",
		placeItems: "center",
		width: "100%",
	},
	content: {
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
	},
	remove: {
		color: theme.palette.error.main,
		"&:hover": {
			backgroundColor: `${theme.palette.error.main}${Math.round(
				255 * theme.palette.action.hoverOpacity
			)
				.toString(16)
				.padStart(2, "0")}`,
		},
	},
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "16rem",
		minWidth: "16rem",
	},
	weather: {
		alignItems: "center",
		display: "flex",
		height: "100%",
		justifyContent: "space-evenly",
	},
}));

const CityCard = (props: CityCardProps) => {
	const { city } = props;

	const [cityDialogOpen, setCityDialogOpen] = useState(false);
	const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
		null
	);

	const { user, setUser } = useContext(UserContext);

	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up("md"));
	const classes = useStyles();

	const handleAdd = () => {
		setCityDialogOpen(true);
	};

	const handleDetails = () => {
		if (city) {
			setUser((prevUser) => {
				if (prevUser) {
					const currentCity: City = city;
					return {
						...prevUser,
						currentCity,
					} as User;
				}
				return prevUser;
			});
		}
	};

	const handleRemove = () => {
		if (city) {
			setUser((prevUser) => {
				if (prevUser && prevUser.trackedCities) {
					const trackedCities = [...prevUser!.trackedCities].filter(
						(trackedCity) => trackedCity.id !== city.id
					);
					const currentCity: City | undefined =
						prevUser.currentCity?.id === city.id
							? trackedCities.length > 0
								? trackedCities[0]
								: undefined
							: undefined;

					return {
						...prevUser,
						currentCity,
						trackedCities,
					} as User;
				}
				return prevUser;
			});
		}
	};

	const getWeather = async () => {
		if (city) {
			try {
				const res = await fetch(`/api/weather/current/${city.id}`, {
					method: "GET",
				});
				if (res.ok) {
					const data = (await res.json()) as CurrentWeather;
					setCurrentWeather(data);
				}
			} catch (err) {
				console.error(err);
			}
		}
	};

	useEffect(() => {
		if (city) {
			getWeather();
		}
	}, [city]);

	const temperature =
		currentWeather && user
			? Math.round(
					user.units === "imperial"
						? toImperial(currentWeather.main.temp)
						: user.units === "metric"
						? toMetric(currentWeather.main.temp)
						: 0
			  )
			: null;

	return (
		<Card className={classes.root} variant="outlined">
			{city ? (
				<>
					<CardContent className={classes.content}>
						<Typography variant="h5">{city.name}</Typography>
						<Typography color="textSecondary">
							{iso31661alpha2[city.country]}
						</Typography>
						{currentWeather && (
							<div className={classes.weather}>
								<Typography
									style={{ marginBottom: "0.375rem" }}
									variant="h2"
								>
									{temperature}
									<sup>
										<span style={{ fontSize: "0.75em" }}>
											&deg;
										</span>
									</sup>
								</Typography>
								<WeatherIcon
									icon={currentWeather.weather[0].icon}
									size="3rem"
								/>
							</div>
						)}
					</CardContent>
					<CardActions className={classes.actions}>
						<Button
							className={classes.remove}
							onClick={handleRemove}
						>
							Remove
						</Button>
						<Button
							color="primary"
							disabled={city.id === user?.currentCity?.id}
							onClick={handleDetails}
						>
							Show
						</Button>
					</CardActions>
				</>
			) : (
				<>
					<ButtonBase className={classes.add} onClick={handleAdd}>
						<CardContent>
							<AddLocationIcon fontSize="inherit" />
							<Typography variant="h4">Add city</Typography>
						</CardContent>
					</ButtonBase>
					<CityDialog
						fullScreen={!md}
						fullWidth
						onClose={() => setCityDialogOpen(false)}
						open={cityDialogOpen}
					/>
				</>
			)}
		</Card>
	);
};

export default CityCard;
