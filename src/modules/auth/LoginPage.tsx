import { useContext, useEffect } from "react";
import { ChangeEventHandler, FormEvent, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FilterDramaTwoToneIcon from "@material-ui/icons/FilterDramaTwoTone";
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { City } from "../weather/types";
import { Person, Units, unitsList } from "./types";
import { UserContext } from "./UserContextProvider";

import Loader from "../common/Loader";

const useStyles = makeStyles({
	formControl: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
	},
	icon: {
		fontSize: "8rem",
	},
	logo: {
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
	},
	margin: {
		marginBottom: "22px",
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		gap: "2rem",
		padding: "2rem",
		width: "100%",
	},
	root: {
		display: "grid",
		height: "100vh",
		placeItems: "center",
		width: "100%",
	},
});

const LoginPage = () => {
	const classes = useStyles();
	const router = useRouter();
	const { user, setUser } = useContext(UserContext);

	const [loginData, setLoginData] = useState<Person>({
		password: "",
		username: "",
	});

	const [loginFeedback, setLoginFeedback] = useState<Person>({
		password: "",
		username: "",
	});

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setLoginData((prevLoginData) => ({
			...prevLoginData,
			[e.target.getAttribute("name")!]: e.target.value,
		}));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (loginData.password.length < 3 || loginData.username.length < 3) {
			setLoginFeedback({
				password:
					loginData.password.length < 3
						? "Password must be at least 3 characters long"
						: "",
				username:
					loginData.username.length < 3
						? "Username must be at least 3 characters long"
						: "",
			});
			return;
		}

		if (loginData.username !== "admin") {
			setLoginFeedback({
				password: "",
				username: "Invalid username",
			});
			return;
		}

		if (loginData.password !== "admin") {
			setLoginFeedback({
				password: "Invalid password",
				username: "",
			});
			return;
		}

		setLoginFeedback({
			password: "",
			username: "",
		});

		const localStorageCities = localStorage.getItem("cities");
		const trackedCities = (
			localStorageCities ? JSON.parse(localStorageCities) : []
		) as City[];
		const units = localStorage.getItem("units") as Units | null;

		setUser({
			currentCity:
				trackedCities.length > 0 ? trackedCities[0] : undefined,
			password: loginData.password,
			trackedCities,
			units: units && unitsList.includes(units) ? units : "metric",
			username: loginData.username,
		});
	};

	useEffect(() => {
		if (user) {
			router.replace("/home");
		}
	}, [user]);

	return (
		<>
			<Head>
				<title>Login | {process.env.NEXT_PUBLIC_APP_NAME}</title>
			</Head>
			<Container className={classes.root} maxWidth="sm">
				{user ? (
					<Loader color="primary" />
				) : (
					<Paper className={classes.paper} elevation={24}>
						<div className={classes.logo}>
							<FilterDramaTwoToneIcon
								className={classes.icon}
								color="primary"
							/>
							<Typography
								align="center"
								color="primary"
								component="h1"
								style={{ userSelect: "none" }}
								variant="h4"
							>
								{process.env.NEXT_PUBLIC_APP_NAME}
							</Typography>
						</div>
						<form autoComplete="off" onSubmit={handleSubmit}>
							<FormControl
								className={classes.formControl}
								fullWidth
							>
								<TextField
									className={
										loginFeedback.username
											? ""
											: classes.margin
									}
									error={Boolean(loginFeedback.username)}
									helperText={loginFeedback.username}
									label="Username"
									name="username"
									onChange={handleChange}
									variant="outlined"
								/>
								<TextField
									className={
										loginFeedback.password
											? ""
											: classes.margin
									}
									error={Boolean(loginFeedback.password)}
									helperText={loginFeedback.password}
									label="Password"
									name="password"
									onChange={handleChange}
									type="password"
									variant="outlined"
								/>
								<Button
									color="primary"
									size="large"
									type="submit"
									variant="contained"
								>
									Sign In
								</Button>
							</FormControl>
						</form>
					</Paper>
				)}
			</Container>
		</>
	);
};

export default LoginPage;
