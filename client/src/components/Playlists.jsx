import React, {useEffect} from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants';

import styled from "styled-components";

export default function Playlists() {
    const [{ token, playlists }, dispatch] = useStateProvider();
    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json',
                }
            })
            const {items} = response.data
            console.log(items)
            const playlists = items.map(({name, id}) => {
                return { name, id };
            });
            console.log(items[4].name)
            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists })
        };
        getPlaylistData()
    }, [token, dispatch])
    return (
        <Container>
            <ul>
                {
                    playlists.map(playlist => <li key={playlist.id}>{playlist.name}</li>)
                }
            </ul>
        </Container>
    )
}

const Container = styled.div`
height: 100%;
overflow: hidden;

ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    height: 52vh;
    max-height: 100%;
    overflow: auto;
    $::-webkit-scrollbar {
        width: 0.7rem;
        &-thumb {
            background-color: rgba( 255, 255, 255, 0.6);
        }
    }
    li {
        display: flex;
        gap: 1rem;
        align-items: center;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
            color: white;
        }

    }
`;