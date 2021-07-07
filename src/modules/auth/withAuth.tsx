import { ComponentType, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { UserContext } from "./UserContextProvider";

import Loader from "../common/Loader";

function withAuth<T>(Component: ComponentType<T>) {
	const Auth = (props: T) => {
		const { user } = useContext(UserContext);
		const router = useRouter();

		useEffect(() => {
			if (user === null) {
				router.replace("/");
			}
		}, [user]);

		return user ? (
			<Component {...props} />
		) : (
			<Loader color="primary" fullScreen={true} />
		);
	};

	return Auth;
}

export default withAuth;
