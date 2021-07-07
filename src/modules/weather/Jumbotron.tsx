import { useContext, useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import LocationOffIcon from "@material-ui/icons/LocationOff";
import makeStyles from "@material-ui/core/styles/makeStyles";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

import { City, CurrentWeather } from "./types";
import iso31661alpha2 from "./utils/countries";
import JumbotronDetails from "./JumbotronDetails";
import Loader from "../common/Loader";
import { toImperial, toMetric } from "./utils/temperature";
import Tooltip from "../common/Tooltip";
import { UserContext } from "../auth/UserContextProvider";
import WeatherIcon from "./WeatherIcon";
import { Button } from "@material-ui/core";

const useStyles = makeStyles<Theme, { md: boolean; sm: boolean }>({
	container: ({ md }) => ({
		alignItems: "center",
		display: "flex",
		flexDirection: md ? "row" : "column",
		gap: "1rem",
		height: md ? "24rem" : "auto",
		justifyContent: "flex-start",
		margin: md ? "" : "1rem 0",
	}),
	description: ({ md }) => ({
		alignItems: "center",
		display: "flex",
		gap: "1rem",
		justifyContent: md ? "flex-end" : "center",
	}),
	details: ({ md }) => ({
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		justifyContent: "center",
		marginLeft: md ? "auto" : "",
		marginTop: md ? "" : "1rem",
	}),
	empty: ({ sm }) => ({
		alignItems: "center",
		display: "flex",
		flexDirection: sm ? "row" : "column",
		fontSize: "8rem",
		gap: "1rem",
		height: "100%",
		justifyContent: "center",
		opacity: "0.5",
		width: "100%",
	}),
	root: ({ md }) => ({
		backgroundImage:
			"radial-gradient(circle at 52% 94%, rgba(169, 169, 169, 0.04) 0%, rgba(169, 169, 169, 0.04) 50%, rgba(199, 199, 199, 0.04) 50%, rgba(199, 199, 199, 0.04) 100%), radial-gradient(circle at 96% 98%, rgba(61, 61, 61, 0.04) 0%, rgba(61, 61, 61, 0.04) 50%, rgba(201, 201, 201, 0.04) 50%, rgba(201, 201, 201, 0.04) 100%), radial-gradient(circle at 93% 97%, rgba(227, 227, 227, 0.04) 0%, rgba(227, 227, 227, 0.04) 50%, rgba(145, 145, 145, 0.04) 50%, rgba(145, 145, 145, 0.04) 100%), radial-gradient(circle at 79% 52%, rgba(245, 245, 245, 0.04) 0%, rgba(245, 245, 245, 0.04) 50%, rgba(86, 86, 86, 0.04) 50%, rgba(86, 86, 86, 0.04) 100%), linear-gradient(90deg, rgb(33, 150, 243), rgb(0, 44, 118))",
		color: "#fff",
		display: "flex",
		flexDirection: "column",
		marginBottom: md ? "" : "2rem",
		paddingTop: "4rem",
	}),
	temperature: {
		display: "flex",
		userSelect: "none",
	},
	temperatureUnit: {
		paddingTop: "2.5rem",
		width: "4rem",
	},
	temperatureValue: ({ md }) => ({
		display: "inline",
		fontSize: md ? "10rem" : "6rem",
		paddingLeft: md ? "" : "2rem",
	}),
});

const Jumbotron = () => {
	const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
		null
	);
	const [details, setDetails] = useState(false);
	const [loading, setLoading] = useState(false);

	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up("md"));
	const sm = useMediaQuery(theme.breakpoints.up("sm"));
	const classes = useStyles({ md, sm });

	const { user } = useContext(UserContext);

	const getWeather = async (city: City) => {
		setLoading(true);
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
		setLoading(false);
	};

	const handleDetails = () => {
		setDetails((prevDetails) => !prevDetails);
	};

	const handleUpdate = async () => {
		if (user && user.currentCity) {
			try {
				await getWeather(user.currentCity);
			} catch (err) {
				return console.error(err);
			}
		}
	};

	useEffect(() => {
		if (user && user.currentCity) {
			getWeather(user.currentCity);
		}
	}, [user?.currentCity]);

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
		<section className={classes.root}>
			<Container className={classes.container} maxWidth="lg">
				{loading ? (
					<Loader color="#fff" />
				) : currentWeather ? (
					<>
						<div className={classes.temperature}>
							<Typography
								className={classes.temperatureValue}
								color="inherit"
								variant="h1"
							>
								{temperature}
								<sup>
									<span style={{ fontSize: "0.75em" }}>
										&deg;
									</span>
								</sup>
							</Typography>
						</div>
						<WeatherIcon
							icon={currentWeather.weather[0].icon}
							invertColor
							size={md ? "10rem" : "6rem"}
						/>
						<div className={classes.details}>
							<div>
								<Typography
									align={md ? "right" : "center"}
									variant="h3"
								>
									{currentWeather.name}
								</Typography>
								<Typography align={md ? "right" : "center"}>
									<Tooltip title="Open in Google Maps">
										<IconButton
											color="inherit"
											onClick={() =>
												window.open(
													`https://www.google.com/maps/search/?api=1&query=${
														currentWeather.name
													}+${
														iso31661alpha2[
															currentWeather.sys
																.country
														]
													}`,
													"_ blank"
												)
											}
											size="small"
										>
											<OpenInNewIcon
												style={{ fontSize: "1rem" }}
											/>
										</IconButton>
									</Tooltip>
									{iso31661alpha2[currentWeather.sys.country]}
								</Typography>
							</div>
							<div className={classes.description}>
								<WeatherIcon
									icon={currentWeather.weather[0].icon}
									invertColor
									size="2rem"
								/>
								<Typography align={md ? "right" : "center"}>
									{currentWeather.weather[0].description}
								</Typography>
							</div>
							<Typography
								align={md ? "right" : "center"}
								variant="overline"
							>
								<Tooltip title="Update">
									<IconButton
										color="inherit"
										onClick={handleUpdate}
										size="small"
									>
										<RefreshIcon
											style={{ fontSize: "1rem" }}
										/>
									</IconButton>
								</Tooltip>
								{`Last update: ${new Date(
									currentWeather.dt * 1000
								).toLocaleString()}`}
							</Typography>
						</div>
					</>
				) : (
					<div className={classes.empty}>
						<LocationOffIcon fontSize="inherit" />
						<Typography
							align={md ? "left" : "center"}
							variant={md ? "h2" : "h4"}
						>
							No cities tracked
						</Typography>
					</div>
				)}
			</Container>
			{currentWeather && user?.currentCity && (
				<>
					{" "}
					<Button
						color="inherit"
						onClick={handleDetails}
						startIcon={
							details ? <ExpandLessIcon /> : <ExpandMoreIcon />
						}
						style={{ alignSelf: "center" }}
					>
						Details
					</Button>
					{details && (
						<JumbotronDetails
							city={user.currentCity}
							currentWeather={currentWeather}
						/>
					)}
				</>
			)}
		</section>
	);
};

export default Jumbotron;
