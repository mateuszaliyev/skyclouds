import { City } from "../types";

/**
 * Creates an array of cities that satisfy the search query.
 * @param searchQuery Searched string
 * @returns Array of cities containing given string
 */
const search = async (searchQuery: string) => {
	return new Promise<City[]>(async (resolve, reject) => {
		try {
			const res = await fetch("/city.list.json", { method: "GET" });
			if (res.ok) {
				const cities = (await res.json()) as City[];
				const query = searchQuery.toLowerCase();
				const results = cities
					.filter((city) => city.name.toLowerCase().includes(query))
					.sort((a, b) => (a.name < b.name ? -1 : 1))
					.slice(0, 200);
				resolve(results);
			} else {
				reject([] as City[]);
			}
		} catch (err) {
			console.error(err);
			reject(err);
		}
	});
};

export default search;
