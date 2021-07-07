import { CircularProgressProps } from "@material-ui/core/CircularProgress";

export interface IconProps {
	invertColor?: boolean;
	name: string;
	size?: string;
}

export interface LoaderProps extends Omit<CircularProgressProps, "color"> {
	color?: string;
	fullScreen?: boolean;
}

export type MuiColor = "primary" | "secondary" | "inherit";
