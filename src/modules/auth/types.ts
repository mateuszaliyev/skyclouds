import { Dispatch, SetStateAction } from "react";

import { City } from "../weather/types";

export const unitsList = ["imperial", "metric"] as const;

export interface Person {
	password: string;
	username: string;
}

export interface Settings {
	units: Units;
}

export type Units = typeof unitsList[number];

export interface User extends Person, Settings {
	currentCity?: City;
	trackedCities: City[];
}

export type UserContextType = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
};
