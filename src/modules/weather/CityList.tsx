import { useContext } from "react";

import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { City } from "./types";
import CityCard from "./CityCard";
import { UserContext } from "../auth/UserContextProvider";

const useStyles = makeStyles({
	container: {
		display: "flex",
		flexWrap: "wrap",
		gap: "1rem",
		justifyContent: "center",
	},
	root: {
		display: "flex",
		justifyContent: "center",
		margin: "2rem 0",
		width: "100%",
	},
});

const CityList = () => {
	const { user } = useContext(UserContext);

	const classes = useStyles();

	return (
		<section className={classes.root}>
			<Container className={classes.container} maxWidth="lg">
				{user &&
					user.trackedCities &&
					user.trackedCities.length > 0 &&
					user.trackedCities.map((city: City) => (
						<CityCard city={city} key={city.id} />
					))}
				<CityCard />
			</Container>
		</section>
	);
};

export default CityList;
