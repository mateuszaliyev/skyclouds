import { DialogProps } from "@material-ui/core/Dialog";

export interface City {
	coord: {
		/**
		 * City geo location, latitude.
		 */
		lat: number;
		/**
		 * City geo location, longitude.
		 */
		lon: number;
	};
	/**
	 * Country code (GB, JP etc.).
	 */
	country: string;
	/**
	 * City ID.
	 */
	id: number;
	/**
	 * City name.
	 */
	name: string;
	state: string;
	/**
	 * Shift in seconds from UTC.
	 */
	timezone?: number;
}

export interface CityCardProps {
	city?: City;
}

export interface CityDialogProps extends DialogProps {
	onClose: () => void;
}

export interface Clouds {
	/**
	 * Cloudiness, %.
	 */
	all: number;
}

export interface CurrentWeather {
	/**
	 * Internal parameter
	 */
	base: string;
	clouds: Clouds;
	/**
	 * Internal parameter.
	 */
	cod: number;
	coord: {
		/**
		 * City geo location, longitude
		 */
		lat: number;
		/**
		 * City geo location, latitude
		 */
		lon: number;
	};
	/**
	 * Time of data calculation, unix, UTC.
	 */
	dt: number;
	/**
	 * City ID.
	 */
	id: number;
	main: {
		/**
		 * Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
		 */
		feels_like: number;
		/**
		 * Atmospheric pressure on the ground level, hPa.
		 */
		grnd_level: number;
		/**
		 * Humidity, %.
		 */
		humidity: number;
		/**
		 * Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa.
		 */
		pressure: number;
		/**
		 * Atmospheric pressure on the sea level, hPa.
		 */
		sea_level: number;
		/**
		 * Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
		 */
		temp: number;
		/**
		 * Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
		 */
		temp_max: number;
		/**
		 * Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
		 */
		temp_min: number;
	};
	/**
	 * City name.
	 */
	name: string;
	rain?: {
		/**
		 * Rain volume for the last 1 hour, mm.
		 */
		"1h": number;
		/**
		 * Rain volume for the last 3 hours, mm.
		 */
		"3h": number;
	};
	snow?: {
		/**
		 * Snow volume for the last 1 hour, mm.
		 */
		"1h": number;
		/**
		 * Snow volume for the last 3 hours, mm.
		 */
		"3h": number;
	};
	sys: {
		/**
		 * Country code (GB, JP etc.).
		 */
		country: string;
		/**
		 * Internal parameter.
		 */
		id: number;
		/**
		 * Internal parameter.
		 */
		message: number;
		/**
		 * Sunrise time, unix, UTC.
		 */
		sunrise: number;
		/**
		 * Sunset time, unix, UTC.
		 */
		sunset: number;
		/**
		 * Internal parameter.
		 */
		type: number;
	};
	/**
	 * Shift in seconds from UTC.
	 */
	timezone: number;
	weather: Weather[];
	wind: Wind;
	visibility: number;
}

export interface ForecastWeather {
	city: City;
	/**
	 * A number of timestamps returned in the API response.
	 */
	cnt: number;
	/**
	 * Internal parameter
	 */
	cod: number;
	list: ForecastWeatherList[];
	/**
	 * Internal parameter.
	 */
	message: number;
}

export interface ForecastWeatherList {
	clouds: Clouds;
	/**
	 * Time of data forecasted, unix, UTC.
	 */
	dt: number;
	/**
	 * Time of data forecasted, ISO, UTC.
	 */
	dt_txt: string;
	main: {
		/**
		 * This temperature parameter accounts for the human perception of weather.
		 * Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
		 */
		feels_like: number;
		/**
		 * Atmospheric pressure on the ground level, hPa.
		 */
		grnd_level: number;
		/**
		 * Humidity, %.
		 */
		humidity: number;
		/**
		 * Atmospheric pressure on the sea level by default, hPa.
		 */
		pressure: number;
		/**
		 * Atmospheric pressure on the sea level, hPa.
		 */
		sea_level: number;
		/**
		 * Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
		 */
		temp: number;
		/**
		 * Internal parameter.
		 */
		temp_kf: number;
		/**
		 * Maximum temperature at the moment of calculation.
		 * This is maximal forecasted temperature (within large megalopolises and urban areas), use this parameter optionally.
		 * Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
		 */
		temp_max: number;
		/**
		 * Minimum temperature at the moment of calculation.
		 * This is minimal forecasted temperature (within large megalopolises and urban areas), use this parameter optionally.
		 * Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
		 */
		temp_min: number;
	};
	/**
	 * Probability of precipitation.
	 */
	pop: number;
	rain: {
		/**
		 * Rain volume for last 3 hours, mm
		 */
		"3h": number;
	};
	snow: {
		/**
		 * Snow volume for last 3 hours, mm.
		 */
		"3h": number;
	};
	sys: {
		/**
		 * Part of the day (n - night, d - day).
		 */
		pod: string;
	};
	/**
	 * Average visibility, metres.
	 */
	visibility: number;
	weather: Weather[];
	wind: Wind;
}

export type JumbotronDetailsProps = {
	city: City;
	currentWeather: CurrentWeather;
};

export interface Weather {
	/**
	 * Weather condition within the group.
	 */
	description: string;
	/**
	 * Weather icon id
	 */
	icon: WeatherIcon;
	/**
	 * Weather condition id
	 */
	id: number;
	/**
	 * Group of weather parameters (Rain, Snow, Extreme etc.)
	 */
	main: string;
}

export type WeatherIcon =
	| "01d"
	| "01n"
	| "02d"
	| "02n"
	| "03d"
	| "03n"
	| "04d"
	| "04n"
	| "09d"
	| "09n"
	| "10d"
	| "10n"
	| "11d"
	| "11n"
	| "13d"
	| "13n"
	| "50d"
	| "50n";

export interface WeatherIconProps {
	icon: WeatherIcon;
	invertColor?: boolean;
	size?: string;
}

export interface Wind {
	/**
	 * Wind direction, degrees (meteorological).
	 */
	deg: number;
	/**
	 * Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
	 */
	gust: number;
	/**
	 * Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
	 */
	speed: number;
}
