import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import blue from "@material-ui/core/colors/blue";

const grey = {
	50: "#f8f9fa",
	100: "#e9ecef",
	200: "#dee2e6",
	300: "#ced4da",
	400: "#adb5bd",
	500: "#8c959d",
	600: "#6c757d",
	700: "#495057",
	800: "#343a40",
	900: "#212529",
};

const theme = createMuiTheme({
	breakpoints: {
		values: {
			xs: 360,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
	palette: {
		grey,
		primary: blue,
		secondary: {
			light: grey[50],
			main: grey[100],
			dark: grey[200],
		},
	},
	typography: {
		fontFamily: '"Fira Sans", "Helvetica", "Arial", "sans-serif"',
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 700,
		fontWeightBold: 700,
	},
});

export default theme;
