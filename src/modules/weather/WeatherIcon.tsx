import { WeatherIconProps } from "./types";

export const weatherIcons = {
	"01d": "sun-fill",
	"01n": "moon-fill",
	"02d": "cloud-sun-fill",
	"02n": "cloud-moon-fill",
	"03d": "cloud-fill",
	"03n": "cloud-fill",
	"04d": "clouds-fill",
	"04n": "clouds-fill",
	"09d": "cloud-rain-heavy-fill",
	"09n": "cloud-rain-heavy-fill",
	"10d": "cloud-drizzle-fill",
	"10n": "cloud-drizzle-fill",
	"11d": "cloud-lightning-rain-fill",
	"11n": "cloud-lightning-rain-fill",
	"13d": "cloud-snow-fill",
	"13n": "cloud-snow-fill",
	"50d": "cloud-haze-fill",
	"50n": "cloud-haze-fill",
};

const WeatherIcon = (props: WeatherIconProps) => {
	return (
		<div
			style={{
				backgroundImage: `url(/icons/${weatherIcons[props.icon]}.svg)`,
				backgroundSize: "cover",
				filter: props.invertColor ? "invert(1)" : "",
				height: props.size ? props.size : "1em",
				width: props.size ? props.size : "1em",
			}}
		></div>
	);
};

export default WeatherIcon;
