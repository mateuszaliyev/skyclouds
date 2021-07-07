import { ReactNode, useContext, useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

import { ForecastWeather, JumbotronDetailsProps } from "./types";
import Icon from "../common/Icon";
import { toImperial, toMetric } from "./utils/temperature";
import { Units } from "../auth/types";
import { UserContext } from "../auth/UserContextProvider";
import WeatherIcon from "./WeatherIcon";

const useStyles = makeStyles<Theme, { md: boolean }>({
	container: ({ md }) => ({
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		margin: md ? "" : "1rem 0",
	}),
	details: {
		"& > ul": {
			display: "flex",
			flexWrap: "wrap",
		},
	},
	detailsItem: {
		width: ({ md }) => (md ? "50%" : "100%"),
	},
	hourCard: {
		alignItems: "center",
		background: "transparent",
		borderRight: "1px solid rgba(255, 255, 255, 0.12)",
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
		gap: "0.5rem",
		maxWidth: "8.75rem",
		minWidth: "8.75rem",
		paddingRight: "1rem",
		"&:last-child": {
			borderRight: "none",
		},
	},
	hourCardIcon: {
		alignItems: "center",
		display: "flex",
		gap: "0.5rem",
		opacity: 0.7,
	},
	hourList: ({ md }) => ({
		display: "flex",
		gap: "1rem",
		marginBottom: "1rem",
		overflowX: "auto",
	}),
});

const windDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];

const Item = (props: {
	iconName: string;
	label: ReactNode;
	value: ReactNode;
}) => {
	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up("md"));
	const classes = useStyles({ md });

	return (
		<ListItem className={classes.detailsItem} disableGutters={!md}>
			<ListItemIcon>
				<Icon invertColor name={props.iconName} size="2rem" />
			</ListItemIcon>
			<ListItemText primary={props.label} />
			<ListItemText
				primary={props.value}
				primaryTypographyProps={{ align: "right" }}
			/>
		</ListItem>
	);
};

const Distance = (props: { distance: number; units: Units }) => {
	return (
		<>
			<span>
				{props.units === "imperial"
					? `${Math.round(props.distance * 1.0936133)} yd`
					: props.units === "metric"
					? `${Math.round(props.distance)} m`
					: ""}
			</span>
		</>
	);
};

const Temperature = (props: { temp: number; units: Units }) => {
	return (
		<>
			<span>
				{Math.round(
					props.units === "imperial"
						? toImperial(props.temp)
						: props.units === "metric"
						? toMetric(props.temp)
						: 0
				)}
			</span>
			<sup>°</sup>
		</>
	);
};

const Velocity = (props: { units: Units; velocity: number }) => {
	return (
		<>
			<span>
				{props.units === "imperial"
					? `${Math.round(props.velocity * 22.369362920544) / 10} mph`
					: props.units === "metric"
					? `${Math.round(props.velocity * 10) / 10} m/s`
					: ""}
			</span>
		</>
	);
};

const JumbotronDetails = (props: JumbotronDetailsProps) => {
	const { city, currentWeather } = props;

	const [forecastWeather, setForecastWeather] =
		useState<ForecastWeather | null>(null);
	const [loading, setLoading] = useState(false);

	const { user } = useContext(UserContext);

	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up("md"));
	const classes = useStyles({ md });

	const getTime = (UTCTime: number, timezoneOffset: number): string => {
		const date = new Date(
			new Date(UTCTime).getTime() + new Date(timezoneOffset).getTime()
		);
		return `${
			date.getUTCHours() < 10
				? `0${date.getUTCHours()}`
				: date.getUTCHours()
		}:${
			date.getUTCMinutes() < 10
				? `0${date.getUTCMinutes()}`
				: date.getUTCMinutes()
		}`;
	};

	const getWeather = async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/weather/forecast/${city.id}`, {
				method: "GET",
			});
			if (res.ok) {
				const data = (await res.json()) as ForecastWeather;
				setForecastWeather(data);
			}
		} catch (err) {
			console.error(err);
		}
		setLoading(false);
	};

	useEffect(() => {
		return () => {
			setForecastWeather(null);
		};
	}, []);

	useEffect(() => {
		if (city) {
			getWeather();
		}
	}, [city]);

	return user ? (
		<Container className={classes.container} maxWidth="lg">
			<div className={classes.details}>
				<List className={classes.displayList}>
					<Item
						iconName="thermometer-half"
						label="Temperature"
						value={
							<Temperature
								temp={currentWeather.main.temp}
								units={user.units}
							/>
						}
					/>
					<Item
						iconName="tree-fill"
						label="Feels like"
						value={
							<Temperature
								temp={currentWeather.main.feels_like}
								units={user.units}
							/>
						}
					/>
					<Item
						iconName="thermometer-snow"
						label="Minimum"
						value={
							<Temperature
								temp={currentWeather.main.temp_min}
								units={user.units}
							/>
						}
					/>
					<Item
						iconName="thermometer-sun"
						label="Maximum"
						value={
							<Temperature
								temp={currentWeather.main.temp_max}
								units={user.units}
							/>
						}
					/>
					<Item
						iconName="droplet-fill"
						label="Humidity"
						value={`${currentWeather.main.humidity}%`}
					/>
					<Item
						iconName="speedometer"
						label="Pressure"
						value={`${currentWeather.main.pressure} hPa`}
					/>
					<Item
						iconName="compass-fill"
						label="Wind direction"
						value={
							windDirections[
								Math.round(currentWeather.wind.deg / 45)
							]
						}
					/>
					<Item
						iconName="wind"
						label="Wind speed"
						value={
							<Velocity
								units={user.units}
								velocity={currentWeather.wind.speed}
							/>
						}
					/>
					<Item
						iconName="clouds-fill"
						label="Cloudiness"
						value={`${currentWeather.clouds.all}%`}
					/>
					<Item
						iconName="cloud-haze-fill"
						label="Visibility"
						value={
							<Distance
								distance={currentWeather.visibility}
								units={user.units}
							/>
						}
					/>
					<Item
						iconName="sunrise-fill"
						label="Sunrise"
						value={(() =>
							getTime(
								currentWeather.sys.sunrise * 1000,
								currentWeather.timezone * 1000
							))()}
					/>
					<Item
						iconName="sunset-fill"
						label="Sunset"
						value={(() =>
							getTime(
								currentWeather.sys.sunset * 1000,
								currentWeather.timezone * 1000
							))()}
					/>
				</List>
			</div>
			{forecastWeather && (
				<>
					<Typography align={md ? "left" : "center"} variant="h5">
						24 hours
					</Typography>
					<div className={classes.hourList}>
						{forecastWeather.list
							.filter((weather, index) => index < 8)
							.map((weather) => (
								<div
									className={classes.hourCard}
									key={weather.dt}
								>
									<Typography
										style={{ paddingLeft: "1rem" }}
										variant="h4"
									>
										<Temperature
											temp={weather.main.temp}
											units={user.units}
										/>
									</Typography>
									<WeatherIcon
										invertColor
										icon={weather.weather[0].icon}
										size="2.5rem"
									/>
									<Typography variant="body2">
										{weather.weather[0].description}
									</Typography>
									<div className={classes.hourCardIcon}>
										<Icon
											invertColor
											name="cloud-rain-heavy-fill"
										/>
										<Typography variant="body2">
											{`${Math.round(
												weather.pop * 100
											)}%`}
										</Typography>
									</div>
									<div className={classes.hourCardIcon}>
										<Icon invertColor name="droplet-fill" />
										<Typography variant="body2">
											{`${weather.main.humidity}%`}
										</Typography>
									</div>
									<div className={classes.hourCardIcon}>
										<Icon invertColor name="wind" />
										<Typography variant="body2">
											<Velocity
												units={user.units}
												velocity={weather.wind.speed}
											/>
										</Typography>
									</div>
									<Typography>
										{getTime(
											weather.dt * 1000,
											forecastWeather.city.timezone! *
												1000
										)}
									</Typography>
								</div>
							))}
					</div>
				</>
			)}
		</Container>
	) : (
		<span></span>
	);
};

export default JumbotronDetails;
