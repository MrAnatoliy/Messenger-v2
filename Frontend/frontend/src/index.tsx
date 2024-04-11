import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./error/Error";
import Welcome from "./routes/Welcome";
import Login from "./routes/Login";
import Register from "./routes/Register";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  palette: {
    primary: {
      light: "#b5defe",
      main: "#47b5ff",
      dark: "#0096ff",
      contrastText: "#dff6ff",
    },
    secondary: {
      light: "#008aff",
      main: "#1365df",
      dark: "#1b44c0",
      contrastText: "#06283D",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
      }
      `,
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderWidth: "2px",
              borderColor: theme.palette.primary.main,
            },
            "&:hover fieldset": {
              borderColor: theme.palette.primary.light,
            },
            "&.Mui-error:hover fieldset": {
              borderColor: theme.palette.error.main,
            },
            "& input": {
              color: theme.palette.primary.main,
            },
            "&.Mui-error input": {
              color: theme.palette.error.main,
            }
          },
        }),
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <Error />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
