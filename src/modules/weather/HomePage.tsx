import CityList from "./CityList";
import Jumbotron from "./Jumbotron";
import Layout from "../layout/Layout";

const HomePage = () => {
	return (
		<Layout>
			<Jumbotron />
			<CityList />
		</Layout>
	);
};

export default HomePage;
