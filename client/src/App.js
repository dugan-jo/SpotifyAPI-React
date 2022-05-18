import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Login from "./components/Login.jsx";

import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider.jsx";
import Spotify from "./components/Spotify";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // grab just the access token
      const token = hash
        .substring(1)
        .split("&")[0]
        .split("=")[1];
      console.log("token_ID: " + token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);

  return <div>{token ? <Spotify /> : <Login />}</div>;
}
