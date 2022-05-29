import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";

export default function Body() {
  const [{ token, selectedPlaylistID }, dispatch] = useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      console.log(selectedPlaylistID);
      const response = await axios.get(
        `https://api.spotify.com/v1/playlist/${selectedPlaylistID}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    };
    getInitialPlaylist();
  }, [token, dispatch]);

  return <Container>Body</Container>;
}

const Container = styled.div``;
