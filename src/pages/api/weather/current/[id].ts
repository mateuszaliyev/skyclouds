import type { NextApiRequest, NextApiResponse } from "next";

import { CurrentWeather } from "../../../../modules/weather/types";

const getCurrentWeather = async (
	req: NextApiRequest,
	res: NextApiResponse<CurrentWeather>
) => {
	if (req.method === "GET") {
		const { id } = req.query;
		const url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
		try {
			const response = await fetch(url, { method: "GET" });
			if (response.ok) {
				const data = await response.json();
				return res.status(200).json(data);
			}
			return res.status(400);
		} catch (err) {
			console.error(err);
			return res.status(500);
		}
	}
};

export default getCurrentWeather;
