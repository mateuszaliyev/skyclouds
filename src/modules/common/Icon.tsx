import { IconProps } from "./types";

const Icon = (props: IconProps) => {
	return (
		<div
			style={{
				backgroundImage: `url(/icons/${props.name}.svg)`,
				backgroundSize: "cover",
				filter: props.invertColor ? "invert(1)" : "",
				height: props.size ? props.size : "1em",
				width: props.size ? props.size : "1em",
			}}
		></div>
	);
};

export default Icon;
