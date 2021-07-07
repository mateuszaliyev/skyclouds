import CircularProgress from "@material-ui/core/CircularProgress";
import { LoaderProps, MuiColor } from "./types";

const Loader = (props: LoaderProps) => {
	const { color, fullScreen, ...circularProgressProps } = props;

	const isMuiColor =
		color === "primary" || color === "secondary" || color === "inherit";

	return (
		<div
			style={{
				color: isMuiColor ? "" : color,
				display: "grid",
				height: fullScreen ? "100vh" : "100%",
				placeItems: "center",
				width: "100%",
			}}
		>
			<CircularProgress
				color={isMuiColor ? (color as MuiColor) : "inherit"}
				size="4rem"
				{...circularProgressProps}
			/>
		</div>
	);
};

export default Loader;
