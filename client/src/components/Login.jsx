import React from "react";
import { Container } from "react-bootstrap";

export default function Login() {
  const handleClick = () => {
    const client_id = "f7135ecc7e824cedbef7b757b8d1f358";
    const redirect_uri = "http://localhost:3000";
    // const client_secret = "5b3e46e0660a4430a8c8612a5cc29ed0";
    const apiUrl = "https://accounts.spotify.com/authorize";
    var scope = [
      "user-read-private",
      "user-read-email",
      "user-library-read",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
    ];

    window.location.href = `${apiUrl}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&showDialog=true`;
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <button onClick={handleClick} className="btn btn-primary btn-sm">
        LOGIN WITH SPOTIFY
      </button>
    </Container>
  );
}
