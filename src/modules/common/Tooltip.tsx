import makeStyles from "@material-ui/core/styles/makeStyles";
import MuiTooltip, { TooltipProps } from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.primary.dark,
	},
}));

const Tooltip = (props: TooltipProps) => {
	const classes = useStyles();

	return (
		<MuiTooltip classes={classes} {...props}>
			{props.children}
		</MuiTooltip>
	);
};

export default Tooltip;
