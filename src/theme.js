import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#0eab18",
    },
    error: red,
    del: {
      main: "#eb0e0e",
    },

    background: {
      default: "#fff",
    },
  },
});

export default theme;
