import { createContext, ReactNode, useEffect, useState } from "react";

import { User, UserContextType } from "./types";

export const UserContext = createContext<UserContextType>({
	user: null,
	setUser: () => {},
});

const UserContextProvider = (props: { children: ReactNode }) => {
	const { children } = props;

	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (user) {
			localStorage.setItem("cities", JSON.stringify(user.trackedCities));
			localStorage.setItem("units", user.units);
		}
	}, [user]);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
