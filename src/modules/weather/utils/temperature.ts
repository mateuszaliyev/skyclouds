/**
 * Converts temperature from Kelvin to Fahrenheit
 * @param temp Temperature in Kelvin
 * @returns Temperature in Fahrenheit
 */
export const toImperial = (temp: number): number => {
	return 1.8 * temp - 459.67;
};

/**
 * Converts temperature from Kelvin to Celsius
 * @param temp Temperature in Kelvin
 * @returns Temperature in Celsius
 */
export const toMetric = (temp: number): number => {
	return temp - 273.15;
};
