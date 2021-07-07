import HomePage from "../modules/weather/HomePage";
import withAuth from "../modules/auth/withAuth";

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const url = `https://api.openweathermap.org/data/2.5/weather?id=${59611}&appid=${
// 		process.env.OPEN_WEATHER_MAP_API_KEY
// 	}`;
// 	const res = await fetch(url, { method: "GET" });
// 	const data = await res.json();
// 	return {
// 		props: {
// 			data,
// 		},
// 	};
// };

export default withAuth(HomePage);
